import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TbmPage from "../../screens/TbM/TbmPage";
import DailyJobPlan from "../../screens/TbM/DailyJobPlan";
import PpeChecklist from "../../screens/TbM/PpeChecklist";
import TbtForm from "../../screens/TbM/TbtForm";
import ToolsTackles from "../../screens/TbM/ToolsTackles";
import Fsgr from "../../screens/TbM/FSGR/Fsgr";
import AccidentReports from "../../screens/AccidentReports/AccidentReports";

const Stack = createNativeStackNavigator();

const TBM = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToolBoxTalk"
        component={TbmPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TbtForm"
        component={TbtForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DailyJobPlan"
        component={DailyJobPlan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ppeChecklist"
        component={PpeChecklist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="toolsTackles"
        component={ToolsTackles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="fsgr"
        component={Fsgr}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="accidentReport"
        component={AccidentReports}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TBM;
