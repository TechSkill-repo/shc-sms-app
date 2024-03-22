import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        username: "",
        role: "",
        email: "",
        token: "",
        setUser: (userData) => set((state) => ({ ...state, ...userData })),
        removeToken: () => set({ token: "" }),
      }),
      {
        name: "newUser",
        getStorage: () => AsyncStorage,
      }
    )
  )
);

export default useAuthStore;
