"use client";

import useUserStore from "@/store/user";
import { josa } from "es-hangul";
import Link from "next/link";
import { useEffect } from "react";

export default function CommentWriter() {
  const { user, isLoggedIn } = useUserStore();

  useEffect(() => {}, [user, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="w-full">
        <p>
          댓글을 작성하시려면{" "}
          <Link href={"/login"} className="underline hover:text-primary">
            로그인
          </Link>
          하셔야 합니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 mt-2 flex justify-between">
        <h4 className="mb-2 font-bold">댓글을 남겨보세요</h4>
        <p className="text-sm text-secondary-foreground">
          {josa(user.username, "으로/로")} 로그인되어 있습니다.
        </p>
      </div>
      <textarea className="border w-full border-border rounded-md p-3"></textarea>
      <div className="w-full flex justify-end">
        <button className="bg-primary text-primary-foreground px-10 py-2 rounded-md mt-5">
          작성
        </button>
      </div>
    </div>
  );
}
