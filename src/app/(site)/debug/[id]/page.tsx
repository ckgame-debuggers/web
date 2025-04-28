"use client";
import DebugCommentBody from "@/components/section/debug/comment-body";
import CommentWriter from "@/components/section/debug/comment-writer";
import { DebuggersAPI } from "@/components/util/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import parse from "react-html-parser";

import notFoundImage from "$/resources/notfound.png";

export default function DebugItem() {
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [bug, setBug] = useState<DebugBugType>({
    id: 0,
    title: "",
    contents: "",
    createdAt: "",
    index: 0,
    solved: false,
    debuggersAnswer: "",
  });
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    const prepare = async () => {
      try {
        const found: DebugBugType = (
          await debuggersAPI.get(`debuggers/bug/${id}`)
        ).data.data;
        if (!found) {
          setNotFound(true);
          return;
        }
        setBug(found);
      } catch (e) {
        setNotFound(true);
      }
    };
    prepare();
  }, []);

  if (notFound) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center w-full my-10">
          <Image className="w-52" src={notFoundImage} alt="not-found" />
          <p className="text-secondary-foreground">
            아이디가 {id}인 버그는 찾을 수 없었어요.. ㅠㅠ정
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="text-center py-5">
        <p className="text-primary">게임스쿨 버그 - #{bug.index}</p>
        <h1 className="text-3xl font-black">{bug.title}</h1>
      </div>
      <div className="font-semibold max-w-[800px] px-5 mx-auto my-10">
        <div className="ql-snow">
          <div className="ql-editor">
            {typeof bug.contents === "string" ? parse(bug.contents) : null}
          </div>
        </div>
      </div>
      <div className="w-full max-w-[800px] mx-auto h-[1px] bg-border"></div>
      {bug.solved ? (
        <div className="border border-primary rounded-md w-full max-w-[800px] mx-auto my-5 p-5">
          <h4 className="text-sm">학생회의 답변</h4>
          <p className="mt-3">{bug.debuggersAnswer}</p>
        </div>
      ) : (
        <></>
      )}
      <div className="max-w-[800px] mx-auto p-3 border border-border rounded-md">
        <CommentWriter />
      </div>
      <DebugCommentBody id={`${id}`} />
    </main>
  );
}
