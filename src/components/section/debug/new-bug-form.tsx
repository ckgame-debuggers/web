"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DebuggersAPI } from "@/components/util/api";
import dynamic from "next/dynamic";
import axios from "axios";
import { useState, useCallback, useMemo, useEffect } from "react";
import Selector from "@/components/ui/selector";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>에디터를 불러오고 있습니다...</p>,
});

type CategoryType = { id: number; title: string };

type FormDataType = {
  title: string;
  categoryId: number | null;
  content: string;
};

export default function NewBugForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    categoryId: null,
    content: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    categoryId: "",
    content: "",
  });

  const debuggersAPI = useMemo(() => DebuggersAPI.getInstance(), []);

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isLoading) return;

      const newErrors = {
        title: formData.title === "" ? "버그 제목을 입력해주세요." : "",
        categoryId:
          formData.categoryId === null ? "카테고리를 선택해주세요." : "",
        content: formData.content === "" ? "버그 내용을 입력해주세요." : "",
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error !== "")) {
        return;
      }

      setIsLoading(true);
      try {
        const requestData = {
          title: formData.title,
          categoryId: formData.categoryId,
          contents: formData.content,
        };

        await debuggersAPI.post(`/debuggers`, requestData);
        window.location.href = "/debug";
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorText(`서버에 에러가 발생하였습니다 : ${error.message}`);
        }
        setIsLoading(false);
      }
    },
    [isLoading, formData, debuggersAPI]
  );

  const handleInputChange = useCallback(
    (field: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
      },
    []
  );

  const handleQuillChange = useCallback((content: string) => {
    setFormData((prev) => ({ ...prev, content }));
    setErrors((prev) => ({ ...prev, content: "" }));
  }, []);

  const LoadingSpinner = useMemo(
    () => (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-6 h-6 text-transparent animate-spin fill-primary-foreground"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    ),
    []
  );

  useEffect(() => {
    const prepare = async () => {
      const categories: CategoryType[] = (
        await debuggersAPI.get("debuggers/categories")
      ).data.data;
      setCategories(categories);
    };
    prepare();
  }, []);

  return (
    <form
      className="max-w-[900px] flex flex-col gap-10 mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-5">
        <div>
          <Input
            label="버그 제목"
            name="title"
            value={formData.title}
            onChange={handleInputChange("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}
        </div>
        {categories.length === 0 ? (
          <div>
            <div className="flex items-center justify-between px-4 py-2 text-sm border border-border rounded-md bg-background hover:bg-accent w-full">
              카테고리를 로드하고 있습니다..
            </div>
          </div>
        ) : (
          <div>
            <Selector
              placeholder="카테고리를 선택해 주세요."
              onSelect={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  categoryId: parseInt(value),
                }));
                setErrors((prev) => ({ ...prev, categoryId: "" }));
              }}
            >
              {categories.map((category) => (
                <Selector.Item key={category.id} value={`${category.id}`}>
                  {category.title}
                </Selector.Item>
              ))}
            </Selector>
            {errors.categoryId && (
              <p className="text-sm text-red-500 mt-1">{errors.categoryId}</p>
            )}
          </div>
        )}
        <div>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleQuillChange}
            modules={modules}
            className="h-[300px] mb-12"
            placeholder="내용을 입력해주세요"
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">{errors.content}</p>
          )}
        </div>
      </div>
      <Button type="submit" className="cursor-pointer flex justify-center">
        {!isLoading ? "버그 신고" : LoadingSpinner}
      </Button>
      {errorText !== "" && (
        <p className="text-sm text-red-500 mt-1">{errorText}</p>
      )}
    </form>
  );
}
