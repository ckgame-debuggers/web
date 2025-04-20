"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function RegisterSuccessPage() {
  const searchParams = useSearchParams();
  const { width, height } = useWindowSize();
  const name = searchParams.get("name");

  return (
    <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18">
      <ReactConfetti width={width} height={height} numberOfPieces={50} />
      <h1 className="font-semibold text-3xl">가입 완료를 축하드립니다!</h1>
      <p>
        {name} 님의 회원가입을 성공적으로 완료하였습니다.
        <br />
        가입 완료를 진심으로 축하드립니다!
      </p>
      <Link className="mt-5 underline hover:text-primary" href={"/login"}>
        로그인하기
      </Link>
    </main>
  );
}
