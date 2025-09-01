"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { DebuggersAPI } from "@/components/util/api";

type BannerType = {
  id: number;
  title: string;
  image: string;
  url: string;
  contents: string;
  visible: boolean;
};

export default function HomeBanner() {
  const [bannerItems, setBannerItems] = useState<BannerType[]>([]);
  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {
      const res: BannerType[] = (await debuggersAPI.get("/global/banners")).data
        .data;
      setBannerItems(res);
    };
    prepare();
  }, []);

  if (bannerItems.length === 0)
    return (
      <div className="text-foreground/50 flex flex-col items-center justify-center gap-2 py-20 border-b">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>

        <h3>배너 정보를 불러올 수 없었어요.</h3>
      </div>
    );

  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        renderBullet: (index, className) => {
          return `<span class="${className}" style="background-color: var(--primary);"></span>`;
        },
      }}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      className="text-white"
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
    >
      {bannerItems.map((banner, i) => (
        <SwiperSlide key={i}>
          <BannerItem
            title={banner.title}
            desc={banner.contents}
            img={banner.image}
            href={banner.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function BannerItem({
  href,
  title,
  desc,
  img,
}: {
  href: string;
  title: string;
  desc: string;
  img: string;
}) {
  return (
    <Link href={href} target="_blank">
      <div className="relative bg-background">
        <div className="max-w-[1200px] mx-auto pl-4 md:pl-15">
          <div className="absolute z-50 bottom-10 md:bottom-20">
            <h2 className="text-2xl md:text-5xl font-black">{title}</h2>
            <div className="h-2 md:h-5"></div>
            {desc.split("\n").map((str, i) => (
              <Fragment key={i}>
                <p className="text-sm md:text-md ">{str}</p>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-0"></div>
        <img className="w-full h-96 object-cover object-center" src={img} />
      </div>
    </Link>
  );
}
