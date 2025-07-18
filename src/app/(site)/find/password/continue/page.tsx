"use client";
import { DebuggersAPI } from "@/components/util/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FindPWContinue() {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const schoolNumber = useSearchParams().get("schoolnumber");
  const email = `${schoolNumber}@chungkang.academy`;

  useEffect(() => {
    DebuggersAPI.getInstance()
      .post("/smtp/cert", { email, type: "reset-password" })
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        let msg = "알 수 없는 에러가 발생하였습니다.";
        if (err?.response?.data?.message) {
          msg = err.response.data.message;
        } else if (err?.message) {
          msg = err.message;
        }
        setErrorMsg(msg);
      });
  }, [email]);

  if (status === "loading")
    return (
      <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18 w-full py-1.5 justify-center items-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
          viewBox="0 0 100 101"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </main>
    );

  if (status === "error")
    return (
      <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18">
        <h1 className="font-semibold text-3xl">에러가 발생하였습니다.</h1>
        <p>
          {email}로 이메일을 전송하던 도중 에러가 발생하였습니다.
          <br /> 정상적인 경로로 시도하였는지, 인터넷 환경은 어떤지 확인해
          주세요.
          <span className="text-red-500 my-5 block border border-border p-3 rounded-md">
            {errorMsg}
          </span>
          문제가 지속되신다면, 위 메시지와 함께{" "}
          <Link
            className="mt-5 underline hover:text-primary"
            href="https://open.kakao.com/o/sbrVyPzh"
            target="_blank"
          >
            여기
          </Link>
          로 문의해 주세요!
        </p>
      </main>
    );

  return (
    <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18">
      <h1 className="font-semibold text-3xl">이메일을 인증해 주세요.</h1>
      <p>
        {email}로 인증 이메일을 전송했습니다.
        <br />
        전송된 이메일을 활용해 이메일을 인증해 주세요.
        <br />
        <br />
        이메일을 받지 못하셨다면,{" "}
        <span className="font-bold text-primary">스팸함을 확인</span>해 주세요!
        <br />
        인증 메일은 3분 동안만 유효합니다.
      </p>
      <Link
        className="mt-5 underline hover:text-primary"
        href="https://o365.ck.ac.kr/adfs/ls/sso/main.aspx"
        target="_blank"
      >
        여기에서 확인하실 수 있어요!
      </Link>
    </main>
  );
}
