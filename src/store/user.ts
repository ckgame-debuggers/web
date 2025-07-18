"use client";

import { create } from "zustand";

const useUserStore = create<{
  user: JWTPayLoad;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (newState: JWTPayLoad) => void;
  setLoggedOut: () => void;
}>((set) => ({
  user: { id: 0, username: "", email: "", schoolNumber: "" },
  isLoggedIn: false,
  isLoading: true,
  setUser: (newState: JWTPayLoad) => {
    set(() => ({ user: newState, isLoggedIn: true, isLoading: false }));
  },
  setLoggedOut: () => {
    set(() => ({
      user: { id: 0, username: "", email: "", schoolNumber: "" },
      isLoggedIn: false,
    }));
  },
}));
export default useUserStore;
