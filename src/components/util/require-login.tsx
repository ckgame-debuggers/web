"use client";

import { useEffect } from "react";
import useUserStore from "@/store/user";

export default function RequireLogin() {
  const { isLoggedIn } = useUserStore();
  useEffect(() => {
    if (!isLoggedIn) window.location.href = "/login";
  }, [isLoggedIn]);
  return <></>;
}
