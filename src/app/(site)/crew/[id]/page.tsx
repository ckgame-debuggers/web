"use client";

import { buttonVariants } from "@/components/ui/button";
import { DebuggersAPI } from "@/components/util/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";

export default function CrewItemPage() {
  const { id } = useParams();
  const [crew, setCrew] = useState<CrewType>({
    id: 0,
    title: "",
    isRecruiting: false,
    maxPeople: 0,
    createdAt: "",
    description: "",
  });
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    const prepare = async () => {
      try {
        const foundCrew: CrewType = (await debuggersAPI.get(`/crew/${id}`)).data
          .data;
        setCrew(foundCrew);
      } catch (error) {
        console.error("소모임 데이터를 불러오는데 실패했습니다:", error);
      }
    };
    prepare();
  }, [id, debuggersAPI]);

  if (!crew.id) {
    return <div>로딩중...</div>;
  }

  return (
    <main className="max-w-[900px] mx-auto my-15">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">{crew.title}</h1>
          <p>
            {crew.isRecruiting ? "모집 중. " : "모집하고 있지 않음. "}
            {crew.createdAt}에 생성됨.
          </p>
        </div>
        <div>
          {crew.isRecruiting ? (
            <Link
              href={`/crew/applicate/${crew.id}`}
              className="border-primary border font-semibold text-primary w-fit flex text-sm justify-center items-center py-2 px-5 rounded-full hover:bg-primary hover:text-primary-foreground"
            >
              지원하기
            </Link>
          ) : (
            <p className="border-secondary-foreground border font-semibold text-secondary-foreground w-fit flex text-sm justify-center items-center py-2 px-5 rounded-full cursor-not-allowed">
              지원이 마감되었습니다.
            </p>
          )}
        </div>
      </div>
      <div className="ql-snow my-10">
        <p className="font-semibold text-lg mb-5    ">크루 설명</p>
        <div className="ql-editor">{HtmlParser(crew.description)}</div>
      </div>
    </main>
  );
}
