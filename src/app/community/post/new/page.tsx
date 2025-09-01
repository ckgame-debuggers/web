"use client";
import CommunityNewPostSetCategory from "@/components/community/new-post/category";
import CommunityNewPostThumbnailSelector from "@/components/community/new-post/thumbnail";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/image-upload";
import { DebuggersAPI } from "@/components/util/api";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSearchParam } from "react-use";
import { toast, Toaster } from "sonner";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>에디터를 불러오고 있습니다...</p>,
});

export default function PostPage() {
  const debuggersAPI = DebuggersAPI.getInstance();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [isUnknown, setIsUnknown] = useState(false);
  const searchParams = useSearchParams();

  const defaultCategory = searchParams.get("category");
  useEffect(() => {
    if (defaultCategory) {
      setCategory(parseInt(defaultCategory));
    }
  }, [defaultCategory]);

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
    try {
      const res = await debuggersAPI.post("/community/post", {
        title,
        category,
        thumbnail,
        content,
        isUnknown,
      });
      console.log(res);
      window.location.href = `/community/post/${res.data.data.id}`;
    } catch (e: any) {
      toast.error(e.message);
    }
  };

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
        defaultCategory={defaultCategory ? parseInt(defaultCategory) : 0}
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
      <CommunityNewPostThumbnailSelector
        onUpload={(e) => setThumbnail(e.imageURL)}
      />
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
          <p className="font-bold text-xs">발행</p>
        </Button>
      </div>
    </main>
  );
}
