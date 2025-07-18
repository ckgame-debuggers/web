"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function RegisterSuccessPage() {
  return (
    <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18">
      <h1 className="font-semibold text-3xl">
        비밀번호 변경을 완료하였습니다.
      </h1>
      <p>
        비밀번호를 성공적으로 변경하였습니다.
        <br />
        <span className="font-bold text-primary">모든 세션에서 로그아웃</span>
        됩니다.
      </p>
      <Link className="mt-5 underline hover:text-primary" href={"/login"}>
        로그인하기
      </Link>
    </main>
  );
}
