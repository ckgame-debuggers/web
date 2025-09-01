"use client";
import { DebuggersAPI } from "@/components/util/api";
import { useEffect, useState } from "react";
import parse from "react-html-parser";

export default function AboutPage() {
  const [contents, setContents] = useState("");
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    const prepare = async () => {
      const data = (await debuggersAPI.get("/global/about")).data
        .data as string;
      setContents(data);
    };
    prepare();
  }, []);
  return (
    <main className="flex flex-col gap-10 py-10 max-w-[900px] mx-auto px-10">
      <section>
        <div className="ql-snow">
          <div className="ql-editor">{parse(contents)}</div>
        </div>
      </section>
    </main>
  );
}
