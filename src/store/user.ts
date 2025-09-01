"use client";

import { create } from "zustand";

const useUserStore = create<{
  user: AuthInfo;
  isLoggedIn: boolean;
  isLoading: boolean;
  profile: string;
  permission: number;
  setUser: (newState: AuthInfo) => void;
  setLoggedOut: () => void;
  setIsLoading: (value: boolean) => void;
}>((set) => ({
  user: {
    id: 0,
    username: "",
    email: "",
    schoolNumber: "",
    color: "",
    permission: 0,
  },
  isLoggedIn: false,
  isLoading: true,
  permission: 0,
  profile: "",
  setUser: (newState: AuthInfo) => {
    set(() => ({
      user: newState,
      isLoggedIn: true,
      isLoading: false,
      profile: newState.profile ?? `/resources/profile/${newState.color}.png`,
      permission: newState.permission,
    }));
  },
  setLoggedOut: () => {
    set(() => ({
      user: {
        id: 0,
        username: "",
        email: "",
        schoolNumber: "",
        color: "",
        permission: 0,
      },
      isLoggedIn: false,
    }));
  },
  setIsLoading: (value: boolean) => {
    set(() => ({
      isLoading: false,
    }));
  },
}));
export default useUserStore;
