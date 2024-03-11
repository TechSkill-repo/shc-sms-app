import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo} from '@expo/vector-icons';
import {FontAwesome } from '@expo/vector-icons';
import Home from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';
import Setting from '../screens/Setting';
import Menu from '../screens/Menu';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarLabel: "Home", tabBarIcon: () => (
                        <Entypo name="home" size={24} color="black" />
                    )
                }} />
            <Tab.Screen name='ProfileScreen' component={ProfileScreen}
                options={{
                    tabBarLabel: "User", tabBarIcon: () => (
                        <FontAwesome name="user" size={24} color="black" />
                    )
                }} />
            <Tab.Screen name='Setting' component={Setting}
                options={{
                    tabBarLabel: "Setting", tabBarIcon: () => (
                        <Ionicons name="setting" size={24} color="black" />
                    )
                }} />
            <Tab.Screen name='Menu' component={Menu}
                options={{
                    tabBarLabel: "Menu", tabBarIcon: () => (
                        <Ionicons name="menu-sharp" size={24} color="black" />
                    )
                }} />

        </Tab.Navigator>
    )
}

export default TabNavigation