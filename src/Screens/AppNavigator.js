import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import SystemModal from '../Components/modal/SystemModal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { INTERNET_CONNECTION_FAILED, INTERNET_CONNECTION_SUCCESS } from '../Services/Helper/constant';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../Redux/authSlice";
import LoadingScreen from './LoadingScreen';
export default function AppNavigator() {
    const netInfo = useNetInfo();
    const dispatch = useDispatch();
    const { isLoading, isAuthenticated } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        dispatch(verifyToken());
    }, []);
    console.log('isLoading', isLoading, 'isAuthen', isAuthenticated);
    return <>
        {
            isLoading ? <LoadingScreen />
            : 
            isAuthenticated ?
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="about" component={AboutScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
                : 
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="signup" component={SignupScreen} options={{ title: 'Tạo tài khoản' }} />
                    </Stack.Navigator>
                </NavigationContainer>
        }

        {netInfo.isConnected && <SystemModal icon={'wifi'} body={INTERNET_CONNECTION_SUCCESS} />}
        {!netInfo.isConnected && <SystemModal icon={'wifi-off'} body={INTERNET_CONNECTION_FAILED} />}
    </>
}