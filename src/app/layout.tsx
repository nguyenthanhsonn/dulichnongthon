/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import { Toast } from "@/components/toast";
import DevToolsGuard from "@/components/DevToolsGuard";
import { VotingProvider } from "@/context/voting-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuộc thi Du lịch Nông thôn 2026 | Bình chọn 35 Điểm đến Toàn quốc",
  description: "Trang bình chọn trực tuyến chính thức cho 35 điểm đến du lịch nông nghiệp, làng nghề sinh thái tiêu biểu của Việt Nam.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

// Keep browser zoom and pinch-to-zoom available at every breakpoint.
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="isolate min-h-screen bg-bg-base text-[#1B2B22] font-sans antialiased selection:bg-[#7CB342]/20 selection:text-[#1F6B45]">
        <DevToolsGuard />
        <VotingProvider>
          {children}
          <Toast />
        </VotingProvider>
      </body>
    </html>
  );
}
