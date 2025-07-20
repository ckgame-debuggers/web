"use client";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { DebuggersAPI } from "@/components/util/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CkGameDebugger() {
  const [solvedCount, setSolvedCount] = useState(0);
  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const foundSolvedCount = (
        await debuggersAPI.get("/global/solved-bug-count")
      ).data.data as number;
      setSolvedCount(foundSolvedCount ?? 0);
    };
    prepare();
  }, []);
  return (
    <section className="mb-10 mt-16 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 my-10 gap-5 w-fit md:w-auto mx-auto">
        <div className="flex flex-col items-center">
          <p>해결한 버그</p>
          <div className="flex items-end">
            <NumberTicker
              className="font-bold text-primary text-7xl"
              value={solvedCount}
            />
            <p>개</p>
          </div>
          <Link href={"/debug"} className="mt-5 text-secondary-foreground">
            버그 제보하기
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <p>운영 중인 서비스</p>
          <div className="flex items-end">
            <NumberTicker
              className="font-bold text-primary text-7xl"
              value={5}
            />
            <p>개</p>
          </div>
          <Link
            href={"https://cafe.naver.com/f-e/cafes/22694512/menus/98"}
            className="mt-5 text-secondary-foreground"
            target="_blank"
          >
            카페 확인하기
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <p>진행한 행사</p>
          <div className="flex items-end">
            <NumberTicker
              className="font-bold text-primary text-7xl"
              value={23}
            />
            <p>개</p>
          </div>
          <Link
            href={"https://cafe.naver.com/f-e/cafes/22694512/menus/98"}
            className="mt-5 text-secondary-foreground"
            target="_blank"
          >
            카페 확인하기
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <p>커뮤니티 유저</p>
          <div className="flex items-end">
            <NumberTicker
              className="font-bold text-primary text-7xl"
              value={42}
            />
            <p>명</p>
          </div>
          <Link
            href={"https://cafe.naver.com/f-e/cafes/22694512/menus/98"}
            className="mt-5 text-secondary-foreground"
            target="_blank"
          >
            커뮤니티 확인하기
          </Link>
        </div>
      </div>
    </section>
  );
}
