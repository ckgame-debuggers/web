"use client";
import { Button } from "@/components/ui/button";
import { DebuggersAPI } from "@/components/util/api";
import useUserStore from "@/store/user";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>에디터를 불러오고 있습니다...</p>,
});

export default function AdminAboutPage() {
  const { permission, isLoading } = useUserStore();
  const [value, setValue] = useState("");
  const debuggersAPI = DebuggersAPI.getInstance();

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

  useEffect(() => {
    const prepare = async () => {
      const data = (await debuggersAPI.get("/global/about")).data
        .data as string;
      setValue(data);
    };
    prepare();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (permission < 4) window.location.href = "/admin/site/notice";
  }, [permission, isLoading]);

  const handleSubmit = async () => {
    await debuggersAPI.post("/admin/about", { contents: value });
    window.location.reload();
  };

  return (
    <main className="p-10">
      <h1 className="font-bold text-2xl">사이트 설명 관리</h1>
      <p className="text-sm my-2 text-foreground/50">
        디버거즈의 매 해 정채성을 담은 페이지, 어바웃 페이지를 수정합니다.
      </p>
      <div className="mb-2 h-fit w-full mt-10">
        <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={(e) => {
            console.log(e);
            setValue(e);
          }}
          placeholder="내용을 입력해주세요"
        />
      </div>
      <Button onClick={handleSubmit} className="w-full">
        <p className="font-bold">저장하기</p>
      </Button>
    </main>
  );
}
