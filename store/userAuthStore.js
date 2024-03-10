// Zustand store setup (store.js)
import { create } from "zustand";

const useAuthStore = create((set) => ({
  username: "",
  role: "",
  email: "",
  setUser: (userData) => set((state) => ({ ...state, ...userData })),
}));

export default useAuthStore;
