"use client";

import { create } from "zustand";

const useCommunityStore = create<{
  description: string;
  level: number;
  nextLevelExp: number;
  currentExp: number;
  isBanned: boolean;
  banExpiresAt?: string;
  point: number;
  isLoading: boolean;
  defaultBadge: {
    id: number;
    title: string;
    description: string;
    img: string;
    isDefault: boolean;
  };
  setCommunityUserInfo: (newState: CommunityUserInfoType) => void;
  setLoggedOut: () => void;
}>((set) => ({
  description: "",
  level: 0,
  nextLevelExp: 0,
  currentExp: 0,
  isLoading: true,
  isBanned: false,
  point: 0,
  banExpiresAt: "",
  defaultBadge: {
    id: 0,
    title: "",
    description: "",
    img: "",
    isDefault: false,
  },
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
