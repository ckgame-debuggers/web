import Link from "next/link";

export default function CommunityHomeHot() {
  return (
    <div className="border rounded-md bg-background shadow-2xl dark:shadow-white/2 overflow-hidden">
      <Link
        href={"/community/hot"}
        className="flex items-center gap-1 font-bold p-4 bg-black/5 dark:bg-white/5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
          />
        </svg>
        <h3>이번 주 핫한 게시글</h3>
      </Link>
      <div className="h-fit min-h-10">
        {[
          {
            title: "디버거즈 커뮤니티가 새롭게 오픈했습니다!",
            category: "tech",
            id: 1,
          },
          {
            title: "프론트엔드 개발자 면접 후기 공유드립니다",
            category: "tech",
            id: 1,
          },
          {
            title: "[React] 상태관리 라이브러리 비교 분석",
            category: "tech",
            id: 1,
          },
          { title: "신입 개발자의 첫 회사 적응기", category: "tech", id: 1 },
          {
            title: "알고리즘 스터디원 모집합니다 (주 2회)",
            category: "tech",
            id: 1,
          },
        ].map((item, index) => (
          <div key={index}>
            <HotItem
              title={item.title}
              category={item.category}
              id={item.id}
              index={index + 1}
            />
            {index !== 4 ? (
              <div className="w-[98%] bg-border h-[1px]"></div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function HotItem({
  title,
  category,
  id,
  index,
}: {
  title: string;
  category: string;
  id: number;
  index: number;
}) {
  return (
    <Link
      className="px-4 py-3 flex items-center gap-4 hover:bg-sidebar/50 dark:hover:bg-white/2"
      href={`/community/post/${category}/${id}`}
    >
      <p className="bg-foreground/5 text-foreground/40 font-bold text-xs p-1 flex justify-center items-center overflow-hidden rounded-full w-6">
        {index}
      </p>
      <p className="text-sm">{title}</p>
    </Link>
  );
}
