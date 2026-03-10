import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECレビュー返信AI｜ネガティブレビューも30秒でプロの返信文に",
  description: "Amazon・楽天・メルカリ・Yahoo!ショッピングのレビューに最適な返信文をAIが自動生成。プラットフォーム別トーン調整・感情分析・改善提案付き。",
};

const PLATFORMS = [
  { icon: "📦", name: "Amazon", color: "bg-orange-100 text-orange-700 border-orange-200", tone: "丁寧・誠実な日本語" },
  { icon: "🛒", name: "楽天", color: "bg-red-100 text-red-700 border-red-200", tone: "感情に寄り添う温かみのあるトーン" },
  { icon: "📱", name: "メルカリ", color: "bg-blue-100 text-blue-700 border-blue-200", tone: "カジュアルで親しみやすいトーン" },
  { icon: "🛍", name: "Yahoo!ショッピング", color: "bg-purple-100 text-purple-700 border-purple-200", tone: "礼儀正しく明確な説明" },
];

const BEFORE_AFTER = [
  { star: "★☆☆☆☆", before: "商品が届いたら説明と全然違う色でした。最悪です。二度と買いません。", after: "この度はご不便をおかけし、誠に申し訳ございません。商品の色についてご期待に添えなかったことを深くお詫び申し上げます。返品・交換のご対応をさせていただきますので、メッセージにてご連絡ください。" },
  { star: "★★☆☆☆", before: "梱包が雑すぎて商品が傷ついていた。もう少し丁寧にしてほしい。", after: "ご購入いただきありがとうございます。梱包が不十分で商品に傷がついてしまい、大変ご迷惑をおかけしました。梱包方法を見直します。" },
];

const FEATURES = [
  { icon: "✍", title: "コピペ即使える返信文", desc: "プラットフォーム・評価・トーンに合わせた完全な返信文を生成。そのままコピペしてご使用いただけます。" },
  { icon: "💡", title: "商品・サービス改善提案", desc: "レビュー内容から改善ポイントを抽出。再発防止に活かせます。" },
  { icon: "🧠", title: "感情分析・リスク判定", desc: "レビュアーの感情・要求・リスクレベルを分析。対応優先度の判断に役立ちます。" },
];

const HOW_TO = [
  { step: "1", title: "プラットフォームを選択", desc: "Amazon・楽天・メルカリなど出品先を選ぶだけ" },
  { step: "2", title: "レビューを貼り付け", desc: "受け取ったレビュー文をテキストエリアにペースト" },
  { step: "3", title: "評価とトーンを設定", desc: "星評価と返信の雰囲気を選択" },
  { step: "4", title: "返信文を受け取る", desc: "30秒以内にプロ品質の返信文・分析が生成されます" },
];

const VOICES = [
  { role: "Amazonセラー・40代", text: "ネガティブレビューへの返信が5分で対応できるようになりました。評価が上がってきた気がします。" },
  { role: "楽天出品者・30代", text: "感情分析機能が特に助かっています。どのレビューが放置するとリスクになるか一目でわかります。" },
  { role: "メルカリ出品者・20代", text: "メルカリのカジュアルな文体と楽天の丁寧な文体を自動で切り替えてくれるのが便利。複数プラットフォーム対応は他にない機能です。" },
];

