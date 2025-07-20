"use client";

import Avatar from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import useUserStore from "@/store/user";
import { josa } from "es-hangul";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function GlobalMobileHeaderMenu({
  isOpen,
}: {
  isOpen: boolean;
}) {
  const { isLoggedIn, user, profile } = useUserStore();

  return (
    <div
      className="md:hidden h-0 overflow-hidden fixed z-40 bg-background w-full top-0 left-0 transition-all duration-500 ease-in-out"
      style={{
        height: isOpen ? "100%" : "0px",
        paddingBlock: isOpen ? "calc(var(--spacing) * 20)" : "",
      }}
    >
      <div className="flex flex-col gap-10">
        <div className="w-full px-15 text-center mt-10 flex flex-col">
          {isLoggedIn ? (
            <Link href={"/settings"} className="flex items-center">
              <Avatar
                displayName={user.username}
                size="lg"
                img={profile}
                className="mr-3 rounded-sm"
              />
              <p>{josa(user.username, "으로/로")} 로그인됨.</p>
            </Link>
          ) : (
            <Link href={"/login"} className={buttonVariants({})}>
              Login
            </Link>
          )}
        </div>
        <div className="mx-10 text-lg flex gap-4 flex-col">
          <MobileHeaderItem href={"/about"}>소개</MobileHeaderItem>
          <MobileHeaderItem href={"/debug"}>디버그</MobileHeaderItem>
          <MobileHeaderItem href={"/club"}>전공동아리</MobileHeaderItem>
          <MobileHeaderItem href={"/crew"}>소모임</MobileHeaderItem>
          <MobileHeaderItem href={"/community"}>커뮤니티</MobileHeaderItem>
          <MobileHeaderItem href={"http://wiki.ckdebuggers.com/"}>
            위키
          </MobileHeaderItem>
        </div>
        <div className="mx-15">
          <p>Copyright © 2025. Debuggers.</p>
        </div>
      </div>
    </div>
  );
}

function MobileHeaderItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [path, setPath] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    const handlePathChange = () => {
      setPath(window.location.pathname);
    };

    handlePathChange();
  }, [pathname]);

  return (
    <Link
      href={href}
      target={href.startsWith("/") ? "_self" : "_blank"}
      className="border-t-background hover:border-t-primary border-l-5 h-full hover:text-primary px-3"
      style={{
        borderLeftColor: path.startsWith(href)
          ? "var(--primary)"
          : "var(--background)",
      }}
    >
      {children}
    </Link>
  );
}
