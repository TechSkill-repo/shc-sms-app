import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/userAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const { username, role, email } = useAuthStore(); // Ac
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

  const handleLogout = async ()=>{
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userData");
      navigation.navigate("login");
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
      <View>
      {userData ? (
          <>
            <Text>Welcome, {userData.username}!</Text>
            <Text>Your role is: {userData.role}</Text>
            <Text>Your email is: {userData.email}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      <TouchableOpacity
        style={{
          width: 100,
          height:50,
          backgroundColor: "#034694",
          paddingVertical: 14,
          borderRadius: 5,
          position:"absolute",
          bottom:20,
          alignSelf:"center"

        }}
        onPress={()=>{
          handleLogout();
        }}>
        <Text style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "600",
          color: "white",
        }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
