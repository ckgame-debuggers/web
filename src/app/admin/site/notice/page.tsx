import NoticeBody from "@/components/admin/notice/body";

export default function AdminNoticePage() {
  return (
    <main className="p-10 w-full">
      <h1 className="font-bold text-2xl">공지사항 관리</h1>
      <p className="text-sm my-2 text-foreground/50">
        커뮤니티를 제외한 모든 페이지의 최상단에 노출될 공지사항을 설정합니다.
      </p>
      <NoticeBody />
    </main>
  );
}
