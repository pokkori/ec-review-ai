"use client";
import PayjpModal from "@/components/PayjpModal";
import { useState, useEffect } from "react";
import Link from "next/link";

const FREE_LIMIT = 3;
const KEY = "review_count";
const HISTORY_KEY = "review_history";

const PLATFORMS = ["Amazon", "楽天", "メルカリ", "Yahoo!ショッピング", "その他"];
const RATINGS = ["★1", "★2", "★3", "★4", "★5"];

type Section = { title: string; icon: string; content: string };
type ParsedResult = { sections: Section[]; raw: string };
type HistoryItem = { date: string; platform: string; rating: string; result: string };

function parseResult(text: string): ParsedResult {
  const defs = [
    { key: "===返信文===", icon: "✍", title: "返信文" },
    { key: "===改善提案===", icon: "💡", title: "改善提案" },
    { key: "===感情分析===", icon: "🧠", title: "感情分析" },
  ];
  const sections: Section[] = [];
  for (let i = 0; i < defs.length; i++) {
    const def = defs[i];
    const nextDef = defs[i + 1];
    const start = text.indexOf(def.key);
    if (start === -1) continue;
    const end = nextDef ? text.indexOf(nextDef.key) : text.length;
    const content = text.slice(start + def.key.length, end !== -1 ? end : text.length).trim();
    sections.push({ title: def.title, icon: def.icon, content });
  }
  if (sections.length === 0) sections.push({ title: "生成結果", icon: "📄", content: text });
  return { sections, raw: text };
}

function Paywall({ onClose, onCheckout }: { onClose: () => void; onCheckout?: (plan: string) => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center">
        <div className="mb-3 flex justify-center">
          <svg className="w-10 h-10 text-orange-500" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="4" y="14" width="32" height="22" rx="3" fill="#f97316" opacity="0.15" stroke="#f97316" strokeWidth="2"/>
            <path d="M4 18h32M14 18V36M26 18V36" stroke="#f97316" strokeWidth="1.5"/>
            <path d="M12 14V10a8 8 0 0116 0v4" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="text-lg font-bold mb-2">無料枠を使い切りました</h2>
        <p className="text-sm text-gray-500 mb-1">プロのECセラー向け返信文を無制限に生成</p>
        <ul className="text-xs text-gray-400 text-left mb-5 space-y-1 mt-3">
          <li>✓ 返信文・感情分析・改善提案を無制限生成</li>
          <li>✓ Amazon/楽天/メルカリ/Yahoo!対応</li>
          <li>✓ 履歴保存</li>
        </ul>
        <div className="space-y-3 mb-4">
          <button onClick={() => { onClose(); onCheckout?.("standard"); }} className="block w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600">
            スタンダード ¥4,980/月
          </button>
          <button onClick={() => { onClose(); onCheckout?.("business"); }} className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 text-sm">
            ビジネス ¥9,800/月（無制限・チーム対応）
          </button>
        </div>
        <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600">閉じる</button>
      </div>
    </div>
  );
}

function CopyButton({ text, label = "コピー" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors">
      {copied ? "コピー済み ✓" : label}
    </button>
  );
}

