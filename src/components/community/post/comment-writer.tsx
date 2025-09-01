import CommentWriter from "@/components/section/debug/comment-writer";
import { Button } from "@/components/ui/button";
import { DebuggersAPI } from "@/components/util/api";
import useUserStore from "@/store/user";
import { useRef, useEffect, useState } from "react";

export default function CommunityPostCommentWriter({
  postId,
  isAnswer = false,
  parentId = 0,
  parentWriter = "",
}: {
  postId: number;
  isAnswer?: boolean;
  parentId?: number;
  parentWriter?: string;
}) {
  const { profile } = useUserStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(
    isAnswer ? `@[${parentWriter}] , ${postId}` : ""
  );
  const [error, setError] = useState("");
  const debuggersApi = DebuggersAPI.getInstance();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleSubmit = async () => {
    console.log(postId);
    if (!content.trim()) {
      setError("댓글 내용을 입력해주세요.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const res = await debuggersApi.post(
        `/community/posts/${postId}/comments`,
        {
          content: content.trim(),
          parentId: isAnswer ? parentId : undefined,
        }
      );
      setContent("");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("댓글 작성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex p-3">
        <div>
          <img
            src={profile}
            width={isAnswer ? 40 : 50}
            className="rounded-full border border-border mr-4"
          />
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div className="w-full rounded-md overflow-hidden border-border border">
            <textarea
              ref={textareaRef}
              className="bg-secondary w-full p-2 h-auto resize-none"
              style={{
                minHeight: isAnswer ? "30px" : "100px",
              }}
              value={content}
              placeholder="댓글을 입력해주세요."
              onChange={(e) => {
                setContent(e.target.value);
                adjustHeight();
              }}
            />
          </div>
          <div className="mt-2 flex w-full justify-between gap-1">
            <p className="text-red-500 text-xs">{error}</p>
            <Button
              className="rounded-full px-8 font-bold"
              size="sm"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "작성"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
