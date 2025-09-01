"use client";
import { DebuggersAPI } from "@/components/util/api";
import useUserStore from "@/store/user";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export interface Category {
  id: number;
  title: string;
  description: string;
  permission: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  permission: number;
  isUnknown: boolean;
  thumbnail?: string;
  createdAt: Date;
  isHot: boolean;
  points: number;
  badge?: {
    title: string;
    description: string;
    img: string;
    isDefault: boolean;
  };
  writer?: {
    id: number;
    exp: number;
    point: number;
    banExpireAt?: string | null;
    description?: string;
    isBanned?: boolean;
    user?: {
      username: string;
      color: string;
      profile: string;
    };
  };
  category?: {
    id: number;
    title: string;
    description: string;
  };
}

export interface CategoryData {
  category: Category;
  posts: Post[];
  totalPages: number;
}

export default function CommunityCategoryPage() {
  const debuggersAPI = useMemo(() => DebuggersAPI.getInstance(), []);
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { permission } = useUserStore();
  const params = useParams();
  const searchParams = useSearchParams();
  const postId = params.id as string;
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const prepare = async () => {
      if (!postId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await debuggersAPI.get(
          `/community/category/${postId}?page=${page}`
        );
        setCategory(response.data.data);
      } catch (e: any) {
        console.error(e);
        setError(
          e.response?.data?.message || "글을 불러오는 중 오류가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };
    prepare();
  }, [postId, page, debuggersAPI]);

  if (isLoading) {
    return (
      <main className="p-5 border rounded-md bg-background shadow-2xl dark:shadow-white/2 h-fit">
        <div className="flex justify-center items-center py-20">
          <span className="ml-2">글을 불러오는 중...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-5 border rounded-md bg-background shadow-2xl dark:shadow-white/2 h-fit">
        <div className="flex flex-col justify-center items-center py-20">
          <div className="text-red-500 mb-4 font-bold">
            오류가 발생하였습니다.
          </div>
          <div className="text-center text-gray-600">{error}</div>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="p-5 border rounded-md bg-background shadow-2xl dark:shadow-white/2 h-fit">
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-600">카테고리를 찾을 수 없습니다.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="border rounded-md bg-background shadow-2xl dark:shadow-white/2 overflow-hidden">
      <div className="p-5 flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-xl">{category.category.title}</h1>
          <p className="text-sm text-foreground/50">
            {category.category.description}
          </p>
        </div>
        {permission >= category.category.permission ? (
          <Link
            className="flex font-bold h-fit text-white bg-primary px-4 py-2 gap-2 border border-primary w-fit text-xs items-center rounded-full hover:text-primary hover:bg-background transition-colors"
            href={"/community/post/new?category=1"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={6}
              stroke="currentColor"
              className="size-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p className="mt-[-1.5px]">글 작성</p>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div>
        <ImportantPost id={1} title="커뮤니티 서버 점검 안내" />
        <div className="bg-foreground/20 w-full h-[1px]"></div>
        <ImportantPost id={1} title="커뮤니티 서버 점검 안내" />
        {category.posts.map((post, i) => (
          <div key={i}>
            <div className="bg-foreground/20 w-full h-[1px]"></div>
            <Post
              id={post.id}
              title={post.title}
              badge={post.badge?.img ?? "none"}
              createdAt={(() => {
                const now = new Date();
                const postDate = new Date(post.createdAt);
                const diff = now.getTime() - postDate.getTime();
                const seconds = Math.floor(diff / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                const months = Math.floor(days / 30);
                const years = Math.floor(days / 365);

                if (years > 0) return `${years}년 전`;
                if (months > 0) return `${months}달 전`;
                if (days > 0) return `${days}일 전`;
                if (hours > 0) return `${hours}시간 전`;
                if (minutes > 0) return `${minutes}분 전`;
                return `${seconds}초 전`;
              })()}
            />
          </div>
        ))}
      </div>
      {category.totalPages > 1 ? (
        <div className="flex justify-center gap-2 py-4">
          {Array.from({ length: category.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Link
                key={pageNum}
                href={`/community/category/${postId}?page=${pageNum}`}
                className={`px-3 py-1 rounded ${
                  pageNum === page
                    ? "bg-primary text-white"
                    : "bg-background hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {pageNum}
              </Link>
            )
          )}
        </div>
      ) : (
        <></>
      )}
      <div>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4683344705910726"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="fluid"
          data-ad-layout-key="-gc+3m+72-9a-5s"
          data-ad-client="ca-pub-4683344705910726"
          data-ad-slot="1816883580"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    </main>
  );
}

function ImportantPost({ title, id }: { title: string; id: number }) {
  return (
    <Link href={`/community/post/${id}`}>
      <div className="flex bg-black/10 dark:bg-white/10 text-sm text-foreground/80 gap-4 px-5 py-2 items-center">
        <p className="text-xs bg-background text-foreground px-3 font-bold py-1 rounded-full">
          <span className="block mt-[-1px]">필독</span>
        </p>
        <p>{title}</p>
      </div>
    </Link>
  );
}

function Post({
  title,
  id,
  createdAt,
  badge,
}: {
  title: string;
  id: number;
  createdAt: string;
  badge: string;
}) {
  return (
    <Link href={`/community/post/${id}`}>
      <div className=" gap-2 flex px-5 py-4 items-center hover:bg-black/10 dark:hover:bg-white/10">
        <img width={25} className="mr-3" src={badge} alt="badge" />
        <p className="font-bold">{title} - </p>
        <p className="text-xs">{createdAt}</p>
      </div>
    </Link>
  );
}
