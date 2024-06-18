import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import ManagerHome from "../SafetyManager/Screens/SafetyManagerHome/ManagerHome";
import FsgrReports from "../SafetyManager/Screens/FSGRReports/FsgrReports";
import Violation from "../SafetyManager/Screens/Violation/Violation";
import More from "../SafetyManager/Screens/More/More";
import User from "./Users/User";

const TabNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "rgb(120, 69, 172)", // Active tab icon color
        tabBarInactiveTintColor: "rgb(208, 193, 218)", // Inactive tab icon color
        tabBarShowLabel: false, // Hide tab labels
        tabBarStyle: { height: 60 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ManagerHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Fsgr Reports"
        component={FsgrReports}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="fire" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Violation"
        component={Violation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="report" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={More}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Foundation name="indent-more" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="adduser" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
