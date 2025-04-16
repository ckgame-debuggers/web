"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function RegisterSchoolNumbForm() {
  const [isLoading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [value, setValue] = useState("");

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^\d+$/.test(e.target.value)) {
      setErrorText("숫자만 입력할 수 있습니다.");
    } else if (!/^\d{4}13\d{3}$/.test(e.target.value)) {
      setErrorText("게임스쿨 학생만 가입하실 수 있습니다.");
    } else if (e.target.value.length !== 9) {
      setErrorText("학번은 9글자여야 합니다.");
    } else {
      setErrorText("");
    }
    setValue(e.target.value);
  };

  const sendVerifyEmail = async () => {
    if (isLoading) return;
    if (value === "" || errorText !== "") {
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/smtp/cert`,
        {
          email: `${value}@chungkang.academy`,
        },
        {
          withCredentials: true,
        }
      );
      window.location.href = `/register/cert?schoolnumber=${value}`;
    } catch (error: any) {
      if (
        error.response?.data?.message ===
        `User with email ${value}@chungkang.academy already exists`
      ) {
        setErrorText("이미 가입된 사용자입니다.");
      } else {
        setErrorText("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-80 mx-10 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Input
          label="학번을 입력해주세요."
          name="schoolnumber"
          onChange={onTextChange}
          value={value}
          type="number"
        />
        {errorText !== "" ? (
          <p className="text-sm text-red-500">{errorText}</p>
        ) : (
          <></>
        )}
      </div>
      <Button
        className={`w-full transition-all duration-300 ease-in-out flex justify-center cursor-pointer`}
        onClick={sendVerifyEmail}
        disabled={value === "" || errorText !== ""}
      >
        {!isLoading ? (
          "인증번호 보내기"
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
    </div>
  );
}
