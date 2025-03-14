"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
export default function HomeBanner() {
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
        <div className="relative bg-background">
          <div className="max-w-[1200px] mx-auto pl-15">
            <div className="absolute z-50 bottom-20">
              <h2 className="text-5xl font-black">하반기 수강신청 시작</h2>
              <div className="h-5"></div>
              <p>
                수강신청 일정 2/18 - 2/20
                <br />
                자세한 내용은 게임콘텐츠스쿨 카페에
              </p>
            </div>
          </div>
          <div className="w-full h-full bg-black opacity-30 absolute left-0 top-0 z-0"></div>
          <img
            className="w-full h-96 object-cover object-center"
            src="https://ckgamelab.com/wp-content/uploads/2025/02/청강카페대문_겨울-1.png"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative bg-background">
          <div className="max-w-[1200px] mx-auto pl-15">
            <div className="absolute z-50 bottom-20">
              <h2 className="text-5xl font-black">
                게임콘텐츠스쿨 학생회 부원모집
              </h2>
              <div className="h-5"></div>
              <p>
                더 나은 학우들의 대학생활을 위해 달리는
                <br />
                학생회는 언제나 '당신'을 기다리고 있습니다.
              </p>
            </div>
          </div>
          <div className="w-full h-full bg-black opacity-30 absolute left-0 top-0 z-0"></div>
          <img
            className="w-full h-96 object-cover object-center"
            src="https://ckgamelab.com/wp-content/uploads/2025/02/가을테마-1.png"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative bg-background">
          <div className="max-w-[1200px] mx-auto pl-15">
            <div className="absolute z-50 bottom-20">
              <h2 className="text-5xl font-black">
                2025 1학기 게임콘텐츠스쿨 MT
              </h2>
              <div className="h-5"></div>
              <p>
                드디어 시작된 25년도 게임콘텐츠스쿨의 첫 여정
                <br />
                친구없어도 걱정은 NONO 너만오면 바로 GOGO
              </p>
            </div>
          </div>
          <div className="w-full h-full bg-black opacity-30 absolute left-0 top-0 z-0"></div>
          <img
            className="w-full h-96 object-cover object-center"
            src="https://ckgamelab.com/wp-content/uploads/2025/02/청강카페대문_봄-1.png"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
