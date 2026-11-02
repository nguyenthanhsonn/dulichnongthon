/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuộc thi Du lịch Nông thôn 2026 | Bình chọn 35 Điểm đến Toàn quốc",
  description: "Trang bình chọn trực tuyến chính thức cho 35 điểm đến du lịch nông nghiệp, làng nghề sinh thái tiêu biểu của Việt Nam.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FBF8F0] text-[#1B2B22] font-sans antialiased selection:bg-[#7CB342]/20 selection:text-[#1F6B45]">
        {children}
      </body>
    </html>
  );
}
