import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECレビュー返信AI｜ネガティブレビューも30秒でプロの返信文に",
  description: "Amazon・楽天・メルカリ・Yahoo!ショッピングのレビューに最適な返信文をAIが自動生成。プラットフォーム別トーン調整・感情分析・改善提案付き。",
};

const PLATFORMS = [
  { svgD: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z", svgColor: "#F97316", name: "Amazon", color: "border-orange-200", tone: "丁寧・誠実な日本語" },
  { svgD: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020.01 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z", svgColor: "#EF4444", name: "楽天", color: "border-red-200", tone: "感情に寄り添う温かみのあるトーン" },
  { svgD: "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z", svgColor: "#3B82F6", name: "メルカリ", color: "border-blue-200", tone: "カジュアルで親しみやすいトーン" },
  { svgD: "M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z", svgColor: "#8B5CF6", name: "Yahoo!ショッピング", color: "border-purple-200", tone: "礼儀正しく明確な説明" },
];

const BEFORE_AFTER = [
  { star: "★☆☆☆☆", before: "商品が届いたら説明と全然違う色でした。最悪です。二度と買いません。", after: "この度はご不便をおかけし、誠に申し訳ございません。商品の色についてご期待に添えなかったことを深くお詫び申し上げます。返品・交換のご対応をさせていただきますので、メッセージにてご連絡ください。" },
  { star: "★★☆☆☆", before: "梱包が雑すぎて商品が傷ついていた。もう少し丁寧にしてほしい。", after: "ご購入いただきありがとうございます。梱包が不十分で商品に傷がついてしまい、大変ご迷惑をおかけしました。梱包方法を見直します。" },
];

const FEATURES = [
  { svgD: "M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z", svgColor: "#F97316", title: "コピペ即使える返信文", desc: "プラットフォーム・評価・トーンに合わせた完全な返信文を生成。そのままコピペしてご使用いただけます。" },
  { svgD: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z", svgColor: "#F59E0B", title: "商品・サービス改善提案", desc: "レビュー内容から改善ポイントを抽出。再発防止に活かせます。" },
  { svgD: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z", svgColor: "#8B5CF6", title: "感情分析・リスク判定", desc: "レビュアーの感情・要求・リスクレベルを分析。対応優先度の判断に役立ちます。" },
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
    <main className="min-h-screen text-white" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(234, 88, 12, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(251, 146, 60, 0.06) 0%, transparent 50%), #0F0F1A' }}>
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {[
          { size: 4, x: '15%', y: '25%', dur: '7s', delay: '0s', color: 'rgba(249,115,22,0.3)' },
          { size: 3, x: '80%', y: '10%', dur: '9s', delay: '1s', color: 'rgba(234,88,12,0.2)' },
          { size: 5, x: '65%', y: '55%', dur: '8s', delay: '2s', color: 'rgba(251,146,60,0.25)' },
          { size: 3, x: '30%', y: '70%', dur: '6s', delay: '0.5s', color: 'rgba(249,115,22,0.2)' },
          { size: 4, x: '50%', y: '35%', dur: '10s', delay: '3s', color: 'rgba(234,88,12,0.15)' },
          { size: 6, x: '88%', y: '75%', dur: '7s', delay: '1.5s', color: 'rgba(251,146,60,0.2)' },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full animate-pulse" style={{ width: p.size, height: p.size, left: p.x, top: p.y, background: p.color, animationDuration: p.dur, animationDelay: p.delay }} />
        ))}
      </div>
      <div className="relative z-10">
      <nav className="border-b border-white/10 px-6 py-4 sticky top-0 z-10" style={{ background: 'rgba(15,15,26,0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-white">ECレビュー返信AI</span>
          <Link href="/tool" className="text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:scale-105 min-h-[44px] flex items-center" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 0 15px rgba(249,115,22,0.3)' }}>今すぐ無料で試す</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block backdrop-blur-sm bg-white/5 border border-orange-500/30 text-orange-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">Amazon / 楽天 / メルカリ / Yahoo!ショッピング 対応</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span style={{ background: 'linear-gradient(135deg, #FFFFFF, #FED7AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ネガティブレビューも、</span><br /><span style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>30秒</span><span style={{ background: 'linear-gradient(135deg, #FFFFFF, #FED7AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>でプロの返信文に。</span>
        </h1>
        <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
          プラットフォーム・評価・商品を入力するだけ。AIが<strong className="text-white">最適なトーンの返信文・改善提案・感情分析</strong>をセットで生成。
        </p>
        <Link href="/tool" className="inline-block text-white font-bold text-lg px-8 py-4 rounded-xl mb-3 transition-all hover:scale-105 min-h-[44px]" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 0 30px rgba(249,115,22,0.4)' }}>今すぐ無料で試す</Link>
        <p className="text-xs text-gray-500">登録不要・クレジットカード不要・1日3件まで無料</p>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-bold text-center mb-8 text-white">プラットフォーム別にトーンを自動調整</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLATFORMS.map(p => (
              <div key={p.name} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/8 transition-all">
                <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24" fill={p.svgColor} aria-hidden="true"><path d={p.svgD}/></svg>
                <p className="font-bold text-sm mb-1 text-white">{p.name}</p>
                <p className="text-xs text-gray-400">{p.tone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3 text-white">こんなレビューにも即対応</h2>
          <p className="text-center text-gray-400 text-sm mb-10">実際にありそうなレビューと、AIが生成する返信文の例</p>
          <div className="space-y-8">
            {BEFORE_AFTER.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="backdrop-blur-md bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-red-300 bg-red-500/20 px-2 py-0.5 rounded">レビュー</span>
                    <span className="text-orange-400 text-sm">{item.star}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.before}</p>
                </div>
                <div className="backdrop-blur-md bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">AI返信文</span>
                    <span className="text-xs text-gray-500">生成時間: 約20秒</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3 text-white">1回の生成で3種類のアウトプット</h2>
          <p className="text-center text-gray-400 text-sm mb-10">返信文だけでなく、ビジネス改善につながる分析もセットで提供</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all">
                <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill={f.svgColor} aria-hidden="true"><path d={f.svgD}/></svg>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10 text-white">使い方は4ステップ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {HOW_TO.map(s => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full text-white font-bold text-lg flex items-center justify-center mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>{s.step}</div>
                <p className="font-semibold text-white mb-1 text-sm">{s.title}</p>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10 text-white">ご利用者の声</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VOICES.map((v, i) => (
              <div key={i} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-all">
                <div className="flex text-yellow-400 text-sm mb-3">
                  {[...Array(5)].map((_, j) => <svg key={j} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z"/></svg>)}
                </div>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">{v.text}</p>
                <p className="text-xs text-gray-500">{v.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3 text-white">料金プラン</h2>
          <p className="text-center text-gray-400 text-sm mb-10">すべてのプランで返信文・感情分析・改善提案がフルセット</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "無料", price: "¥0", sub: "1日3件まで", features: ["全機能を試せます", "登録不要", "全プラットフォーム対応"], href: "/tool", cta: "無料で試す", highlight: false },
              { name: "スタンダード", price: "¥4,980", sub: "/月（月200件）", features: ["月200件まで生成", "全プラットフォーム対応", "感情分析・改善提案付き", "履歴保存"], href: "/tool", cta: "申し込む", highlight: true },
              { name: "ビジネス", price: "¥9,800", sub: "/月（無制限）", features: ["生成無制限", "チームアカウント", "優先サポート"], href: "/tool", cta: "申し込む", highlight: false },
            ].map(plan => (
              <div key={plan.name} className={`backdrop-blur-md rounded-2xl border p-6 relative ${plan.highlight ? "bg-orange-500/10 border-orange-500/50 shadow-lg shadow-orange-500/10" : "bg-white/5 border-white/10"}`}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-white px-3 py-0.5 rounded-full whitespace-nowrap font-bold" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>一番人気</div>}
                <p className="font-bold text-white mb-1">{plan.name}</p>
                <p className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{plan.price}<span className="text-sm font-normal text-gray-400">{plan.sub}</span></p>
                <ul className="mt-4 mb-5 space-y-2">
                  {plan.features.map(f => (<li key={f} className="text-sm text-gray-300 flex items-center gap-2"><svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>{f}</li>))}
                </ul>
                <Link href={plan.href} className={`block w-full text-center text-sm font-medium py-2.5 rounded-lg min-h-[44px] flex items-center justify-center transition-all ${plan.highlight ? "text-white hover:scale-105" : "backdrop-blur-sm bg-white/10 text-gray-300 hover:bg-white/20"}`} style={plan.highlight ? { background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 0 15px rgba(249,115,22,0.3)' } : {}}>{plan.cta}</Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">※本サービスはAIによる文章生成支援ツールです。生成された返信文は必ずご確認の上ご使用ください。</p>
        </div>
      </section>
      <section className="py-16 text-center px-6" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))' }}>
        <h2 className="text-2xl font-bold text-white mb-3">レビュー対応の悩みを今すぐ解消する</h2>
        <p className="text-orange-200/70 text-sm mb-8">登録不要・クレジットカード不要で1日3件無料</p>
        <Link href="/tool" className="inline-block text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 min-h-[44px]" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 0 30px rgba(249,115,22,0.4)' }}>無料で返信文を生成する</Link>
      </section>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-500 space-x-4">
        <Link href="/legal" className="hover:text-gray-300 transition-colors">特定商取引法に基づく表記</Link>
        <Link href="/privacy" className="hover:text-gray-300 transition-colors">プライバシーポリシー</Link>
        <Link href="/terms" className="hover:text-gray-300 transition-colors">利用規約</Link>
      </footer>
      </div>
    </main>
  );
}
