import { View, Text, Button } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  FontAwesome5,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import FsgrReports from "../Screens/FSGRReports/FsgrReports";
import More from "../Screens/More/More";
import ManagerHome from "../Screens/SafetyManagerHome/ManagerHome";
import ViewTbt from "../Screens/ViewTbt/ViewTbt";

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
        component={ViewTbt}
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
    </Tab.Navigator>
  );
};

export default TabNav;
