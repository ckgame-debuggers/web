"use client";

import { create } from "zustand";

const useCommunityStore = create<{
  description: string;
  level: number;
  nextLevelExp: number;
  currentExp: number;
  isLoading: boolean;
  setCommunityUserInfo: (newState: CommunityUserInfoType) => void;
  setLoggedOut: () => void;
}>((set) => ({
  description: "",
  level: 0,
  nextLevelExp: 0,
  currentExp: 0,
  isLoading: true,
  setCommunityUserInfo: (newState: CommunityUserInfoType) => {
    set(() => ({
      ...newState,
      isLoading: false,
    }));
  },
  setLoggedOut: () => {
    set(() => ({
      description: "",
      level: 0,
      currentExp: 0,
      nextLevelExp: 0,
    }));
  },
}));
export default useCommunityStore;
