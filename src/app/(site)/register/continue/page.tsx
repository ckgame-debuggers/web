"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback } from "react";

export default function RegisterContinuePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const searchParams = useSearchParams();
  const email = useMemo(() => searchParams.get("email") || "", [searchParams]);
  const certNumber = useMemo(
    () => searchParams.get("cert") || "",
    [searchParams]
  );
  const schoolNumber = useMemo(
    () => email.replace("@chungkang.academy", ""),
    [email]
  );

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    passwordRepeat: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    username: "",
    password: "",
    passwordRepeat: "",
  });

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prevData) => ({ ...prevData, password: value }));
      if (
        value.length < 8 ||
        value.length > 16 ||
        !/[a-zA-Z]/.test(value) ||
        !/\d/.test(value)
      ) {
        setErrors((prev) => ({
          ...prev,
          password:
            "비밀번호는 8자 이상 16자 이하, 영문과 숫자의 조합이어야 합니다.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    const newErrors = {
      fullname: formData.fullname === "" ? "실명을 입력해주세요." : "",
      username: formData.username === "" ? "닉네임을 입력해주세요." : "",
      password:
        formData.password === "" ? "비밀번호를 입력해주세요." : errors.password,
      passwordRepeat:
        formData.passwordRepeat === ""
          ? "비밀번호 확인을 입력해주세요."
          : formData.password !== formData.passwordRepeat
          ? "비밀번호가 일치하지 않습니다."
          : "",
    };

    setErrors(newErrors);

    if (
      Object.values(newErrors).some((error) => error !== "") ||
      formData.password !== formData.passwordRepeat
    ) {
      return;
    }

    const { passwordRepeat, ...dataToSubmit } = formData;
    const finalDataToSubmit = {
      ...dataToSubmit,
      schoolNumber,
      email,
      certCode: certNumber,
    };

    setIsLoading(true);
    try {
      await axios.post(`/api/auth/register`, finalDataToSubmit);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === "Invalid certification code.") {
          setErrorText(`인증 코드가 유효하지 않습니다.`);
          setIsLoading(false);
          return;
        }
        setErrorText(`서버에 에러가 발생하였습니다 : ${error.message}`);
        setIsLoading(false);
      }
      return;
    }
    window.location.href = `/register/success?name=${finalDataToSubmit.fullname}`;
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const handlePasswordRepeatChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, passwordRepeat: value }));
    if (value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        passwordRepeat: "비밀번호가 일치하지 않습니다.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, passwordRepeat: "" }));
      setIsLoading(false);
    }
  };

  return (
    <main>
      <form
        className="max-w-[900px] flex flex-col gap-10 mx-5 sm:mx-auto my-20"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-2xl">
          회원가입을 계속 진행해 주세요.
        </h1>
        <div className="flex flex-col gap-5">
          <div>
            <Input
              label="실명"
              name="name"
              value={formData.fullname}
              onChange={handleInputChange("fullname")}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500 mt-1">{errors.fullname}</p>
            )}
          </div>

          <div>
            <Input
              label="닉네임"
              name="username"
              value={formData.username}
              onChange={handleInputChange("username")}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <Input
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={onPasswordChange}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <Input
              label="비밀번호 확인"
              name="password-repeat"
              type="password"
              value={formData.passwordRepeat}
              onChange={handlePasswordRepeatChange}
            />
            {errors.passwordRepeat && (
              <p className="text-sm text-red-500 mt-1">
                {errors.passwordRepeat}
              </p>
            )}
          </div>

          <div className="flex gap-5">
            <InputField label="학번" id="schoolnumber" value={schoolNumber} />
            <InputField label="이메일" id="email" value={email} />
          </div>
          <InputField label="인증번호" id="certCode" value={certNumber} />
        </div>
        <Button type="submit" className="cursor-pointer flex justify-center">
          {!isLoading ? (
            "회원가입"
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
    </main>
  );
}

function InputField({
  label,
  id,
  value,
}: {
  label: string;
  id: string;
  value: string;
}) {
  return (
    <div className="relative w-full opacity-50">
      <label
        htmlFor={id}
        className="absolute left-3 top-1/2 transition-all transform -translate-y-1/2 z-0 cursor-text select-none origin-left"
        style={{
          scale: "70%",
          left: `5px`,
          top: "-4px",
          backgroundColor: "var(--background)",
          padding: "0 10px",
        }}
      >
        {label}
      </label>
      <input
        className="bg-transparent w-full border border-border p-2 rounded-md focus:outline-none focus:border-primary transition-all"
        id={id}
        name={id}
        disabled
        value={value}
      />
    </div>
  );
}
