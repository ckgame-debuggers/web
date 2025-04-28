import Link from "next/link";

export default function DebugListItem({ bug }: { bug: DebugBugType }) {
  return (
    <Link
      href={`/debug/${bug.id}`}
      className="w-full flex gap-3 group cursor-pointer"
    >
      <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 text-xl flex justify-center items-center">
        <p>#{bug.index}</p>
      </div>
      <div className="border border-border w-full p-3 rounded-md group-hover:shadow-lg group-hover:translate-y-[-5px] transition-all">
        <h4 className="text-xl font-bold">{bug.title}</h4>
        <p>
          {bug.createdAt} | {bug.solved ? "답변 완료" : "미답변"}
        </p>
      </div>
    </Link>
  );
}
