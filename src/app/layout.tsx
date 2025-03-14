import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import GlobalHeader from "@/components/section/global/global-header";
import GlobalFooter from "@/components/section/global/global-footer";

const fontSans = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "디버거즈 - 청강대학교 게임스쿨 학생회",
  description:
    "청강대학교 게임스클 학생회, 디버거즈입니다. 게임스쿨 학생들에게 필요한 여러 정보들을 제공합니다.",
  openGraph: {
    title: "디버거즈 - 청강대학교 게임스쿨 학생회",
    description:
      "청강대학교 게임스클 학생회, 디버거즈입니다. 게임스쿨 학생들에게 필요한 여러 정보들을 제공합니다.",
    type: "website",
    locale: "ko_KR",
    url: "https://ckgamelab.com/",
  },
  twitter: {
    card: "summary",
    title: "디버거즈 - 청강대학교 게임스쿨 학생회",
    description:
      "청강대학교 게임스클 학생회, 디버거즈입니다. 게임스쿨 학생들에게 필요한 여러 정보들을 제공합니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} antialiased`}>
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
