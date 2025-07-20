import Link from "next/link";

export default function CommunitySubSidebar() {
  return (
    <div className="w-58 flex flex-col gap-4 sticky top-10">
      <div className="relative z-0 border border-border rounded-md dark:shadow-white/2 shadow-2xl overflow-hidden">
        <Link href="/community/notice">
          <h3 className="font-bold py-4 px-3">📢 공지사항</h3>
        </Link>
        <Divider />
        <PostItem
          contents={{
            title: "디버거즈 커뮤니티 서비스를 시작합니다",
            href: "/community/notice/1",
          }}
        />
        <Divider />
        <PostItem
          contents={{
            title: "(완료) 디버거즈 버그 발생 안내",
            href: "/community/notice/1",
          }}
        />
        <Divider />
        <PostItem
          contents={{
            title: "인연가챠 추가 모집 안내",
            href: "/community/notice/1",
          }}
        />
        <Divider />
        <PostItem
          contents={{
            title: "(완료) 디버거즈 버그 발생 안내",
            href: "/community/notice/1",
          }}
        />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-[1px] bg-border w-[94%] mx-auto"></div>;
}

function PostItem({
  contents,
}: {
  contents?: { href: string; title: string };
}) {
  if (!contents) return <div className="h-8"></div>;
  return (
    <Link
      href={contents.href}
      className="h-10 px-4 text-sm flex items-center hover:bg-sidebar/60 transition-colors duration-300"
    >
      <p>
        {contents.title.length > 14
          ? contents.title.slice(0, 14) + "..."
          : contents.title}
      </p>
    </Link>
  );
}
