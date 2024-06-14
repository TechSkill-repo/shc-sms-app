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
        selectedLocation: null,
        setUser: (userData) => set((state) => ({ ...state, ...userData })),
        setSelectedLocation: (location) => set({ selectedLocation: location }),
        removeToken: () => set({ token: "" }),
        removeRole:() => set({role:""}),
      }),
      {
        name: "newUser",
        getStorage: () => AsyncStorage,
      }
    )
  )
);

export default useAuthStore;
