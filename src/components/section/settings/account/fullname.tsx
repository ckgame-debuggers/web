"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";

export default function SettingFullnameChange({
  fullName,
}: {
  fullName: string;
}) {
  const [isOpened, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setOpen(!isOpened);
        }}
        className="flex justify-between p-3 bg-background relative z-10 cursor-pointer"
      >
        <h4>실명</h4>
        <div className="flex gap-3 items-center">
          <p>{fullName}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-secondary-foreground transition-transform"
            style={{ rotate: isOpened ? "180deg" : "none" }}
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
        className="overflow-hidden relative z-0"
        style={{
          opacity: isOpened ? 1 : 0,
          transform: isOpened ? "translateY(0)" : "translateY(-100%)",
          height: isOpened ? `${contentHeight}px` : "0px",
          transition: "all 300ms ease-in-out",
        }}
      >
        <div ref={contentRef} className="p-3 flex gap-2">
          <Input label="새로운 이름을 입력해 주세요." name="mobile-number" />
          <Button className="px-2 w-24">저장</Button>
        </div>
      </div>
    </>
  );
}
