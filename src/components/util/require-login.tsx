"use client";

import { useEffect } from "react";
import useUserStore from "@/store/user";
import { usePathname } from "next/navigation";

export default function RequireLogin() {
  const { isLoggedIn, isLoading } = useUserStore();
  const pathname = usePathname();

  useEffect(() => {
    console.log(isLoading, isLoggedIn);
    if (!isLoggedIn && !isLoading) {
      const search = window.location.search || "";
      const redirect = encodeURIComponent(pathname + search);
      window.location.href = `/login?redirect=${redirect}`;
    }
  }, [pathname, isLoading]);

  return null;
}
