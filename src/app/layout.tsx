import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "전북맹아학교 3D 촉각 졸업앨범",
  description: "전북맹아학교 고등부 24회 3D 촉각 졸업앨범 작품 소개 웹사이트",
  openGraph: {
    title: "만지고, 듣고, 기억하는 졸업앨범",
    description: "시각장애 학생을 위한 음성지원 3D 촉각 졸업앨범 작품 소개",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
