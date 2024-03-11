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
        setUser: (userData) => set((state) => ({ ...state, ...userData })),
      }),
      {
        name: "newUser",
        getStorage: () => AsyncStorage,
      }
    )
  )
);

export default useAuthStore;
