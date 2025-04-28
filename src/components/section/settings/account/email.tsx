"use client";

import useUserStore from "@/store/user";
import { useState, useRef, useEffect } from "react";

export default function SettingEmailChange() {
  const [isOpened, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

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
        <h4>이메일</h4>
        <div className="flex gap-3 items-center">
          <p>{user.email}</p>
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
        <div ref={contentRef} className="p-3 ">
          <p className="text-red-500">이메일은 변경할 수 없습니다.</p>
        </div>
      </div>
    </>
  );
}
