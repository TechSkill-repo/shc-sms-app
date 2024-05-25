import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "../../Navigation/TabNavigation";
import useAuthStore from "../../store/userAuthStore";
import TabNav from "../../SafetyManager/TabNavigation/TabNav";

const Stack = createNativeStackNavigator();

const AppRouter = () => {
  const role = useAuthStore((state) => state.role);
  console.log(role,'--------------------RRRROOOOLLLLLEEEE--------------')
  return (
    <Stack.Navigator>
     {
      role === "si" ? <>
       <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      </> : 
      <>
       <Stack.Screen
        name="TabNavigation"
        component={TabNav}
        options={{ headerShown: false }}
      />
      </>
     }
    </Stack.Navigator>
  );
};

export default AppRouter;
