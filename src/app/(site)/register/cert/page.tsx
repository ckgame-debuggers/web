"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RegisterCertPage() {
  const searchParams = useSearchParams();
  const schoolNumber = searchParams.get("schoolnumber");

  return (
    <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18">
      <h1 className="font-semibold text-3xl">이메일을 인증해 주세요.</h1>
      <p>
        {schoolNumber}@chungkang.academy로 인증 이메일을 전송했습니다.
        <br />
        전송된 이메일을 활용해 이메일을 인증해 주세요.
        <br />
        <br />
        이메일을 받지 못하셨다면, 스팸함을 확인해 주세요!
      </p>
      <Link
        className="mt-5 underline hover:text-primary"
        href={"https://o365.ck.ac.kr/adfs/ls/sso/main.aspx"}
        target="_blank"
      >
        여기에서 확인하실 수 있어요!
      </Link>
    </main>
  );
}
