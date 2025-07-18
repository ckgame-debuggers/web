"use client";
import useUserStore from "@/store/user";
import { Button } from "../button";
import Link from "next/link";

export default function CommunitySidebar() {
  const { user, setUser, isLoggedIn, isLoading } = useUserStore();
  return (
    <div className="w-56 my-3">
      {isLoggedIn ? (
        <div></div>
      ) : (
        <Button
          className="w-full rounded-lg shadow-2xl"
          style={{ fontWeight: "bold" }}
        >
          디버거즈에 로그인
        </Button>
      )}
      <div className="bg-card flex-col grid grid-cols-2 gap-[2px] mt-4 rounded-md shadow-2xl overflow-hidden">
        <SidebarItem href="/community/attendance" title="출석체크" />
        <SidebarItem href="/community/quest" title="퀘스트" />
      </div>
    </div>
  );
}

function SidebarItem({ href, title }: { href: string; title: string }) {
  return (
    <Link
      className="bg-background w-full px-4 py-3 text-sm text-secondary-foreground/75 text-center font-bold"
      href={href}
    >
      {title}
    </Link>
  );
}
