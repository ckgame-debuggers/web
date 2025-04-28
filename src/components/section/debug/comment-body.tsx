"use client";

import { useEffect, useState } from "react";
import DebugCommentItem from "./comment-item";
import { DebuggersAPI } from "@/components/util/api";

type CommentType = {
  id: number;
  contents: string;
  createdAt: string;
  writer: {
    username: string;
    schoolNumber: string;
  };
};

export default function DebugCommentBody({ id }: { id: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const debuggersApi = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const found: CommentType[] = (
        await debuggersApi.get(`/debuggers/bug/${id}/comment`)
      ).data.data;
      setComments(found);
    };
    prepare();
  }, []);
  return (
    <div className="max-w-[800px] mx-auto my-10 flex flex-col gap-4">
      <h5>댓글 {comments.length}개</h5>
      <div className="flex flex-col gap-6">
        {comments.map((comment, i) => (
          <DebugCommentItem
            key={i}
            avatar="/resources/default-profile.png"
            createdAt={comment.createdAt}
            content={comment.contents}
            username={comment.writer.username}
          />
        ))}
      </div>
    </div>
  );
}
