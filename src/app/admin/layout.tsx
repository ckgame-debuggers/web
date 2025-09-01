import GlobalFooter from "@/components/section/global/global-footer";
import AdminHeader from "@/components/admin/admin-header";
import AdminSideBar from "@/components/admin/admin-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "어드민 - 디버거즈",
  description: "디버거즈의 어드민 페이지입니다.  ",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminHeader />
      <div className="flex">
        <AdminSideBar />
        <>{children}</>
      </div>
      <GlobalFooter />
    </>
  );
}
