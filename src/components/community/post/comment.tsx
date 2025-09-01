"use client";
import { useEffect, useMemo, useState } from "react";
import CommunityPostCommentWriter from "./comment-writer";
import { DebuggersAPI } from "@/components/util/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Badge {
  id: number;
  name: string;
  image: string;
}

interface User {
  nickname: string;
  profileImage: string;
  color: string;
}

interface Writer {
  id: number;
  user: User;
  defaultBadge: Badge;
  schoolNumber: string;
}

interface Comment {
  id: number;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string | null;
  likes: number;
  dislikes: number;
  writer: Writer;
  replies: Comment[];
  replyCount: number;
}

export default function CommunityPostComment({ postId }: { postId: number }) {
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const res = await debuggersAPI.get(`/community/posts/${postId}/comments`);
      const data = res.data.data as { comments: Comment[]; totalCount: number };
      console.log(data);
      setCommentCount(data.totalCount);
      setComments(data.comments);
    };
    prepare();
  }, []);

  return (
    <div className="w-full border-border border rounded-md border-t border-t-border mt-20  pb-10">
      <div>
        <h3 className="font-bold p-4">
          댓글 <span className="text-primary">{commentCount}</span>개
        </h3>
      </div>
      <CommunityPostCommentWriter postId={postId} />
      <div>
        {comments.map((comment, i) => (
          <CommentItem comment={comment} postId={postId} key={i} />
        ))}
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  postId,
}: {
  comment: Comment;
  postId: number;
}) {
  const [isOpened, setOpen] = useState(false);
  const writerProfile = useMemo(() => {
    if (
      !comment.writer?.user?.profileImage ||
      comment.writer?.user.profileImage === ""
    ) {
      return `/resources/profile/${comment.writer?.user?.color ?? ""}.png`;
    }
    return (
      comment.writer.user?.profileImage ?? "/resources/profile/unknown.png"
    );
  }, [comment]);

  return (
    <>
      <div className="flex flex-wrap p-3 gap-4">
        <Link
          href={`/community/user/${comment.writer.id}`}
          className="relative h-fit"
        >
          <img className="w-10 h-10 rounded-full" src={writerProfile} />
          <img
            className="w-5 h-5 absolute right-[-5px] bottom-[-5px]"
            src={comment.writer.defaultBadge.image ?? "none"}
            style={{
              filter:
                "drop-shadow(2px 0 0 var(--background)) drop-shadow(-2px 0 0 var(--background)) drop-shadow(0 2px 0 var(--background)) drop-shadow(0 -2px 0 var(--background))",
            }}
          />
        </Link>
        <div className="flex flex-col justify-start flex-1">
          <div className="w-full flex justify-between items-center">
            <Link
              href={`/community/user/${comment.writer.id}`}
              className="relative"
            >
              {comment.writer.user.nickname}
            </Link>
            <Button
              variants="ghost"
              size="sm"
              onClick={() => {
                setOpen(!isOpened);
              }}
            >
              답변 달기
            </Button>
          </div>
          <p className="font-semibold">{comment.content}</p>
        </div>
      </div>
      <div
        className="w-[90%] ml-auto overflow-y-hidden transition-all duration-300 ease-in-out"
        style={{ height: isOpened ? "auto" : 0 }}
      >
        <CommunityPostCommentWriter
          postId={postId}
          parentId={comment.id}
          parentWriter={comment.writer.schoolNumber}
          isAnswer
        />
      </div>
      <div className="w-[90%] ml-auto overflow-y-hidden">
        {comment.replies.map((comment, i) => (
          <CommentItem comment={comment} postId={postId} key={i} />
        ))}
      </div>
    </>
  );
}
