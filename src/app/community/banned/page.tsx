"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BannedPage() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const bannedFor = useSearchParams().get("for");
  useEffect(() => {
    const prepare = () => {
      const header = document.getElementById("community-header");
      console.log(header?.offsetHeight);
      if (!header) {
        setTimeout(prepare, 300);
        return;
      }
      setHeaderHeight(header.offsetHeight);
    };
    prepare();
  }, []);
  return (
    <main
      className="flex justify-center items-center flex-col gap-4"
      style={{
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-20 opacity-50"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
      <h1 className="font-bold text-lg">이용이 제한되었습니다.</h1>
      <p className="text-xs text-center text-secondary-foreground">
        귀하는 디버거즈 커뮤니티의 이용이 제한되었습니다.
        <br />
        더욱 클린한 학교 커뮤니티의 운영을 위해,
        <br />
        {bannedFor
          ? `${bannedFor}까지 이용이 제한됩니다.`
          : "커뮤니티 이용이 영구 차단되셨습니다."}
      </p>
    </main>
  );
}
