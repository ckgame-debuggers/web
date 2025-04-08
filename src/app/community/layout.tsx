import CommunityHeader from "@/components/section/community/community-header";
import GlobalFooter from "@/components/section/global/global-footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "디버거즈 - 청강문화산업대학교 게임스쿨 학생회",
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
      "청강대학교 게임스클 학생회, 디버거즈입 니다. 게임스쿨 학생들에게 필요한 여러 정보들을 제공합니다.",
  },
};

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommunityHeader />
      {children}
      <GlobalFooter />
    </>
  );
}
