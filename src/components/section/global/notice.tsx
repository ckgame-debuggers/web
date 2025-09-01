"use client";

import { DebuggersAPI } from "@/components/util/api";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Notice() {
  const [notices, setNotices] = useState<{ title: string; id: number }[]>([]);
  const debuggetsAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const res = (await debuggetsAPI.get("/global/notices")).data.data;
      setNotices(res);
    };
    prepare();
  }, []);
  if (notices.length === 0) return <></>;

  return (
    <div className="bg-primary text-primary-foreground p-1">
      <div className="max-w-[1200px] mx-auto relative">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="w-full"
          modules={[Autoplay, EffectFade]}
        >
          {notices.map((item, i) => {
            return (
              <SwiperSlide className="bg-primary w-[100vw] px-5" key={i}>
                <NoticeItem title={item.title} href={`/notice/${item.id}`} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

function NoticeItem({ title, href }: { title: string; href: string }) {
  return (
    <div className="w-full flex justify-center">
      <Link href={href} className="w-full max-w-[1200px] flex justify-between">
        <h4 className="font-bold mt-[-1px]">{title}</h4>
        <div className="hidden md:flex items-center gap-2 text-sm text-primary-foreground/70">
          <p>좌우로 스와이프하여 더 많은 공지사항을 확인하세요</p>
          <div className="flex items-center gap-1 animate-swipe-hint">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
