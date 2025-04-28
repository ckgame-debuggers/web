import DebuggersBugsContainer from "@/components/section/debug/bugs-container";
import DebugListItem from "@/components/section/debug/list-item";
import Link from "next/link";

export default function Debug() {
  return (
    <main className="mx-auto max-w-[1200px]">
      <div className=" my-14 text-center">
        <h1 className="font-bold text-3xl mb-5">CKGame Debuggers</h1>
        <p>당신이 알고 있는 게임스쿨의 버그를 제보해 주세요!</p>
      </div>
      <div className="w-full my-5 flex flex-col gap-5">
        <div className="flex justify-between items-center my-5">
          <h3 className="font-bold text-lg">0개의 버그를 발견했어요!</h3>
          <Link
            href={"/debug/new"}
            className="border-primary border font-semibold text-primary w-fit flex text-sm justify-center items-center py-2 px-5 rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <p>새로운 버그 제보</p>
          </Link>
        </div>
        <DebuggersBugsContainer />
      </div>
    </main>
  );
}
