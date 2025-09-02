"use client";

import { DebuggersAPI } from "@/components/util/api";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Post } from "../../category/[id]/page";
import CommunityPostComment from "@/components/community/post/comment";
import PostBreadcrumb from "@/components/community/post/breadcrumb";
import PostHeader from "@/components/community/post/header";
import PostAuthorInfo from "@/components/community/post/author-info";
import PostContent from "@/components/community/post/content";
import PostLoadingState from "@/components/community/post/loading-state";
import PostErrorState from "@/components/community/post/error-state";
import PostNotFoundState from "@/components/community/post/not-found-state";
import { Toaster } from "sonner";
import CommunityPostLike from "@/components/community/post/like";

export interface PostReaction {
  dislikes: number;
  likes: number;
  myType: "like" | "dislike" | "none";
}

export default function CommunityPostPage() {
  const debuggersAPI = useMemo(() => DebuggersAPI.getInstance(), []);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reactions, setReactions] = useState<PostReaction>({
    dislikes: 0,
    likes: 0,
    myType: "none",
  });
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const postId = params.id as string;

  useEffect(() => {
    const prepare = async () => {
      if (!postId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await debuggersAPI.get(`/community/post/${postId}`);
        setPost(response.data.data.post);
        setReactions(response.data.data.reactions);
        console.log(response.data.data);
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
  }, [postId, debuggersAPI]);

  if (isLoading) {
    return <PostLoadingState />;
  }

  if (error) {
    return <PostErrorState error={error} />;
  }

  if (!post) {
    return <PostNotFoundState />;
  }

  return (
    <main
      id="admin-header"
      className="p-5 border rounded-md bg-background shadow-2xl dark:shadow-white/2 h-fit"
    >
      <Toaster />
      <PostBreadcrumb
        categoryId={post.category?.id}
        categoryTitle={post.category?.title}
      />
      <PostHeader title={post.title} post={post} />
      <PostAuthorInfo
        writer={post.writer}
        badge={post.badge}
        isUnknown={post.isUnknown}
        createdAt={post.createdAt}
      />
      <PostContent content={post.content} />
      <CommunityPostLike postId={post.id} reactions={reactions} />
      <CommunityPostComment postId={post.id} />
    </main>
  );
}
