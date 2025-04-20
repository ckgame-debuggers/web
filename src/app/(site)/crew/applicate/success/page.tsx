"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWindowSize } from "react-use";

export default function CrewApplicateSuccessPage() {
  const searchParams = useSearchParams();
  const crewName = searchParams.get("crewname");

  return (
    <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18">
      <h1 className="font-semibold text-3xl">
        소모임 가입 신청을 완료하였습니다.
      </h1>
      <p>
        {crewName} 소모임에 가입을 신청하였습니다.
        <br />
        모임장의 검토 후, 이메일을 보내드리겠습니다.
      </p>
      <Link className="mt-5 underline hover:text-primary" href={"/crew"}>
        다른 소모임 둘러보기
      </Link>
    </main>
  );
}
