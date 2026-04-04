import type { Metadata } from "next";

import { BackgroundMusicPlayer } from "@/components/background-music-player";
import { WeatherModeToggle } from "@/components/weather-mode-toggle";

import "./globals.css";

export const metadata: Metadata = {
  title: "西门晴耕的小田园",
  description: "西门晴耕的小田园：记录内容创作、生活片段与数字花园灵感。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="ambientParticles" aria-hidden />
        <WeatherModeToggle />
        <BackgroundMusicPlayer />
        {children}
        <footer className="siteCopyright" aria-label="网站版权">
          <p>© 2026 西门晴耕 All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
