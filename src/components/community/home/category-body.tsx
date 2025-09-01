import Link from "next/link";
import CommunityHomeCategoryItem from "./category-item";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isHot: boolean;
  isUnknown: boolean;
  permission: number;
  points: number;
  thumbnail: string;
  writer: {
    id: number;
    exp: number;
    point: number;
    banExpireAt: string | null;
    description: string;
    isBanned: boolean;
  };
}
export default function CommuntiyHomeCategoryBody({
  id,
  title,
  posts,
}: {
  id: number;
  title: string;
  posts: Post[];
}) {
  // 5개의 포스트 슬롯을 만들기 위한 배열
  const postSlots = Array(5).fill(null);

  return (
    <div className="border rounded-md bg-background shadow-2xl dark:shadow-white/2 overflow-hidden">
      <div className="flex items-center text-sm gap-1 font-bold p-4 bg-black/5 dark:bg-white/5">
        <h3>{title}</h3>
      </div>
      <div className="h-fit min-h-10">
        {postSlots.map((_, index) => (
          <div key={index}>
            {posts[index] ? (
              <CommunityHomeCategoryItem
                title={posts[index].title}
                id={posts[index].id}
              />
            ) : (
              <div className="px-4 py-3 flex text-foreground/10 text-sm items-center gap-4 hover:bg-sidebar/50 dark:hover:bg-white/2">
                게시글이 없습니다.
              </div>
            )}
            {index !== 4 && <div className="w-full bg-border h-[1px]"></div>}
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
