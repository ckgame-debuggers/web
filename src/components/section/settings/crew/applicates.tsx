"use client";

import { DebuggersAPI } from "@/components/util/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import notFoundImage from "$/resources/notfound.png";
import SettingCrewApplicateItem from "./applicate-item";

export default function SettingCrewApplicates() {
  const { id } = useParams();
  const [applicates, setApplicates] = useState<CrewApplicateType[]>([]);
  const debuggersApi = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      try {
        const found = (
          await debuggersApi.get(
            `/crew/applications?crewId=${id}&take=15&page=0`
          )
        ).data.data;
        console.log(found);
        if (!found) return;
        setApplicates(found);
      } catch (error) {
        console.error("크루 지원자 목록을 불러오는데 실패했습니다:", error);
      }
    };
    prepare();
  }, []);
  return (
    <div>
      <div className="flex gap-5 items-center mt-10">
        <p>크루 지원자 확인</p>
        <div className="flex-1 h-[1px] bg-border"></div>
      </div>
      <div className="mt-5 w-full flex flex-col">
        {applicates.length === 0 ? (
          <div className="text-center flex flex-col items-center">
            <Image className="w-52" src={notFoundImage} alt="not-found" />
            <p className="text-secondary-foreground">
              여기엔 아무것도 없는 것 같아요..
            </p>
          </div>
        ) : (
          applicates.map((applicate, i) => (
            <SettingCrewApplicateItem applicate={applicate} key={i} />
          ))
        )}
      </div>
    </div>
  );
}
