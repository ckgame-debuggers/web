"use client";
import logo from "$/brand/logo.png";
import Link from "next/link";
import Image from "next/image";
import ThemeChanger from "../ui/theme-changer";
import useUserStore from "@/store/user";
import { useEffect, useMemo } from "react";
import { DebuggersAPI } from "../util/api";

export default function AdminHeader() {
  const { setUser, setIsLoading } = useUserStore();

  const debuggersAPI = DebuggersAPI.getInstance();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = (await debuggersAPI.isLoggedIn()) as AuthInfo;
        if (userData.permission < 3) {
          window.location.href = "/";
          return;
        }
        if (userData) setUser(userData);
      } catch (e) {
        setIsLoading(false);
        window.location.href = "/";
      }
    };
    fetchUser();
  }, [debuggersAPI]);
  return (
    <header
      id="admin-header"
      className="px-3 py-5 flex items-center justify-between bg-primary text-white"
    >
      <Link href={"/admin/site/notice"}>
        <div className="flex items-center text-xl gap-2 px-3">
          <Image src={logo} alt="admin-logo" width={40} />
          <h1 className="uppercase font-black mt-[-3px]">
            {"< DEBUGGERS_ADMIN />"}
          </h1>
        </div>
      </Link>
      <div className="flex pr-4">
        <Link href={"/"} className="p-2 block rounded-full hover:bg-white/30">
          <svg
            className="size-6"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <Link
          href={"/community"}
          className="p-2 block rounded-full hover:bg-white/30"
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
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        </Link>
        <ThemeChanger theme="light" />
      </div>
    </header>
  );
}
