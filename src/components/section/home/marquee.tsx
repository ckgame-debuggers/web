import { Marquee } from "@/components/ui/marquee";
import HomeMarqueeItem from "@/components/ui/marquee-item";
import Link from "next/link";

export default function HomeMarquee() {
  return (
    <div className="relative w-fit h-fit mx-auto flex justify-center flex-col items-center">
      <div className="z-10 absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
      <div className="z-10 absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      <Marquee
        pauseOnHover
        className="max-w-[1200px] z-0 mx-auto overflow-y-hidden [--duration:20s]"
      >
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/1-2-300x300.jpg"
          title="게임과 공식카페"
          href="https://cafe.naver.com/chungkanggame"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/a.png"
          title="총학생회"
          href="https://cafe.naver.com/chungkangsa"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/b.png"
          title="동아리 연합회"
          href="https://cafe.naver.com/chungkangdongari"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/c.png"
          title="리케이온"
          href="https://cafe.naver.com/ckhive"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/c.png"
          title="리케이온"
          href="https://cafe.naver.com/ckhive"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/c.png"
          title="리케이온"
          href="https://cafe.naver.com/ckhive"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/c.png"
          title="리케이온"
          href="https://cafe.naver.com/ckhive"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/c.png"
          title="리케이온"
          href="https://cafe.naver.com/ckhive"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/c.png"
          title="리케이온"
          href="https://cafe.naver.com/ckhive"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/c.png"
          title="리케이온"
          href="https://cafe.naver.com/ckhive"
        />
        <HomeMarqueeItem
          thumbnail="https://ckgamelab.com/wp-content/uploads/2025/02/c.png"
          title="리케이온"
          href="https://cafe.naver.com/ckhive"
        />
      </Marquee>
      <Link
        className="text-secondary-foreground text-center flex items-center gap-3 z-20"
        href={"/related"}
      >
        디버거즈 관련 사이트들{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
}
