import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/userAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Home/Header";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const { username, role, email } = useAuthStore();
  const navigation = useNavigation();

  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Retrieved token:", token); // Log retrieved token
      return token;
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
      return null;
    }
  };

  getTokenFromStorage();

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Header />
      <StatusBar backgroundColor="#fffbfe" barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default Home;
