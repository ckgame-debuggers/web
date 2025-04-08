"use client";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/ui/search-bar";
import ThemeChanger from "@/components/ui/theme-changer";
import { buttonVariants } from "@/components/ui/button";

import logo from "$/brand/logo.png";

export default function CommunityHeader() {
  return (
    <header className="border-b border-b-border py-3 px-3 ">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center gap-5">
        <div className="flex gap-2 items-center">
          <Link
            href={"/community"}
            className="flex items-center text-2xl font-bold uppercase"
          >
            <Image src={logo} alt="community-logo" width={60} />
          </Link>
        </div>
        <div className="flex-1 max-w-[800px]">
          <SearchBar />
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
