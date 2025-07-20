"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useCommunityStore from "@/store/community";
import { DebuggersAPI } from "./api";
import useUserStore from "@/store/user";

export default function RequireLogin() {
  const { setCommunityUserInfo } = useCommunityStore();
  const { isLoading, isLoggedIn } = useUserStore();
  const debuggersAPI = DebuggersAPI.getInstance();

  useEffect(() => {
    const prepare = async () => {
      try {
        if (!isLoggedIn && isLoading) return;
        const data: CommunityUserInfoType = (
          await debuggersAPI.get("/community/me")
        ).data?.data as CommunityUserInfoType;
        setCommunityUserInfo(data);
      } catch (e) {}
    };
    prepare();
  }, [isLoading, isLoggedIn]);

  return null;
}
