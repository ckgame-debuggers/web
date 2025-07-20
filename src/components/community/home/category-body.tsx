import Link from "next/link";
import CommunityHomeCategoryItem from "./category-item";

export default function CommuntiyHomeCategoryBody({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  return (
    <div className="border rounded-md bg-background shadow-2xl dark:shadow-white/2 overflow-hidden">
      <div className="flex items-center text-sm gap-1 font-bold p-4 bg-black/5 dark:bg-white/5">
        <h3>{title}</h3>
      </div>
      <div className="h-fit min-h-10">
        {[
          {
            title: "React 18에서 달라진 점 정리해봤습니다",
            category: "tech",
            id: 1,
          },
          {
            title: "신입 개발자 이력서 피드백 부탁드립니다",
            category: "tech",
            id: 1,
          },
          {
            title: "프론트엔드 개발자 로드맵 2024",
            category: "tech",
            id: 1,
          },
          {
            title: "타입스크립트 시작하시는 분들을 위한 팁",
            category: "tech",
            id: 1,
          },
          {
            title: "주니어 개발자의 성장을 위한 조언",
            category: "tech",
            id: 1,
          },
        ].map((item, index) => (
          <div key={index}>
            <CommunityHomeCategoryItem
              title={item.title}
              category={item.category}
              id={item.id}
            />
            {index !== 4 && <div className="w-[98%] bg-border h-[1px]"></div>}
          </div>
        ))}
        <Link
          className="text-sm text-center w-full flex justify-center items-center gap-3 p-2 border-t border-t-border hover:bg-sidebar/50 dark:hover:bg-white/2"
          href={`/community/category/${id}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
          더 확인하기
        </Link>
      </div>
    </div>
  );
}
