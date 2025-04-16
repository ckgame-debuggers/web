"use client";

import { create } from "zustand";

const useUserStore = create<{
  user: JWTPayLoad;
  isLoggedIn: boolean;
  setUser: (newState: JWTPayLoad) => void;
  setLoggedOut: () => void;
}>((set) => ({
  user: { id: 0, username: "", email: "", schoolNumber: "" },
  isLoggedIn: false,
  setUser: (newState: JWTPayLoad) => {
    set(() => ({ user: newState, isLoggedIn: true }));
  },
  setLoggedOut: () => {
    set(() => ({
      user: { id: 0, username: "", email: "", schoolNumber: "" },
      isLoggedIn: false,
    }));
  },
}));
export default useUserStore;
