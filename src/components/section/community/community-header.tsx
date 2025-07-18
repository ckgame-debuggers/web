"use client";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/ui/search-bar";
import ThemeChanger from "@/components/ui/theme-changer";
import { buttonVariants } from "@/components/ui/button";
import { DebuggersAPI } from "@/components/util/api";
import { useEffect, useMemo } from "react";
import useUserStore from "@/store/user";

import logo from "$/brand/logo.png";
import Avatar from "@/components/ui/avatar";
import { josa } from "es-hangul";

export default function CommunityHeader() {
  const { user, setUser, isLoggedIn } = useUserStore();

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
      className="border-b border-b-border py-3 px-3"
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
        <div className="flex-1 max-w-[800px]">
          <SearchBar />
        </div>
        <div className="flex items-center gap-1">
          {isLoggedIn ? (
            <Link href={"/settings"} className="flex items-center">
              <Avatar
                displayName={user.username}
                size="lg"
                img="/resources/default-profile.png"
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
