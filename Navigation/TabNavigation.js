import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Home from "../screens/Home";
import ProfileScreen from "../screens/ProfileScreen";
import Setting from "../screens/Setting";
import Menu from "../screens/Menu";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="TBM"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "TBM",
          tabBarIcon: () => (
            <FontAwesome name="screwdriver-wrench" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarLabel: "Setting",
          tabBarIcon: () => <FontAwesome name="gear" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: false,
          tabBarLabel: "Menu",
          tabBarIcon: () => (
            <Ionicons name="menu-sharp" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
