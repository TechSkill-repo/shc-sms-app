// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRouter from "./routes/mainRouter/AppRouter";
import AuthRouter from "./routes/authRouter/AuthRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
// const navigation = useNavigation();

function App() {
  const [token, setToken] = React.useState("");
  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Retrieved token:", token); // Log retrieved token
      setToken(token);
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
      return null;
    }
  };

  getTokenFromStorage();
  return (
    <NavigationContainer>
      {token ? <AppRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
}

export default App;
