"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeChanger from "@/components/ui/theme-changer";
import HeaderItems from "@/components/ui/header-item";

import logo from "$/brand/logo.png";
import { buttonVariants } from "@/components/ui/button";

export default function GlobalHeader() {
  return (
    <header>
      <div className="flex justify-between px-5 max-w-[1200px] mx-auto">
        <Link
          href={"/"}
          className="flex font-semibold items-center gap-3 text-2xl px-4"
        >
          <Image width={65} src={logo} alt="global-logo" />
        </Link>
        <div className="flex items-center text-lg h-full">
          <HeaderItems href={"/about"}>소개</HeaderItems>
          <HeaderItems href={"/debug"}>디버그</HeaderItems>
          <HeaderItems href={"/club"}>전공동아리</HeaderItems>
          <HeaderItems href={"/crew"}>소모임</HeaderItems>
          <HeaderItems href={"/under-develop"}>커뮤니티</HeaderItems>
        </div>
        <div className="flex items-center gap-1">
          <Link href={"/login"} className={buttonVariants({}) + "block px-4"}>
            로그인
          </Link>
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
}
