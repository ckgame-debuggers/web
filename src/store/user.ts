"use client";

import { create } from "zustand";

const useUserStore = create<{
  user: JWTPayLoad;
  isLoggedIn: boolean;
  isLoading: boolean;
  profile: string;
  setUser: (newState: JWTPayLoad) => void;
  setLoggedOut: () => void;
}>((set) => ({
  user: { id: 0, username: "", email: "", schoolNumber: "", color: "" },
  isLoggedIn: false,
  isLoading: true,
  profile: "",
  setUser: (newState: JWTPayLoad) => {
    set(() => ({
      user: newState,
      isLoggedIn: true,
      isLoading: false,
      profile: newState.profile ?? `/resources/profile/${newState.color}.png`,
    }));
  },
  setLoggedOut: () => {
    set(() => ({
      user: { id: 0, username: "", email: "", schoolNumber: "", color: "" },
      isLoggedIn: false,
    }));
  },
}));
export default useUserStore;
