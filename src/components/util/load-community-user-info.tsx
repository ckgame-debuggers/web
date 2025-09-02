"use client";

import { useEffect, useMemo } from "react";
import useCommunityStore from "@/store/community";
import { DebuggersAPI } from "./api";
import useUserStore from "@/store/user";

export default function LoadCommunityInfo() {
  const { setUser, isLoggedIn, setIsLoading } = useUserStore();
  const { setCommunityUserInfo } = useCommunityStore();
  const debuggersAPI = useMemo(() => DebuggersAPI.getInstance(), []);

  useEffect(() => {
    const prepare = async () => {
      try {
        const userData = await debuggersAPI.isLoggedIn();
        if (userData) {
          setUser(userData);
        } else {
          setIsLoading(false);
          window.location.href = `/login?redirect=/community`;
          return;
        }
        console.log(userData);

        const { data } = await debuggersAPI.get("/community/me");
        const communityData = data?.data as CommunityUserInfoType;

        if (communityData.isBanned) {
          const banQuery = communityData.banExpiresAt
            ? `?for=${communityData.banExpiresAt}`
            : "";
          window.location.href = `/community/banned${banQuery}`;
          return;
        }

        setCommunityUserInfo(communityData);
      } catch (e) {
        setIsLoading(false);
        window.location.href = `/login?redirect=/community`;
      }
    };

    prepare();
  }, [debuggersAPI, isLoggedIn, setIsLoading, setUser, setCommunityUserInfo]);

  return null;
}
