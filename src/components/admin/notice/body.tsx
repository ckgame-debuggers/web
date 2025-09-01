"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DebuggersAPI } from "@/components/util/api";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  Dispatch,
  SetStateAction,
} from "react";

type Notice = {
  id?: number;
  title: string;
  contents: string;
  expiredAt?: Date | string;
};

export default function NoticeBody() {
  const [notices, setNotices] = useState<Notice[]>([]);

  const handleAddNotice = useCallback(() => {
    setNotices((prev) => [
      ...prev,
      {
        title:
          "방금 생성된 공지사항입니다. 저장 버튼을 누르기 전까지 서버에 적용되지 않습니다.",
        contents: "",
      },
    ]);
  }, []);

  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const res = (await debuggersAPI.get("/global/notices")).data.data;
      setNotices(res);
    };
    prepare();
  }, []);

  return (
    <>
      <div className="pt-5 w-full">
        {notices.length !== 0 ? (
          notices.map((notice, i) => (
            <MemoizedNoticeItem
              title={notice.title}
              contents={notice.contents}
              id={notice.id}
              setNotices={setNotices}
              date={notice.expiredAt}
              index={i}
              key={i}
            />
          ))
        ) : (
          <div className="border rounded-md w-full p-5 text-center">
            <p>
              공지 글이 하나도 없는 것 같아요. 아래 버튼을 눌러 추가해 주세요.
            </p>
          </div>
        )}
      </div>
      <button
        onClick={handleAddNotice}
        className="group border p-2 w-full hover:border-primary hover:text-primary transition-colors duration-500 ease-in-out rounded-md flex justify-center my-4 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </>
  );
}

const NoticeItem = memo(function NoticeItem({
  id,
  title,
  contents,
  date,
  setNotices,
  index,
}: {
  id?: number;
  title: string;
  contents: string;
  date?: Date | string;
  setNotices: Dispatch<SetStateAction<Notice[]>>;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [innerContents, setInnerContents] = useState(contents);
  const [innerTitle, setInnerTitle] = useState(title);
  const [innerDate, setInnerDate] = useState<Date | undefined>(
    date ? (date instanceof Date ? date : new Date(date)) : undefined
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [innerContents]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerTitle(e.target.value);
    },
    []
  );

  const handleContentsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
      setInnerContents(e.target.value);
    },
    []
  );

  const handleSave = useCallback(async () => {
    const params: any = {
      title: innerTitle,
      contents: innerContents,
    };
    console.log(innerDate);
    if (innerDate instanceof Date) {
      params.expiredAt = innerDate.toISOString();
      console.log(params);
    }
    if (id) params.id = id;
    await debuggersAPI.post("/admin/notice", params);
    window.location.reload();
  }, [
    debuggersAPI,
    id,
    index,
    innerContents,
    innerTitle,
    innerDate,
    setNotices,
  ]);

  const handleDelete = useCallback(async () => {
    if (id) {
      await debuggersAPI.delete(`/admin/notice?id=${id}`);
      window.location.reload();
    }
    setNotices((prev) => {
      const newNotices = [...prev];
      newNotices.splice(index, 1);
      return newNotices;
    });
  }, [index, setNotices]);

  return (
    <div
      className="my-1 font-bold border-border rounded-md border w-full overflow-hidden transition-colors duration-500 ease-in-out"
      style={{
        borderColor: isOpen ? "var(--primary)" : "inherit",
      }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-5 py-4 w-full flex items-center justify-between cursor-pointer"
      >
        <p>{title}</p>
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{
            rotate: isOpen ? "180deg" : "inherit",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>
      <div
        className="w-full h-[1px] bg-border opacity-0 transition-colors duration-500 ease-in-out"
        style={{
          opacity: isOpen ? "100%" : "inherit",
          backgroundColor: isOpen ? "var(--primary)" : "inherit",
        }}
      ></div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentHeight + 40}px` : "0px",
          padding: isOpen ? "1.25rem" : "0px 1.25rem",
        }}
      >
        <div ref={contentRef}>
          <Input
            label="타이틀을 입력해주세요"
            name="title"
            value={innerTitle}
            onChange={handleTitleChange}
          />
          <div className="border border-border rounded-md p-2 w-full flex justify-between my-2">
            <p className="text-foreground/50">만료 날짜를 선택해 주세요 : </p>
            <input
              type="date"
              className="flex-1 mx-2 cursor-pointer"
              value={
                innerDate instanceof Date
                  ? innerDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setInnerDate(
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
            />
          </div>
          <div className="relative my-3">
            <p
              className="absolute top-[-8px] px-2 mx-1 z-10 transition-all text-foreground/50 duration-150 ease-in-out"
              style={{
                fontSize: innerContents !== "" ? "var(--text-xs)" : "inherit",
                top: innerContents !== "" ? "-8px" : "8px",
                backgroundColor:
                  innerContents !== "" ? "var(--background)" : "",
              }}
            >
              내용을 입력해주세요
            </p>
            <div className="relative z-0 border border-border overflow-hidden rounded-md my-2">
              <textarea
                className="w-full focus:outline-none resize-none p-2"
                onChange={handleContentsChange}
                value={innerContents}
                style={{
                  minHeight: "100px",
                  height: "auto",
                  overflow: "hidden",
                }}
              />
            </div>
          </div>
          <Button onClick={handleSave} className="block w-full">
            <p className="font-bold">저장하기</p>
          </Button>
          <Button
            onClick={handleDelete}
            variants="destructive"
            className="block w-full mt-1"
          >
            <p className="font-bold">삭제하기</p>
          </Button>
        </div>
      </div>
    </div>
  );
});

const MemoizedNoticeItem = memo(NoticeItem);
