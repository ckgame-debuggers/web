"use client";
import NewBugForm from "@/components/section/debug/new-bug-form";
import NewQuestionForm from "@/components/section/debug/new-question";
import DebugNotice from "@/components/section/debug/notice";
import DebuggerSetType from "@/components/section/debug/set-type";
import RequireLogin from "@/components/util/require-login";
import { useState } from "react";

const formItems = {
  debug: {
    title: "저희에게 제보해 주세요!",
    semiTitle: "새로운 버그를 발견하셨나요?",
    element: NewBugForm,
  },
  question: {
    title: "무엇이든 물어봐 주세요!",
    semiTitle: "학생회에 궁금한 점이 있으신가요?",
    element: NewQuestionForm,
  },
} as const;

export default function DebugNewPage() {
  const [currentItem, setCurrentItem] = useState<"debug" | "question">("debug");

  const { title, semiTitle, element: Element } = formItems[currentItem];

  return (
    <main className="transition-height max-w-[900px] duration-300 ease-in-out mx-auto my-15">
      <RequireLogin />
      <div className="text-center pb-5">
        <p className="text-primary">{semiTitle}</p>
        <h1 className="text-3xl font-black">{title}</h1>
      </div>
      <DebuggerSetType current={currentItem} changeItem={setCurrentItem} />
      <div className=" max-w-[900px] mt-5 mx-auto mb-5">
        <DebugNotice />
      </div>
      <Element />
    </main>
  );
}
