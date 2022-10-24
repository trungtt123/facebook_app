import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import LoginScreen from './LoginScreen';
import SystemModal from '../Components/modal/SystemModal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { INTERNET_CONNECTION_FAILED, INTERNET_CONNECTION_SUCCESS } from '../Services/Helper/constant';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';
export default function AppNavigator() {
    const netInfo = useNetInfo();  
    return <>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="about" component={AboutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        {netInfo.isConnected && <SystemModal icon={'wifi'} body={INTERNET_CONNECTION_SUCCESS} />}
        {!netInfo.isConnected && <SystemModal icon={'wifi-off'} body={INTERNET_CONNECTION_FAILED} />}
    </>
}