"use client";

import { DebuggersAPI } from "@/components/util/api";
import useUserStore from "@/store/user";
import { josa } from "es-hangul";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CommentWriter() {
  const { user, isLoggedIn } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();

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

  const debuggersApi = DebuggersAPI.getInstance();

  const handleSubmit = async () => {
    console.log("hi");
    if (!content.trim()) {
      setError("댓글 내용을 입력해주세요.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await debuggersApi.post(`/debuggers/bug/${id}/comment`, {
        contents: content.trim(),
      });
      setContent("");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("댓글 작성에 실패했습니다.");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 mt-2 flex justify-between">
        <h4 className="mb-2 font-bold">댓글을 남겨보세요</h4>
        <p className="text-sm text-secondary-foreground">
          {josa(user.username, "으로/로")} 로그인되어 있습니다.
        </p>
      </div>
      <textarea
        className="border w-full border-border rounded-md p-3"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError("");
        }}
      ></textarea>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-primary h-10 text-primary-foreground px-10 py-2 rounded-md mt-5 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            "작성"
          )}
        </button>
      </div>
    </div>
  );
}
