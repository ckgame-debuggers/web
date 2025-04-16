"use client";

export default function DebuggerSetType({
  current,
  changeItem,
}: {
  current: "debug" | "question";
  changeItem: (item: "debug" | "question") => void;
}) {
  return (
    <div className="flex relative justify-around max-w-[900px] mx-auto border border-border mb-5 p-1 rounded-md">
      <button
        onClick={() => changeItem("debug")}
        className={`p-1 cursor-pointer flex-1 text-center rounded-sm transition-colors ${
          current === "debug" ? "bg-primary text-white" : ""
        }`}
      >
        버그 제보
      </button>
      <button
        onClick={() => changeItem("question")}
        className={`p-1 cursor-pointer flex-1 text-center rounded-sm transition-colors ${
          current === "question" ? "bg-primary text-white" : ""
        }`}
      >
        질문 등록
      </button>
    </div>
  );
}
