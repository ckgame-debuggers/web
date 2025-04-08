import HomeBanner from "@/components/section/home/banner";
import HomeMarquee from "@/components/section/home/marquee";
import HomeNotice from "@/components/section/home/notice";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HomeNotice />
      <HomeBanner />
      <HomeMarquee />
    </main>
  );
}
