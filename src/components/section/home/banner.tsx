"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import { DebuggersAPI } from "@/components/util/api";

export default function HomeBanner() {
  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const prepare = async () => {};
    prepare();
  }, []);
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
      <SwiperSlide>
        <BannerItem
          title="디버거즈 웹 페이지 오픈"
          desc={
            "디버거즈 웹 사이트가 드디어 오픈되었습니다.\n다양한 기능과 정보를 제공하며, 사용자 친화적인 인터페이스로 여러분을 맞이합니다."
          }
          img="/gyao/갸오엽서_봄.png"
          href="https://youtube.com"
        />
      </SwiperSlide>
      <SwiperSlide>
        <BannerItem
          title="중간고사 기간이 되었습니다"
          desc={
            "힘내세요! 여러분의 노력이 결실을 맺을 거예요!\n모두가 최선을 다하고 있으니, 좋은 결과가 있을 거예요!"
          }
          img="/gyao/시험대박.png"
          href="/gyao/시험대박.png"
        />
      </SwiperSlide>
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
    <Link href={href} target={href.startsWith("https://") ? "_blank" : ""}>
      <div className="relative bg-background">
        <div className="max-w-[1200px] mx-auto pl-15">
          <div className="absolute z-50 bottom-20">
            <h2 className="text-5xl font-black">{title}</h2>
            <div className="h-5"></div>
            {desc.split("\n").map((str, i) => (
              <Fragment key={i}>
                <p>{str}</p>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="w-full h-full bg-black opacity-50 absolute left-0 top-0 z-0"></div>
        <img className="w-full h-96 object-cover object-center" src={img} />
      </div>
    </Link>
  );
}