function ResultTabs({ parsed }: { parsed: ParsedResult }) {
  const [activeTab, setActiveTab] = useState(0);
  const section = parsed.sections[activeTab];
  const handlePrint = () => {
    const html = "<html><head><title>ECレビュー返信</title><style>body{font-family:sans-serif;padding:32px;line-height:1.8;white-space:pre-wrap;}</style></head><body>" + parsed.raw.replace(/</g, "&lt;") + "</body></html>";
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    w?.addEventListener("load", () => { w.print(); URL.revokeObjectURL(url); });
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 flex-wrap">
        {parsed.sections.map((s, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className={["flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ", activeTab === i ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"].join("")}>
            <span>{s.icon}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 min-h-[360px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">{section.icon} {section.title}</span>
          <CopyButton text={section.content} />
        </div>
        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{section.content}</pre>
      </div>
      <div className="flex gap-2 justify-end">
        <CopyButton text={parsed.raw} label="全文コピー" />
        <button onClick={handlePrint} className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium">印刷・PDF保存</button>
      </div>
    </div>
  );
}

export default function ReviewTool() {
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState("★3");
  const [reviewText, setReviewText] = useState("");
  const [productName, setProductName] = useState("");
  const [tone, setTone] = useState("標準");
  const [parsed, setParsed] = useState<ParsedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPayjp, setShowPayjp] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCount(parseInt(localStorage.getItem(KEY) || "0"));
    const h = localStorage.getItem(HISTORY_KEY);
    if (h) try { setHistory(JSON.parse(h)); } catch { /* ignore */ }
  }, []);

  const isLimit = count >= FREE_LIMIT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimit) { setShowPaywall(true); return; }
    setLoading(true); setParsed(null); setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, rating: rating.replace("★", ""), reviewText, productName, tone }),
      });
      if (res.status === 429) { setShowPaywall(true); setLoading(false); return; }
      const data = await res.json();
      if (!res.ok) { setError(data.error || "エラーが発生しました"); setLoading(false); return; }
      const newCount = data.count ?? count + 1;
      localStorage.setItem(KEY, String(newCount));
      setCount(newCount);
      const text = data.result || "";
      const p = parseResult(text);
      setParsed(p);
      const newItem: HistoryItem = { date: new Date().toLocaleDateString("ja-JP"), platform: platform || "その他", rating, result: text };
      const newHistory = [newItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      if (newCount >= FREE_LIMIT) setTimeout(() => setShowPaywall(true), 1500);
    } catch { setError("通信エラーが発生しました。インターネット接続を確認してください。"); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} onCheckout={(p) => { setSelectedPlan(p); setShowPayjp(true); }} />}

      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900">ECレビュー返信AI</Link>
          <span className={["text-xs px-3 py-1 rounded-full ", isLimit ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"].join("")}>
            {isLimit ? "無料枠終了" : "無料あと" + (FREE_LIMIT - count) + "回"}
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl font-bold text-gray-900">レビュー情報を入力</h1>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">プラットフォーム</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(p => (
                  <button key={p} type="button" onClick={() => setPlatform(platform === p ? "" : p)}
                    className={["px-3 py-1 rounded-full text-xs border font-medium transition-colors ", platform === p ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-300 hover:border-orange-400"].join("")}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">評価</label>
              <div className="flex gap-2">
                {RATINGS.map(r => (
                  <button key={r} type="button" onClick={() => setRating(r)}
                    className={["flex-1 py-1.5 rounded-lg border text-sm font-medium transition-colors ", rating === r ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"].join("")}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品名（任意）</label>
              <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="例: ワイヤレスイヤホン XM-300"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">返信トーン</label>
              <div className="flex gap-2">
                {[
                  { value: "丁寧", desc: "非常に丁寧" },
                  { value: "標準", desc: "プロ品質" },
                  { value: "簡潔", desc: "短く要点のみ" },
                ].map(t => (
                  <button key={t.value} type="button" onClick={() => setTone(t.value)}
                    className={["flex-1 py-2 px-1 rounded-lg border text-center transition-colors ", tone === t.value ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"].join("")}>
                    <div className="text-xs font-semibold">{t.value}</div>
                    <div className={["text-xs mt-0.5 ", tone === t.value ? "text-orange-100" : "text-gray-400"].join("")}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                レビュー本文 <span className="text-red-500">*</span>
              </label>
              <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={5}
                placeholder="例：商品が届いたら説明と全然違う色でした。返品したいのに連絡が取れないし、最悪です。"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" required />
              <p className="text-xs text-gray-400 mt-1">詳しく書くほど精度が上がります（{reviewText.length}/1000文字）</p>
            </div>

            <button type="submit" disabled={loading}
              className={["w-full font-medium py-3 rounded-lg text-white transition-colors ", isLimit ? "bg-orange-400 hover:bg-orange-500" : "bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"].join("")}>
              {loading ? "返信文を生成中..." : isLimit ? "有料プランに申し込む" : "返信文を生成する（無料）"}
            </button>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </form>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">生成結果</label>
            {loading ? (
              <div className="flex-1 bg-white border border-gray-200 rounded-xl flex items-center justify-center min-h-[420px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-medium">AIが返信文を生成中...</p>
                  <p className="text-xs text-gray-400 mt-2">返信文 → 改善提案 → 感情分析</p>
                  <p className="text-xs text-gray-300 mt-1">通常15〜20秒かかります</p>
                </div>
              </div>
            ) : parsed ? (
              <ResultTabs parsed={parsed} />
            ) : (
              <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[420px] text-gray-400 gap-3">
                <svg className="w-12 h-12 text-gray-300" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <rect x="6" y="16" width="36" height="26" rx="3" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 22h36M18 22V42M30 22V42" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M14 16V12a10 10 0 0120 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="text-sm text-center font-medium text-gray-500">レビューを入力して<br />生成ボタンを押してください</p>
                <div className="bg-gray-50 rounded-lg p-4 text-xs space-y-2 w-full max-w-[260px]">
                  <p className="font-semibold text-gray-600">生成される内容：</p>
                  <p className="text-gray-500">返信文（そのままコピペ可）</p>
                  <p className="text-gray-500">商品・サービス改善提案（3点）</p>
                  <p className="text-gray-500">感情分析・リスク判定</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-4">
            <button onClick={() => setShowHistory(!showHistory)}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-700">
              <span>生成履歴（直近{history.length}件）</span>
              <span className="text-gray-400">{showHistory ? "▲ 閉じる" : "▼ 表示する"}</span>
            </button>
            {showHistory && (
              <div className="mt-4 space-y-3">
                {history.map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span className="font-medium text-gray-600">{item.platform} / {item.rating}</span>
                      <span>{item.date}</span>
                    </div>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap max-h-24 overflow-y-auto leading-relaxed">{item.result.slice(0, 200)}...</pre>
                    <button onClick={() => { navigator.clipboard.writeText(item.result); }}
                      className="text-xs text-orange-500 mt-2 hover:underline">全文をコピー</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t mt-8">
        <a href="/legal" className="hover:underline">特定商取引法に基づく表記</a>
        <span className="mx-2">|</span>
        <a href="/privacy" className="hover:underline">プライバシーポリシー</a>
        <span className="mx-2">|</span>
        <a href="/terms" className="hover:underline">利用規約</a>
      </footer>
      {showPayjp && (
        <PayjpModal
          publicKey={process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY!}
          planLabel={(selectedPlan === "business" ? "ビジネス ¥9,800/月" : "スタンダード ¥4,980/月")}
          plan={selectedPlan}
          onSuccess={() => setShowPayjp(false)}
          onClose={() => setShowPayjp(false)}
        />
      )}
    </main>
  );
}
