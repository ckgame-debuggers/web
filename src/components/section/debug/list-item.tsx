import Link from "next/link";

export default function DebugListItem() {
  return (
    <Link
      href={"/debug/bug/123"}
      className="w-full flex gap-3 group cursor-pointer"
    >
      <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 text-xl flex justify-center items-center">
        <p>#1</p>
      </div>
      <div className="border border-border w-full p-3 rounded-md group-hover:shadow-lg group-hover:translate-y-[-5px] transition-all">
        <h4 className="text-xl font-bold">용석이형이 운동을 안 해요</h4>
        <p>ck2025 작성 | 답변 완료</p>
      </div>
    </Link>
  );
}
