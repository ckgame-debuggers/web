"use client";
import { DebuggersAPI } from "@/components/util/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type noticeType = { title: string; expiredAt: string; contents: string };

export default function NoticeItemPage() {
  const [notice, setNotice] = useState<noticeType | undefined>();
  const [content, setContent] = useState<string[]>([]);
  const { id } = useParams();
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    const prepare = async () => {
      try {
        const res = (await debuggersAPI.get(`/global/notice?id=${id}`)).data
          .data;
        if (!res) {
          window.location.href = "/404";
          return;
        }
        setNotice(res);
        setContent(res.contents.split("\n"));
      } catch (e) {
        window.location.href = "/404";
      }
    };
    prepare();
  }, []);

  return (
    <main className="p-5 max-w-[800px] mx-auto my-20">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-black">{notice?.title}</h1>
        <p className="text-muted-foreground mt-3">
          {notice?.expiredAt &&
            `만료일: ${new Date(notice.expiredAt).toLocaleDateString()}`}
        </p>
      </div>
      <div className="border border-border rounded-lg p-8 shadow-sm">
        {content.map((item, i) => (
          <div key={i} className="leading-relaxed">
            {item === "" ? (
              <div className="h-6" /> // Empty line spacing
            ) : (
              <p className="whitespace-pre-wrap">{item}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
