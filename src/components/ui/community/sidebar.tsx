"use client";
import useUserStore from "@/store/user";
import { Button, buttonVariants } from "../button";
import Link from "next/link";
import { useMemo, useState } from "react";
import useCommunityStore from "@/store/community";

export default function CommunitySidebar() {
  const { user, isLoggedIn, profile } = useUserStore();
  const { level, nextLevelExp, currentExp } = useCommunityStore();
  const [expPercent, setExpPercent] = useState(80);
  const currentURL = useMemo<string>(() => {
    const location = window.location.href;
    if (location.endsWith("/login")) return "/";
    if (location.includes("/register")) return "/";
    return location;
  }, []);
  return (
    <div className="w-64 sticky top-10">
      {isLoggedIn ? (
        <div className="bg-background shadow-2xl dark:shadow-white/2 border border-border rounded-md p-3">
          <div className="flex">
            <div className="w-14 h-14 flex items-center justify-center text-2xl bg-primary text-primary-foreground overflow-hidden rounded-full">
              {profile ? (
                <img src={profile} alt="profile" className="w-full h-full" />
              ) : (
                user.username.slice(0, 2)
              )}
            </div>
            <div className="flex-1 text-sm font-bold text-secondary-foreground/75 dark:text-foreground px-3 py-2">
              <p>
                {user.username.length > 8
                  ? user.username.slice(0, 8) + "..."
                  : user.username}
              </p>
              <div>
                <p className="text-xs text-primary">
                  레벨 {level} | 500 포인트
                  {currentExp}
                  {nextLevelExp}
                </p>
                <div className="bg-accent h-1 w-full my-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-[width] duration-300 ease-in-out"
                    style={{ width: `${(currentExp / nextLevelExp) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <div className="flex gap-1">
              <Link
                href={`/community/user/${user.id}`}
                className={
                  buttonVariants({ variants: "outline", size: "sm" }) +
                  " block text-center w-full rounded-lg shadow-2x dark:shadow-white/10"
                }
                style={{ fontWeight: "bold" }}
              >
                내 정보
              </Link>
              <Link
                href={`/community/user/${user.id}/post`}
                className={
                  buttonVariants({ size: "sm" }) +
                  " block text-center w-full rounded-lg shadow-2x dark:shadow-white/10"
                }
                style={{ fontWeight: "bold" }}
              >
                내가 쓴 글
              </Link>
            </div>
            <Link
              href={`/logout`}
              className={
                buttonVariants({ variants: "outline", size: "sm" }) +
                " block text-center w-full rounded-lg shadow-2x dark:shadow-white/10"
              }
              style={{ fontWeight: "bold" }}
            >
              로그아웃
            </Link>
          </div>
        </div>
      ) : (
        <Link
          href={`/login?redirect=${currentURL}`}
          className={
            buttonVariants({}) +
            " block text-center w-full rounded-lg shadow-2x dark:shadow-white/10"
          }
          style={{ fontWeight: "bold" }}
        >
          디버거즈에 로그인
        </Link>
      )}
      <div className="grid grid-cols-2 gap-[2px] mt-3 border border-border rounded-md dark:shadow-white/2 shadow-2xl overflow-hidden">
        <SidebarItem href="/community/shop" title="상점" />
        <SidebarItem href="/community/quest" title="퀘스트" />
      </div>
    </div>
  );
}

function SidebarItem({ href, title }: { href: string; title: string }) {
  return (
    <Link
      className="bg-background w-full px-4 py-3 text-sm text-secondary-foreground/75 text-center font-bold dark:text-foreground"
      href={href}
    >
      {title}
    </Link>
  );
}
