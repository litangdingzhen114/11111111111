import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WelcomePreloader from "@/components/motion/WelcomePreloader";
import SmoothScroll from "@/components/motion/SmoothScroll";
import AccessibilityWidget from "@/components/accessibility/AccessibilityWidget";
import LanguageRuntime from "@/components/accessibility/LanguageRuntime";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "sunmaosun的作品集",
    template: "%s | sunmaosun的作品集",
  },
  icons: {
    icon: "/favicon.jpg",
  },
  description:
    "AI 产品经理方向项目站，整理 Agent、AIGC 工作流、小程序和 Web 原型项目。",
  keywords: [
    "AI 产品经理",
    "产品经理",
    "AI Agent",
    "AIGC",
    "小程序",
    "前端开发",
    "Next.js",
    "React",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.sessionStorage.getItem('sunmaosun-preloader-seen') === 'true') {
                  document.documentElement.classList.add('preloader-seen');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-[100svh] flex-col bg-background text-foreground">
        <WelcomePreloader />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <AccessibilityWidget />
        <LanguageRuntime />
      </body>
    </html>
  );
}
