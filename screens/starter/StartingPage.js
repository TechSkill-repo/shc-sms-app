import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoLight from "../../assets/logo/logoLight.png";

const StartingPage = () => {
  const navigation = useNavigation();
  useEffect(() => {
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    try {
      const dataToken = await AsyncStorage.getItem("accessToken");
      console.log("accessToken", dataToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Image
        source={LogoLight}
        style={{
          width: "100%",
          height: "40%",
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          color: "#21005d",
        }}
      >
        Welcome to Safety CSMS
      </Text>
      <View
        style={{
          paddingHorizontal: 40,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            marginTop: 6,
            fontWeight: "300",
            fontSize: 15,
          }}
        >
          We extend a warm welcome to our Safety Management System.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("LoginPage");
        }}
        style={{
          position: "absolute",
          bottom: 30,
          width: "90%",
          backgroundColor: "#21005d",
          paddingVertical: 14,
          borderRadius: 6,
          elevation: 6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: "white",
          }}
        >
          Please Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StartingPage;
