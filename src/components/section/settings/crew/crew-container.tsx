"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

import notFoundImage from "$/resources/notfound.png";
import Image from "next/image";
import SettingCrewItem from "./crew-item";
import { DebuggersAPI } from "@/components/util/api";

export default function SettingCrewContainer() {
  const [crews, setCrews] = useState<CrewType[]>([]);
  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const found = (await debuggersAPI.get("/crew/my")).data.data;
      console.log(found);
      if (!found) {
        return;
      }
      setCrews(found);
    };
    prepare();
  }, []);

  return (
    <div className="py-5">
      <div className="flex justify-between items-center">
        <h3>{crews.length}개의 소모임에 참여하고 계세요.</h3>
        <Link className={buttonVariants({ size: "sm" })} href="/crew/new">
          크루 만들기
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full my-10">
        {crews.length === 0 ? (
          <>
            <Image className="w-52" src={notFoundImage} alt="not-found" />
            <p className="text-secondary-foreground">
              여기엔 아무것도 없는 것 같아요..
            </p>
          </>
        ) : (
          crews.map((crew, i) => (
            <div key={i} className="w-full">
              <SettingCrewItem
                crew={{
                  id: 1,
                  isRecruiting: true,
                  maxPeople: 10,
                  title: crew.title,
                  description:
                    crew.description.length > 20
                      ? crew.description.slice(0, 20) + "..."
                      : crew.description,
                  createdAt: "2024-01-01",
                }}
              />
              {i < crews.length - 1 ? (
                <div className="w-full h-[1px] bg-border"></div>
              ) : (
                <></>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
