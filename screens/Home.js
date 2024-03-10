import { View, Text } from "react-native";
import React from "react";
import useAuthStore from "../store/userAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { username, role, email } = useAuthStore(); // Ac
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View>
        <Text>Welcome, {username}!</Text>
        <Text>Your role is: {role}</Text>
        <Text>Your email is: {email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
