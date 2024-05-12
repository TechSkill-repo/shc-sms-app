import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import Menu from "../screens/Menu";
import TBM from "../routes/TbmRoutes.js/TBM";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "rgb(120, 69, 172)", // Active tab text color
        inactiveTintColor: "lightgray", // Inactive tab text color
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
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
            <MaterialCommunityIcons name="toolbox" size={24} color={color} />
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
            <FontAwesome name="fire" size={24} color={color} />
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
            <Ionicons name="menu-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
