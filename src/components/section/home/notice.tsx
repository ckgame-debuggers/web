"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const exampleNoticeData = [
  { title: "개인정보 처리방침을 변경하고 있습니다.", id: "/" },
  { title: "서비스 이용약관 변경", id: "/" },
  { title: "시스템 점검 안내", id: "/" },
  { title: "신규 기능 업데이트", id: "/" },
  { title: "이벤트 참여 방법", id: "/" },
];

export default function HomeNotice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notices, setNotices] = useState<{ title: string; id: string }[]>([]);
  useEffect(() => {
    setNotices(exampleNoticeData);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground p-1">
      <div className="max-w-[1100px] mx-auto">
        {notices.map((item, i) => {
          return (
            <div
              style={{
                display: currentIndex === i ? "block" : "none",
              }}
              key={i}
            >
              <NoticeItem title={item.title} href={`/notice/${item.id}`} />
            </div>
          );
        })}
        <IndexController />
      </div>
    </div>
  );
}

function NoticeItem({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href}>
      <h4 className="font-bold mt-[-1px]">{title}</h4>
    </Link>
  );
}

function IndexController() {
  return <div></div>;
}
  