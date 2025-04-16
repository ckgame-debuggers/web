"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DebuggersAPI } from "@/components/util/api";
import axios from "axios";
import { useState, useMemo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>에디터를 불러오고 있습니다...</p>,
});

export default function CreateCrewForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    maxPeople: 0,
    isRecruiting: false,
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    maxPeople: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const newErrors = {
      title: formData.title === "" ? "크루 이름을 입력해주세요." : "",
      description:
        formData.description === "" ? "크루 설명을 입력해주세요." : "",
      maxPeople: formData.maxPeople <= 0 ? "최대 인원을 입력해주세요." : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setIsLoading(true);
    try {
      await debuggersAPI.post(`/crew/request`, formData);
      window.location.href = "/crew";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorText(`서버에 에러가 발생하였습니다 : ${error.message}`);
      }
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({ ...prev, maxPeople: value }));
    setErrors((prev) => ({ ...prev, maxPeople: "" }));
  };

  const handleQuillChange = useCallback((content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
    setErrors((prev) => ({ ...prev, description: "" }));
  }, []);

  const handleCheckboxChange = () => {
    setFormData((prev) => ({ ...prev, isRecruiting: !prev.isRecruiting }));
  };

  return (
    <form
      className="max-w-[900px] flex flex-col gap-10 mx-5 sm:mx-auto my-20"
      onSubmit={handleSubmit}
    >
      <h1 className="font-semibold text-2xl">새로운 크루 만들기</h1>
      <div className="flex flex-col gap-5">
        <div>
          <Input
            label="크루 이름"
            name="name"
            value={formData.title}
            onChange={handleInputChange("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <Input
            label="최대 인원"
            name="max-people"
            type="number"
            value={formData.maxPeople}
            onChange={handleNumberChange}
            min={1}
          />
          {errors.maxPeople && (
            <p className="text-sm text-red-500 mt-1">{errors.maxPeople}</p>
          )}
        </div>
        <div>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleQuillChange}
            modules={modules}
            className="h-[300px] mb-12"
            placeholder="크루 설명을 입력해주세요"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="isRecruiting"
            checked={formData.isRecruiting}
            onCheckedChange={handleCheckboxChange}
          />
          <label htmlFor="isRecruiting">
            검토 완료 후 바로 모집을 시작하시겠습니까?
          </label>
        </div>
      </div>
      <Button type="submit" className="cursor-pointer flex justify-center">
        {!isLoading ? (
          "크루 만들기"
        ) : (
          <div
            role="status"
            className="transition-height duration-300 ease-in-out mx-auto"
          >
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
        )}
      </Button>
      {errorText !== "" && (
        <p className="text-sm text-red-500 mt-1">{errorText}</p>
      )}
    </form>
  );
}
