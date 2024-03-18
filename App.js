// In App.js in a new project

import * as React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartingPage from "./screens/starter/StartingPage";
import LoginPage from "./screens/auth/LoginPage";
import TabNavigation from "./Navigation/TabNavigation";

const Stack = createNativeStackNavigator();
// const navigation = useNavigation();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />

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
    </NavigationContainer>
  );
}

export default App;
