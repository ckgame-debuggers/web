"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const exampleNoticeData = [
  { title: "2월 4주차 공지사항 #1 : 개인정보 처리방침 안내", href: "/" },
  { title: "2월 4주차 공지사항 #2 : 서비스 이용약관 변경", href: "/" },
  { title: "3월 1주차 공지사항 #1 : 시스템 점검 안내", href: "/" },
  { title: "3월 1주차 공지사항 #2 : 신규 기능 업데이트", href: "/" },
  { title: "3월 1주차 공지사항 #3 : 이벤트 참여 방법", href: "/" },
];

export default function HomeNotice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notices, setNotices] = useState<{ title: string; href: string }[]>([]);
  useEffect(() => {
    setNotices(exampleNoticeData);
  }, []);

  return (
    <div className="mt-15 px-15">
      <h3 className="text-primary text-2xl font-black text-center mb-10">
        공지사항
      </h3>
      <div className="">
        {notices.map((item, i) => {
          return (
            <NoticeItem
              key={i}
              title={item.title}
              href={item.href}
              isActive={false}
            />
          );
        })}
      </div>
    </div>
  );
}

function NoticeItem({
  title,
  href,
  isActive = true,
}: {
  title: string;
  href: string;
  isActive?: boolean;
}) {
  return (
    <Link href={href}>
      <h4 className="text-lg font-bold">{title}</h4>
    </Link>
  );
}
