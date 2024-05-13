import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
        name="LoginPage"
        component={LoginPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoute;
