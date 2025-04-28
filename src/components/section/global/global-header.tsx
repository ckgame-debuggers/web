"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import ThemeChanger from "@/components/ui/theme-changer";
import HeaderItems from "@/components/ui/header-item";
import { DebuggersAPI } from "@/components/util/api";
import Avatar from "@/components/ui/avatar";
import useUserStore from "@/store/user";

import logo from "$/brand/logo.png";
import GlobalMobileHeaderMenu from "./\bglobal-mobile-header-menu";
export default function GlobalHeader() {
  const { user, setUser, isLoggedIn } = useUserStore();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const header = useRef<HTMLDivElement>(null);
  const currentURL = useMemo<string>(() => {
    const location = window.location.href;
    if (location.endsWith("/login")) return "/";
    if (location.includes("/register")) return "/";
    return location;
  }, []);

  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await debuggersAPI.isLoggedIn();
      if (userData) setUser(userData);
    };
    fetchUser();
  }, [debuggersAPI]);

  useEffect(() => {}, []);

  return (
    <header>
      <div
        className="flex justify-between px-5 max-w-[1200px] mx-auto py-5 md:py-0 items-center z-50 bg-background w-full fixed md:relative"
        ref={header}
      >
        <Link
          href={"/"}
          className="flex font-semibold items-center gap-3 text-2xl px-4"
        >
          <Image width={65} src={logo} alt="global-logo" />
        </Link>
        <div className="items-center text-lg h-full hidden md:flex">
          <HeaderItems href={"/about"}>소개</HeaderItems>
          <HeaderItems href={"/debug"}>디버그</HeaderItems>
          <HeaderItems href={"/club"}>전공동아리</HeaderItems>
          <HeaderItems href={"/crew"}>소모임</HeaderItems>
          <HeaderItems href={"/under-develop"}>커뮤니티</HeaderItems>
        </div>
        <div className="items-center gap-1 hidden md:flex">
          {isLoggedIn ? (
            <>
              <Link href={"/settings"}>
                <Avatar
                  displayName={user.username}
                  size="lg"
                  img="/resources/default-profile.png"
                  className="mr-3 rounded-sm"
                />
              </Link>
              <ThemeChanger />
            </>
          ) : (
            <>
              <Link
                href={`/login?redirect=${currentURL}`}
                className={buttonVariants({}) + "block px-4"}
              >
                로그인
              </Link>
              <ThemeChanger />
            </>
          )}
        </div>
        <Button
          variants="ghost"
          className="h-fit cursor-pointer block md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      </div>
      <GlobalMobileHeaderMenu isOpen={isOpen} />
      <div
        className="md:hidden"
        style={{ height: header.current?.offsetHeight + "px" }}
      ></div>
    </header>
  );
}
