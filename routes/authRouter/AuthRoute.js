import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TbmPage from "../../screens/TbM/TbmPage";
import LoginPage from "../../screens/auth/LoginPage";
import StartingPage from "../../screens/starter/StartingPage";

const Stack = createNativeStackNavigator();

const AuthRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartingPage"
        component={StartingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoute;
