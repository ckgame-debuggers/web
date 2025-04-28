"use client";

import notFoundImage from "$/resources/notfound.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import DebugListItem from "./list-item";
import { DebuggersAPI } from "@/components/util/api";

export default function DebugBugsContainer() {
  const [bugs, setBugs] = useState<DebugBugType[]>([]);
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    const prepare = async () => {
      const found = (await debuggersAPI.get("/debuggers?page=0&take=15")).data
        .data;
      setBugs(found);
    };
    prepare();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {bugs.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full my-10">
          <Image className="w-52" src={notFoundImage} alt="not-found" />
          <p className="text-secondary-foreground">
            여기엔 아무것도 없는 것 같아요..
          </p>
        </div>
      ) : (
        bugs.map((bug, i) => <DebugListItem bug={bug} key={i} />)
      )}
    </div>
  );
}
