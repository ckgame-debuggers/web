"use client";
import PostEditorForm from "@/components/community/post/editor-form";
import { DebuggersAPI } from "@/components/util/api";
import useCommunityStore from "@/store/community";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function EditPostPage() {
  const debuggersAPI = useMemo(() => DebuggersAPI.getInstance(), []);
  const params = useParams();
  const postId = params.id as string;

  const [writerId, setWriterId] = useState(0);
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [initialCategory, setInitialCategory] = useState(0);
  const [initialIsUnknown, setInitialIsUnknown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useCommunityStore();

  useEffect(() => {
    const prepare = async () => {
      if (!postId) return;
      setIsLoading(true);
      try {
        const res = await debuggersAPI.get(`/community/post/${postId}`);
        const data = res.data.data.post;
        setInitialTitle(data.title ?? "");
        setInitialContent(data.content ?? "");
        setInitialCategory(data.category?.id ?? 0);
        setInitialIsUnknown(Boolean(data.isUnknown));
        setWriterId(data.writer.id);
      } finally {
        setIsLoading(false);
      }
    };
    prepare();
  }, [postId, debuggersAPI]);

  if (isLoading) {
    return (
      <main
        id="admin-header"
        className="p-5 border rounded-md bg-background shadow-2xl dark:shadow-white/2 h-fit"
      >
        <p>글 정보를 불러오는 중입니다...</p>
      </main>
    );
  }

  if (userId !== writerId) {
    return (
      <main
        id="admin-header"
        className="p-5 border rounded-md bg-background shadow-2xl dark:shadow-white/2 h-fit"
      >
        <p>본인이 글이 아닌 경우 수정할 수 없습니다.</p>
      </main>
    );
  }

  return (
    <PostEditorForm
      initialTitle={initialTitle}
      initialContent={initialContent}
      initialCategory={initialCategory}
      initialIsUnknown={initialIsUnknown}
      submitLabel="수정"
      onSubmit={async ({ title, content, category, isUnknown }) => {
        await debuggersAPI.patch(`/community/post/${postId}`, {
          title,
          category,
          content,
          isUnknown,
        });
        window.location.href = `/community/post/${postId}`;
      }}
    />
  );
}
