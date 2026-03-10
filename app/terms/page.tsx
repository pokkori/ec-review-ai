import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約｜ECレビュー返信AI",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">← トップに戻る</Link>
        </div>
      </nav>
      <article className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">利用規約</h1>
        <p className="text-sm text-gray-500 mb-8">最終更新日：2026年3月</p>
        <section className="space-y-8 text-sm text-gray-700 leading-relaxed">
          <div><h2 className="font-bold text-gray-900 mb-2">第1条（適用）</h2><p>本規約は、当サービス「ECレビュー返信AI」の利用条件を定めるものです。ご利用にあたっては、本規約に同意いただいたものとみなします。</p></div>
          <div><h2 className="font-bold text-gray-900 mb-2">第2条（サービスの内容）</h2><p>本サービスは、ECプラットフォームのレビューに対する返信文をAIが生成する文章支援ツールです。生成された文章はAIによる自動生成であり、内容の正確性・適切性を保証するものではありません。</p></div>
          <div><h2 className="font-bold text-gray-900 mb-2">第3条（禁止事項）</h2><p>以下の行為を禁止します。</p><ul className="list-disc list-inside mt-2 space-y-1"><li>法令または公序良俗に違反する行為</li><li>本サービスの運営を妨害する行為</li><li>不正アクセスやリバースエンジニアリング</li><li>他のユーザーや第三者に不利益を与える行為</li></ul></div>
          <div><h2 className="font-bold text-gray-900 mb-2">第4条（料金・決済）</h2><p>有料プランの料金はPAY.JPを通じて決済されます。料金は税込で表示されています。サブスクリプションは毎月自動更新されます。</p></div>
          <div><h2 className="font-bold text-gray-900 mb-2">第5条（解約）</h2><p>いつでも解約可能です。解約後は次回更新日まで引き続きサービスをご利用いただけます。デジタルコンテンツの性質上、既払い分の返金は行っておりません。</p></div>
          <div><h2 className="font-bold text-gray-900 mb-2">第6条（免責事項）</h2><p>本サービスが生成するコンテンツの使用によって生じた損害について、当サービスは一切の責任を負いません。生成された返信文は必ずご自身でご確認の上ご使用ください。</p></div>
          <div><h2 className="font-bold text-gray-900 mb-2">第7条（規約の変更）</h2><p>本規約は予告なく変更する場合があります。変更後は本ページに掲載した時点で効力を生じます。</p></div>
          <div><h2 className="font-bold text-gray-900 mb-2">第8条（お問い合わせ）</h2><p>本規約に関するご質問は levonadesign@gmail.com までご連絡ください。</p></div>
        </section>
      </article>
    </main>
  );
}
