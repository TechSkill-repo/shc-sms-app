// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRouter from "./routes/mainRouter/AppRouter";
import AuthRouter from "./routes/authRouter/AuthRoute";

import useAuthStore from "./store/userAuthStore";


const Stack = createNativeStackNavigator();
// const navigation = useNavigation();

function App() {
  const { token } = useAuthStore();



  return (
    <NavigationContainer>
      {token ? <AppRouter /> : <AuthRouter />}
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
// export default CodePush(CODE_PUSH_OPTION)(App);
