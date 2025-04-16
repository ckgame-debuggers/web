import Link from "next/link";

export default function CrewCreateRequestedPage() {
  return (
    <main className="max-w-[900px] mx-auto flex flex-col gap-3 my-18">
      <h1 className="font-semibold text-3xl">소모임 생성 요청 완료</h1>
      <p>
        소모임 생성 요청이 성공적으로 작성되었습니다.
        <br />
        빠른 시일 내에 심사 후 이메일로 결과를 알려드리겠습니다.
      </p>
      <Link className="mt-5 underline hover:text-primary" href={"/crew"}>
        다른 소모임들 확인하기
      </Link>
    </main>
  );
}
