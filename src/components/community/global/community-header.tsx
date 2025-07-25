"use client";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/ui/community/search-bar";
import ThemeChanger from "@/components/ui/theme-changer";
import { Button, buttonVariants } from "@/components/ui/button";
import { DebuggersAPI } from "@/components/util/api";
import { useEffect, useMemo, useState } from "react";
import useUserStore from "@/store/user";

import logo from "$/brand/logo.png";
import Avatar from "@/components/ui/avatar";
import { josa } from "es-hangul";

export default function CommunityHeader() {
  const { user, setUser, isLoggedIn, profile } = useUserStore();

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

  return (
    <header
      className="border-b border-b-border py-3 px-8"
      id="community-header"
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center gap-5">
        <div className="flex gap-2 items-center">
          <Link
            href={"/community"}
            className="flex items-center text-2xl font-bold uppercase"
          >
            <Image src={logo} alt="community-logo" width={60} />
          </Link>
        </div>
        <div className="flex-1 max-w-[800px] flex justify-between gap-1">
          <SearchBar />
          <div className="flex">
            <Link
              href="/community/hot"
              className={buttonVariants({ variants: "ghost" })}
              style={{ borderRadius: "100%" }}
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
                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isLoggedIn ? (
            <Link href={"/settings/community"} className="flex items-center">
              <Avatar
                displayName={user.username}
                size="lg"
                img={profile}
                className="mr-3 rounded-sm"
              />
            </Link>
          ) : (
            <Link
              href={`/login?redirect=${currentURL}`}
              className={buttonVariants({}) + "block px-4"}
            >
              로그인
            </Link>
          )}
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
}
