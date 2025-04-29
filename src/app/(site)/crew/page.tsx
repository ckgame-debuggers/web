import GetAllCrews from "@/components/section/crew/get-all-crews";

export default function Crew() {
  return (
    <main className="mx-auto max-w-[1200px] mb-20 px-5">
      <div className=" my-14 text-center">
        <h1 className="font-bold text-3xl mb-5">게임스쿨 소모임</h1>
        <p>취미를 공유할 학우들을 찾아보세요.</p>
      </div>
      <div className="w-full my-5 flex flex-col gap-5">
        <GetAllCrews />
      </div>
    </main>
  );
}
