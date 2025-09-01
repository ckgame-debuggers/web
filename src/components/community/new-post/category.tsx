"use client";
import { DebuggersAPI } from "@/components/util/api";
import { ReactNode, useEffect, useRef, useState } from "react";

export default function CommunityNewPostSetCategory({
  defaultCategory,
  onSelect,
}: {
  defaultCategory?: number;
  onSelect?: (e: number) => void;
}) {
  const debuggersAPI = DebuggersAPI.getInstance();
  const [categories, setCateogires] = useState<CommunityCategoryType[]>([]);
  const [selected, setSelected] = useState(defaultCategory ?? 0);
  const [openHeight, setOpenHeight] = useState(0);
  const [open, setOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prepare = async () => {
      const res = (await debuggersAPI.get("/community/category")).data
        .data as CommunityCategoryType[];
      console.log(res);
      setCateogires(res);
    };
    prepare();
  }, []);

  useEffect(() => {
    if (!contentRef) return;
    setOpenHeight(contentRef.current?.offsetHeight ?? 0);
  }, [contentRef, categories]);

  return (
    <>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        style={{
          borderColor: open ? "var(--primary)" : "",
          color:
            selected !== 0
              ? ""
              : "color-mix(in oklab, var(--foreground) 60%, transparent)",
        }}
        className="p-3  text-sm font-bold border w-full flex justify-between items-center cursor-pointer  transition-all ease-in-out duration-500"
      >
        <p>
          {selected === 0
            ? "카테고리를 선택해주세요"
            : categories.find((c) => c.id === selected)?.title}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 transition-transform ease-in-out duration-500"
          style={{
            rotate: open ? "180deg" : "",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className="overflow-hidden font-bold border-b border-r border-l w-full mb-5 transition-all ease-in-out duration-500"
        style={{
          height: open ? `${openHeight}px` : "0px",
          borderBottomWidth: open ? "1px" : "0px",
          borderColor: open ? "var(--primary)" : "",
        }}
      >
        <div ref={contentRef}>
          <p className="p-3 border-b bg-foreground/5 text-xs text-foreground/60">
            카테고리를 선택해주세요.
          </p>
          {categories.map((category, i) => {
            return (
              <div key={i}>
                <button
                  className="w-full text-start text-sm p-3 cursor-pointer"
                  onClick={() => {
                    setSelected(category.id);
                    setOpen(false);
                    if (onSelect) onSelect(category.id);
                  }}
                  style={{
                    color:
                      selected === category.id ? "var(--primary)" : "inherit",
                  }}
                >
                  {category.title}
                </button>
                {i !== categories.length ? (
                  <div className="bg-border h-[1px] w-full"></div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
