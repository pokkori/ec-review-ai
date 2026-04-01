import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import OrbBackground from "@/components/OrbBackground";
import "./globals.css";


const SITE_URL = "https://ec-review-ai.vercel.app";
const TITLE = "ECレビュー返信AI｜ネガティブレビューも30秒でプロの返信文に";
const DESC = "Amazon・楽天・メルカリのレビューに最適な返信文をAIが自動生成。プラットフォーム別のトーン自動調整・感情分析・改善提案付き。無料3件から試せます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "ECレビュー返信AI",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <OrbBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
