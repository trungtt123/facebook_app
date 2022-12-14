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
import CreatePostScreen from './CreatePostScreen';
import ImageLibrary from './ImageLibrary';
import EmojiList from './EmojiList';
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
                    <>
                        <NavigationContainer>
                            <Stack.Navigator>
                                <Stack.Screen name="dashboard" component={DashBoardScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="message" component={MessageScreen} options={{ title: 'Tin nhắn' }} />
                                <Stack.Screen name="search" component={MessageScreen} options={{ title: 'Tìm kiếm' }} />
                                <Stack.Screen name="createPost" component={CreatePostScreen} options={{ title: 'Tạo bài viết' }}/>
                                <Stack.Screen name="image" component={ImageLibrary} options={{ title: 'Thư viện' }}/>
                                <Stack.Screen name="emoji" component={EmojiList} options={{ title: 'Cảm xúc' }}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    </>
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