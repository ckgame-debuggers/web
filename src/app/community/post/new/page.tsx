"use client";
import PostEditorForm from "@/components/community/post/editor-form";
import { DebuggersAPI } from "@/components/util/api";
import { useSearchParams } from "next/navigation";

export default function PostPage() {
  const debuggersAPI = DebuggersAPI.getInstance();
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("category");

  return (
    <PostEditorForm
      initialCategory={defaultCategory ? parseInt(defaultCategory) : 0}
      submitLabel="발행"
      onSubmit={async ({ title, content, category, isUnknown }) => {
        const res = await debuggersAPI.post("/community/post", {
          title,
          category,
          content,
          isUnknown,
        });
        window.location.href = `/community/post/${res.data.data.id}`;
      }}
    />
  );
}
