import like from "$/resources/like/like.png";
import dislike from "$/resources/like/dislike.png";
import Image from "next/image";
import { DebuggersAPI } from "@/components/util/api";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { PostReaction } from "@/app/community/post/[id]/page";

export default function CommunityPostLike({
  postId,
  reactions,
}: {
  postId: number;
  reactions: PostReaction;
}) {
  const [isLiked, setIsLiked] = useState(reactions.myType === "like");
  const [isDisliked, setIsDisliked] = useState(reactions.myType === "dislike");
  const [point, setPoint] = useState(reactions.likes - reactions.dislikes);
  const debuggersAPI = DebuggersAPI.getInstance();

  const lastPostIdRef = useRef<number | null>(null);
  useEffect(() => {
    if (lastPostIdRef.current !== postId) {
      setIsLiked(reactions.myType === "like");
      setIsDisliked(reactions.myType === "dislike");
      lastPostIdRef.current = postId;
    }
  }, [postId, reactions.myType]);

  const handleLike = async () => {
    if (isDisliked) {
      setPoint(point + 2);
    } else {
      setPoint(point + 1);
    }
    setIsLiked(true);
    setIsDisliked(false);
    try {
      await debuggersAPI.post(`/community/post/${postId}/like`, {});
      toast.success("좋아요를 눌렀습니다.");
    } catch (e: any) {
      toast.error(e.message || "좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const handleDislike = async () => {
    if (isLiked) {
      setPoint(point - 2);
    } else {
      setPoint(point - 1);
    }
    setIsDisliked(true);
    setIsLiked(false);
    try {
      await debuggersAPI.post(`/community/post/${postId}/dislike`, {});
      toast.success("싫어요를 눌렀습니다.");
    } catch (e: any) {
      toast.error(e.message || "싫어요 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center text-xs">
      <div className="flex gap-5 justify-center">
        <button
          onClick={handleLike}
          style={{
            backgroundColor: isLiked ? "var(--primary)" : "transparent",
          }}
          className="border border-background rounded-full p-3 w-[70px] h-[70px] flex items-center justify-center hover:border-border transition-all duration-300 cursor-pointer"
        >
          <Image className="w-full" src={like} alt="post-like" />
        </button>
        <button
          onClick={handleDislike}
          style={{
            backgroundColor: isDisliked ? "#ff2626" : "transparent",
          }}
          className="border border-background rounded-full p-3 w-[70px] h-[70px] flex items-center justify-center hover:border-border transition-all duration-300 cursor-pointer"
        >
          <Image className="w-full" src={dislike} alt="post-dislike" />
        </button>
      </div>
      <p className="font-bold">{point}</p>
    </div>
  );
}
