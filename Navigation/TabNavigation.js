import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import Menu from "../screens/Menu";
import TBM from "../routes/TbmRoutes.js/TBM";
import Violation from "../SafetyManager/Screens/Violation/Violation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
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
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TBM"
        component={TBM}
        options={{
          headerShown: false,
          tabBarLabel: "TBM",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="toolbox" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Violation"
        component={Violation}
        options={{
          headerShown: false,
          tabBarLabel: "violation",
          tabBarIcon: ({ color }) => (
            <Feather name="alert-triangle" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Fsgr"
        component={Setting}
        options={{
          headerShown: false,
          tabBarLabel: "FSGR",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="fire" size={26} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: false,
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (
            <Ionicons name="menu-sharp" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