export default function ECReviewLP() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">ECレビュー返信AI</span>
          <Link href="/tool" className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-600">今すぐ無料で試す</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-6">Amazon / 楽天 / メルカリ / Yahoo!ショッピング 対応</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          ネガティブレビューも、<br /><span className="text-orange-500">30秒</span>でプロの返信文に。
        </h1>
        <p className="text-lg text-gray-500 mb-4 max-w-2xl mx-auto">
          プラットフォーム・評価・商品を入力するだけ。AIが<strong className="text-gray-700">最適なトーンの返信文・改善提案・感情分析</strong>をセットで生成。
        </p>
        <Link href="/tool" className="inline-block bg-orange-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-100 mb-3">今すぐ無料で試す →</Link>
        <p className="text-xs text-gray-400">登録不要・クレジットカード不要・1日3件まで無料</p>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-bold text-center mb-8">プラットフォーム別にトーンを自動調整</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLATFORMS.map(p => (
              <div key={p.name} className={["border rounded-xl p-4 text-center ",p.color].join("")}>
                <div className="text-3xl mb-2">{p.icon}</div>
                <p className="font-bold text-sm mb-1">{p.name}</p>
                <p className="text-xs opacity-80">{p.tone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">こんなレビューにも即対応</h2>
          <p className="text-center text-gray-500 text-sm mb-10">実際にありそうなレビューと、AIが生成する返信文の例</p>
          <div className="space-y-8">
            {BEFORE_AFTER.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded">レビュー</span>
                    <span className="text-orange-400 text-sm">{item.star}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.before}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">AI返信文</span>
                    <span className="text-xs text-gray-400">生成時間: 約20秒</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">1回の生成で3種類のアウトプット</h2>
          <p className="text-center text-gray-500 text-sm mb-10">返信文だけでなく、ビジネス改善につながる分析もセットで提供</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">使い方は4ステップ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {HOW_TO.map(s => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <p className="font-semibold text-gray-900 mb-1 text-sm">{s.title}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">ご利用者の声</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VOICES.map((v, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex text-yellow-400 text-sm mb-3">★★★★★</div>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{v.text}</p>
                <p className="text-xs text-gray-400">{v.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">料金プラン</h2>
          <p className="text-center text-gray-500 text-sm mb-10">すべてのプランで返信文・感情分析・改善提案がフルセット</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "無料", price: "¥0", sub: "1日3件まで", features: ["全機能を試せます", "登録不要", "全プラットフォーム対応"], href: "/tool", cta: "無料で試す", highlight: false },
              { name: "スタンダード", price: "¥4,980", sub: "/月（月200件）", features: ["月200件まで生成", "全プラットフォーム対応", "感情分析・改善提案付き", "履歴保存"], href: "/tool", cta: "申し込む", highlight: true },
              { name: "ビジネス", price: "¥9,800", sub: "/月（無制限）", features: ["生成無制限", "チームアカウント", "優先サポート"], href: "/tool", cta: "申し込む", highlight: false },
            ].map(plan => (
              <div key={plan.name} className={["rounded-2xl border p-6 relative ", plan.highlight ? "border-orange-500 shadow-lg" : "border-gray-200"].join("")}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-orange-500 text-white px-3 py-0.5 rounded-full whitespace-nowrap">一番人気</div>}
                <p className="font-bold text-gray-900 mb-1">{plan.name}</p>
                <p className="text-2xl font-bold text-orange-500">{plan.price}<span className="text-sm font-normal text-gray-500">{plan.sub}</span></p>
                <ul className="mt-4 mb-5 space-y-2">
                  {plan.features.map(f => (<li key={f} className="text-sm text-gray-600 flex items-center gap-2"><span className="text-green-500">✓</span>{f}</li>))}
                </ul>
                <Link href={plan.href} className={["block w-full text-center text-sm font-medium py-2.5 rounded-lg ", plan.highlight ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"].join("")}>{plan.cta}</Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">※本サービスはAIによる文章生成支援ツールです。生成された返信文は必ずご確認の上ご使用ください。</p>
        </div>
      </section>
      <section className="bg-orange-500 py-16 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-3">レビュー対応の悩みを今すぐ解消する</h2>
        <p className="text-orange-100 text-sm mb-8">登録不要・クレジットカード不要で１日３件無料</p>
        <Link href="/tool" className="inline-block bg-white text-orange-500 font-bold text-lg px-8 py-4 rounded-xl hover:bg-orange-50 shadow-lg">無料で返信文を生成する →</Link>
      </section>
      <footer className="border-t py-6 text-center text-xs text-gray-400 space-x-4">
        <Link href="/legal" className="hover:underline">特定商取引法に基づく表記</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <Link href="/terms" className="hover:underline">利用規約</Link>
      </footer>
    </main>
  );
}
