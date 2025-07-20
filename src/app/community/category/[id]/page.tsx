import Link from "next/link";

export default function CommunityCategoryPage() {
  return (
    <main className="border rounded-md bg-background shadow-2xl dark:shadow-white/2 overflow-hidden">
      <div className="p-5 flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-xl">자휴게시판</h1>
          <p className="text-sm text-foreground/50">
            자체휴강에 관련된 내용을 적어주세요.
          </p>
        </div>
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
      </div>
      <div>
        <ImportantPost id={1} title="커뮤니티 서버 점검 안내" />
        <div className="bg-foreground/20 w-full h-[1px]"></div>
        <ImportantPost id={1} title="커뮤니티 서버 점검 안내" />
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
