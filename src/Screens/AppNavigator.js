import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DashBoardScreen from './DashBoardScreen';
import AboutScreen from './VideoScreen';
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
import MessageScreen from './MessageScreen';
import SearchScreen from './SearchScreen';
import CreatePostScreen from './CreatePostScreen';
import authService from '../Services/Api/authService';
import SaveLoginInfoScreen from './SaveLoginInfo';
export default function AppNavigator() {
    const netInfo = useNetInfo();
    const dispatch = useDispatch();
    const [token, setToken] = useState();
    const { isLoading, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const getCacheToken = async () => {
        const token = await authService.getToken();
        setToken(token);
    }
    useEffect(() => {
        if (netInfo.isConnected) dispatch(verifyToken());
        getCacheToken();
    }, [netInfo.isConnected]);
    console.log('isLoading', isLoading, 'isAuthen', isAuthenticated);
    if (netInfo.isConnected && isLoading) return <>
        <LoadingScreen />
        {netInfo.isConnected && <SystemModal icon={'wifi'} body={INTERNET_CONNECTION_SUCCESS} />}
        {!netInfo.isConnected && <SystemModal icon={'wifi-off'} body={INTERNET_CONNECTION_FAILED} />}
    </>
    if ((token !== undefined && token !== null && token !== "" && !netInfo.isConnected) || isAuthenticated) return <>
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="saveLoginInfo" component={SaveLoginInfoScreen} options={{ title: 'Lưu thông tin đăng nhập' }} />
                <Stack.Screen name="dashboard" component={DashBoardScreen} options={{ headerShown: false }} />
                <Stack.Screen name="message" component={MessageScreen} options={{ title: 'Tin nhắn' }} />
                <Stack.Screen name="search" component={SearchScreen} />
                <Stack.Screen name="createPost" component={CreatePostScreen} options={{ title: 'Tạo bài viết' }} />
            </Stack.Navigator>
        </NavigationContainer>
        {netInfo.isConnected && <SystemModal icon={'wifi'} body={INTERNET_CONNECTION_SUCCESS} />}
        {!netInfo.isConnected && <SystemModal icon={'wifi-off'} body={INTERNET_CONNECTION_FAILED} />}
    </>
    return <>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="signup" component={SignupScreen} options={{ title: 'Tạo tài khoản' }} />
            </Stack.Navigator>
        </NavigationContainer>
        {netInfo.isConnected && <SystemModal icon={'wifi'} body={INTERNET_CONNECTION_SUCCESS} />}
        {!netInfo.isConnected && <SystemModal icon={'wifi-off'} body={INTERNET_CONNECTION_FAILED} />}
    </>
}