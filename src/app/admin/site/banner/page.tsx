"use client";
import BannerBody from "@/components/admin/banner/body";

export default function AdminBannerPage() {
  return (
    <main className="p-10 w-full">
      <h1 className="font-bold text-2xl">사이트 배너 관리</h1>
      <p className="text-sm my-2 text-foreground/50">
        디버거즈의 메인 페이지의 상단에 위치할 배너를 설정합니다.
      </p>
      <div className="w-full">
        <BannerBody />
      </div>
    </main>
  );
}
