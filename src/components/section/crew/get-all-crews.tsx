"use client";

import { DebuggersAPI } from "@/components/util/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import notFoundImage from "$/resources/notfound.png";

export default function GetAllCrews() {
  const [crews, setCrews] = useState<CrewType[]>([]);
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    const prepare = async () => {
      const foundCrews = (await debuggersAPI.get("/crew?page=0&take=15")).data
        .data as CrewType[];
      console.log(foundCrews);
      setCrews(foundCrews);
    };
    prepare();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center my-5 px-5">
        <h3 className="font-bold text-lg">
          {crews.length}개의 소모임을 발견했어요!
        </h3>
        <Link
          href={"/crew/new"}
          className="border-primary border font-semibold text-primary w-fit flex text-sm justify-center items-center py-2 px-5 rounded-full hover:bg-primary hover:text-primary-foreground"
        >
          <p>소모임 등록</p>
        </Link>
      </div>
      <div>
        {crews.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full my-10">
            <Image className="w-52" src={notFoundImage} alt="not-found" />
            <p className="text-secondary-foreground">
              여기엔 아무것도 없는 것 같아요..
            </p>
          </div>
        ) : (
          crews.map((crew, i) => (
            <div key={i}>
              <CrewItem
                title={crew.title}
                href={`/crew/${crew.id}`}
                createdAt={crew.createdAt}
                key={i}
              />
              {i !== crews.length - 1 && (
                <div className="w-full h-[1px] bg-border" />
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

function CrewItem({
  title,
  href,
  createdAt,
}: {
  title: string;
  href: string;
  createdAt: string;
}) {
  return (
    <Link
      href={href}
      className="group/crew cursor-pointer hover:text-primary transition-all "
    >
      <div className="z-10 px-5 group-hover/crew:bottom-0 transition-all flex justify-between items-center py-5">
        <h4 className="font-bold text-2xl">{title}</h4>
        <p className="text-sm mt-5">{createdAt}에 생성됨</p>
      </div>
    </Link>
  );
}
