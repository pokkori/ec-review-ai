import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const FREE_LIMIT = 3;
const COOKIE_KEY = "review_use_count";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 60000 }); return true; }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }
  const isPremium = req.cookies.get("premium")?.value === "1" || req.cookies.get("stripe_premium")?.value === "1";
  const cookieCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0");
  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 }); }
  const { platform, rating, reviewText, productName, tone } = body as Record<string, string>;
  if (!reviewText) return NextResponse.json({ error: "レビュー本文は必須です" }, { status: 400 });
  if (reviewText.length > 1000) return NextResponse.json({ error: "レビュー本文は1000文字以内で入力してください" }, { status: 400 });
  const platformGuide =
    platform === "Amazon"
      ? "Amazonプラットフォームの慣習に合わせ、丁寧で誠実なトーンで返信。英語混じりの表現は避け純粋な日本語で対応。"
      : platform === "楽天"
      ? "楽天市場の文化に合わせ、感情的にお客様に寄り添い温かみのある返信。「〜でございます」などを多用してください。"
      : platform === "メルカリ"
      ? "メルカリのカジュアルな文化に合わせ、親しみやすいトーンで返信。過度に形式的にならず礼儀正しく対応。"
      : "Yahoo!ショッピングのプラットフォームに合わせ、礼儀正しく明確な説明をしてください。";
  const ratingNum = parseInt(rating || "3");
  const ratingGuide =
    ratingNum <= 2
      ? "低評価のため、まず誠実な謝罪から始め、問題の原因究明の姿勢を示し、具体的な改善策を提示。最後に再購入への感謝と期待を伝えてください。"
      : ratingNum === 3
      ? "中評価を真摯に受け止め、ご指摘を改善に活かす意欲を示してください。ポジティブなお言葉にも感謝し、今後への期待を込めて締めくくってください。"
      : "高評価に対して感謝し、お客様の喜びに共感してください。今後もご利用いただけるよう、温かみのあるメッセージで締めくくってください。";
  const toneGuide =
    tone === "簡潔"
      ? "簡潔で要点を絞った返信にしてください。200文字以内を目安にしてください。"
      : tone === "丁寧"
      ? "非常に丁寧で誠実な返信にしてください。感謝と謝罪を適切に織り交ぜてください。"
      : "標準的な丁寧さで、プロフェッショナルな返信にしてください。";
  const prompt = [
    "あなたはECプラットフォームの返信文作成の専門家です。",
    "以下のレビューに対して、最適な返信文を生成してください。",
    "",
    "【レビュー情報】",
    "プラットフォーム: " + (platform || "その他"),
    "評価: ★" + (rating || "3"),
    "商品名: " + (productName || "（未入力）"),
    "レビュー本文: " + reviewText,
    "",
    "【返信方針】",
    "プラットフォーム別ガイドライン: " + platformGuide,
    "評価別ガイドライン: " + ratingGuide,
    "トーン: " + toneGuide,
    "",
    "以下の形式で出力してください：",
    "",
    "===返信文===",
    "（そのままコピーして使える返信文をここに記載。店舗名は「〇〇ショップ」と表記すること）",
    "",
    "===改善提案===",
    "• （改善提案1）",
    "• （改善提案2）",
    "• （改善提案3）",
    "",
    "===感情分析===",
    "感情: （怒り/失望/期待外れ/満足/とても満足 など）",
    "主な要求: （返品希望/情報提供要求/謝罪要求/改善要求/なし など）",
    "リスクレベル: （高/中/低）",
    "リスク理由: （SNS拡散の可能性・悪意の有無・要求の妥当性など）",
  ].join("\n");
  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });
    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const newCount = cookieCount + 1;
    const res = NextResponse.json({ result: text, count: newCount });
    res.cookies.set(COOKIE_KEY, String(newCount), { maxAge: 60 * 60 * 24, sameSite: "lax", httpOnly: true, secure: true });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI生成中にエラーが発生しました。しばらく待ってから再試行してください。" }, { status: 500 });
  }
}
