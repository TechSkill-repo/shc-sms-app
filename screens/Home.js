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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson) {
          const userData = JSON.parse(userDataJson);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userData");
      navigation.navigate("StartingPage");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <StatusBar backgroundColor="#ffaa001a" barStyle="dark-content" />
      <Header />
    </SafeAreaView>
  );
};

export default Home;
