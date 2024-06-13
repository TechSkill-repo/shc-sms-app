import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tbt from '../SafetyManager/Screens/SafetyManagerHome/TBT/Tbt'

const Stack = createNativeStackNavigator()
const StackNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='TBT' component={Tbt}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation