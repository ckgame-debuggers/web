"use client";

import CommunityNewPostSetCategory from "@/components/community/new-post/category";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>에디터를 불러오고 있습니다...</p>,
});

export interface PostEditorValues {
  title: string;
  content: string;
  category: number;
  isUnknown: boolean;
}

export default function PostEditorForm({
  initialTitle = "",
  initialContent = "",
  initialCategory = 0,
  initialIsUnknown = false,
  submitLabel,
  onSubmit,
}: {
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: number;
  initialIsUnknown?: boolean;
  submitLabel: string;
  onSubmit: (values: PostEditorValues) => Promise<void> | void;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory);
  const [isUnknown, setIsUnknown] = useState(initialIsUnknown);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);
  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);
  useEffect(() => {
    setIsUnknown(initialIsUnknown);
  }, [initialIsUnknown]);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("제목을 입력해주세요");
      return;
    }
    if (!content.trim()) {
      toast.error("내용을 입력해주세요");
      return;
    }
    if (category === 0) {
      toast.error("카테고리를 선택해주세요");
      return;
    }
    await Promise.resolve(
      onSubmit({ title, content, category, isUnknown })
    ).catch((e: any) =>
      toast.error(e?.message || "처리 중 오류가 발생했습니다.")
    );
  };

  return (
    <main
      id="admin-header"
      className="p-5 border rounded-md bg-background shadow-2xl dark:shadow-white/2 h-fit"
    >
      <Toaster />
      <input
        className="p-3 font-bold border-b w-full mb-3 text-xl focus:outline-none focus:border-primary duration-500 ease-in-out transtion-all"
        placeholder="제목을 입력해주세요.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <CommunityNewPostSetCategory
        defaultCategory={category}
        onSelect={setCategory}
      />
      <div className="mb-2 h-fit">
        <ReactQuill
          theme="snow"
          modules={modules}
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="anonymous"
          checked={isUnknown}
          onChange={(e) => setIsUnknown(e.target.checked)}
          className="mr-2 cursor-pointer accent-primary"
        />
        <label htmlFor="anonymous" className="cursor-pointer text-sm">
          익명으로 작성하기
        </label>
      </div>
      <div className="flex">
        <Button
          variants="outline"
          className="w-full hover:border-primary hover:bg-transparent hover:text-primary"
          style={{ borderRadius: "1px" }}
          onClick={handleSubmit}
        >
          <p className="font-bold text-xs">{submitLabel}</p>
        </Button>
      </div>
    </main>
  );
}
