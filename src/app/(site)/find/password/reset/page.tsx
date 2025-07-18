"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DebuggersAPI } from "@/components/util/api";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FindPWContinue() {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [err, setError] = useState("");
  const [newPassword, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [repeatError, setRepeatError] = useState("");
  const param = useSearchParams();
  const email = param.get("email");
  const certNumb = param.get("cert");

  const validatePassword = (pw: string) => {
    if (pw.length < 8 || pw.length > 16) {
      return "비밀번호는 8자 이상 16자 이하이어야 합니다.";
    }
    if (!/[a-zA-Z]/.test(pw) || !/\d/.test(pw)) {
      return "비밀번호는 영문과 숫자의 조합이어야 합니다.";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const errorMsg = validatePassword(value);
    setPasswordError(errorMsg);
    if (repeat && value !== repeat) {
      setRepeatError("비밀번호가 일치하지 않습니다.");
    } else {
      setRepeatError("");
    }
  };

  const handleRepeatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepeat(value);
    if (newPassword !== value) {
      setRepeatError("비밀번호가 일치하지 않습니다.");
    } else {
      setRepeatError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const pwError = validatePassword(newPassword);
    setPasswordError(pwError);
    if (pwError) {
      setError("");
      return;
    }
    if (newPassword !== repeat) {
      setRepeatError("비밀번호가 일치하지 않습니다.");
      setError("");
      return;
    }
    setRepeatError("");
    setError("");
    setIsLoading(true);
    const finalDataToSubmit = {
      email,
      certNumb,
      toChange: newPassword,
    };
    try {
      await axios.post(`/api/auth/reset-password`, finalDataToSubmit);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === "Invalid certification code.") {
          setError(`인증 코드가 유효하지 않습니다.`);
          setIsLoading(false);
          return;
        }
        setError(`서버에 에러가 발생하였습니다 : ${error.message}`);
        setIsLoading(false);
      }
      return;
    }
    window.location.href = `/find/password/success`;
  };

  return (
    <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18">
      <h1 className="font-semibold text-3xl">비밀번호를 변경할게요!</h1>
      <form className="flex flex-col gap-5 py-10" onSubmit={handleSubmit}>
        <Input
          label="비밀번호를 입력해 주세요"
          name="password"
          type="password"
          value={newPassword}
          onChange={handlePasswordChange}
        />
        {passwordError && (
          <span className="text-red-500 text-sm">{passwordError}</span>
        )}
        <Input
          label="다시 입력해 주세요"
          name="passwordRepeat"
          type="password"
          value={repeat}
          onChange={handleRepeatChange}
        />
        {repeatError && (
          <span className="text-red-500 text-sm">{repeatError}</span>
        )}
        {err && (
          <span className="text-red-500 my-2 block border border-border p-3 rounded-md">
            {err}
          </span>
        )}
        <Button
          className="cursor-pointer"
          type="submit"
          disabled={
            isLoading ||
            !newPassword ||
            !repeat ||
            passwordError !== "" ||
            repeatError !== ""
          }
        >
          비밀번호 변경하기
        </Button>
      </form>
    </main>
  );
}
