import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "../../Navigation/TabNavigation";
import useAuthStore from "../../store/userAuthStore";
import TabNav from "../../SafetyManager/TabNavigation/TabNav";
import Tbt from "../../SafetyManager/Screens/SafetyManagerHome/TBT/Tbt";
import PpeChecklist from "../../SafetyManager/Screens/SafetyManagerHome/PPE/PpeChecklist";
import DailyJobPlans from "../../SafetyManager/Screens/SafetyManagerHome/DJP/DailyJobPlans";
import ToolsAndTackles from "../../SafetyManager/Screens/SafetyManagerHome/TNT/ToolsAndTackles";
import TrainingTest from "../../SafetyManager/Screens/SafetyManagerHome/TrainingTest/TrainingTest";
import Training from "../../SafetyManager/Screens/SafetyManagerHome/Training/Training";
import TestResult from "../../SafetyManager/Screens/SafetyManagerHome/TestResult/TestResult";

const Stack = createNativeStackNavigator();

const AppRouter = () => {
  const role = useAuthStore((state) => state.role);
  console.log(role, "--------------------RRRROOOOLLLLLEEEE--------------");
  return (
    <Stack.Navigator>
      {role === "si" ? (
        <>
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="TabNavigation"
            component={TabNav}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Stack.Screen
        name="TBM"
        component={Tbt}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PPE"
        component={PpeChecklist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DJP"
        component={DailyJobPlans}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TNT"
        component={ToolsAndTackles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrainingTest"
        component={TrainingTest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Training"
        component={Training}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TestResult"
        component={TestResult}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppRouter;
