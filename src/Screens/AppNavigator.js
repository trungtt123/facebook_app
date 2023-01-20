import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DashBoardScreen from './DashBoardScreen';
import AboutScreen from './VideoScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import SystemModal from '../Components/modal/SystemModal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { COMMON_MESSAGE } from '../Services/Helper/constant';
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
import ImageLibrary from './ImageLibrary';
import EmojiList from './EmojiList';
<<<<<<< HEAD
import EditProfileScreen from './EditProfile';
import SettingScreen from './SettingScreen';
import EditDescription from './EditDescription';
import AvatarPicker from './AvatarPicker';
import CoverImagePicker from './CoverImagePicker';
import EditPublicInfor from './EditPublicInfor';
import EditCity from './EditCity';
=======
import AllFriendScreen from './AllFriendScreen';
import SuggestFriendScreen from './SuggestFriendScreen';
import Messager from './messenger/screen';
>>>>>>> 91da6ac289e4db817a4dc087ffb29c70ce5625c6
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
    console.log('network connected is', netInfo.isConnected);
    if (netInfo.isConnected && isLoading) return <>
        <LoadingScreen />
        {/* {netInfo.isConnected && <SystemModal icon={'wifi'} body={COMMON_MESSAGE.INTERNET_CONNECTION_SUCCESS} />}
        {!netInfo.isConnected && <SystemModal icon={'wifi-off'} body={COMMON_MESSAGE.INTERNET_CONNECTION_FAILED} />} */}
    </>
    if ((token !== undefined && token !== null && token !== "" && !netInfo.isConnected) || isAuthenticated) return <>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="saveLoginInfo" component={SaveLoginInfoScreen} options={{ title: 'Lưu thông tin đăng nhập' }} />
                <Stack.Screen name="dashboard" component={DashBoardScreen} options={{ headerShown: false }} />
                <Stack.Screen name="message" component={Messager} options={{ title: 'Tin nhắn' }} />
                <Stack.Screen name="search" component={SearchScreen} />
                <Stack.Screen name="createPost" component={CreatePostScreen} options={{ title: 'Tạo bài viết' }} />
<<<<<<< HEAD
                <Stack.Screen name="image" component={ImageLibrary} options={{ title: 'Thư viện' }}/>
                <Stack.Screen name="emoji" component={EmojiList} options={{ title: 'Cảm xúc' }}/>
                <Stack.Screen name="editProfile" component={EditProfileScreen} options={{title: 'Chỉnh sửa trang cá nhân'}}/>
                <Stack.Screen name="setting" component={SettingScreen} options={{title: 'Cài đặt trang cá nhân'}}/>
                <Stack.Screen name="editDescription" component={EditDescription} options={{title: 'Chỉnh sửa tiểu sử'}}/>
                <Stack.Screen name="pickAvatar" component={AvatarPicker} options={{title: 'Thay đổi ảnh đại diện'}}/>
                <Stack.Screen name="pickCover" component={CoverImagePicker} options={{title: 'Thay đổi ảnh bìa'}}/>
                <Stack.Screen name="editPublicInfo" component={EditPublicInfor} options={{title: 'Thay đổi chi tiết'}}/>
                <Stack.Screen name="editCity" component={EditCity} options={{title: 'Thay đổi chi tiết tỉnh/thành phố'}}/>
=======
                <Stack.Screen name="image" component={ImageLibrary} options={{ title: 'Thư viện' }} />
                <Stack.Screen name="emoji" component={EmojiList} options={{ title: 'Cảm xúc' }} />
                <Stack.Screen name="allfriend" component={AllFriendScreen} />
                <Stack.Screen name="suggestfriend" component={SuggestFriendScreen} options={{ title: 'Gợi ý' }} />
>>>>>>> 91da6ac289e4db817a4dc087ffb29c70ce5625c6
            </Stack.Navigator>
        </NavigationContainer>
        {netInfo.isConnected && <SystemModal icon={'wifi'} body={COMMON_MESSAGE.INTERNET_CONNECTION_SUCCESS} />}
        {!netInfo.isConnected && <SystemModal icon={'wifi-off'} body={COMMON_MESSAGE.INTERNET_CONNECTION_FAILED} />}
    </>
    return <>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="signup" component={SignupScreen} options={{ title: 'Tạo tài khoản' }} />
            </Stack.Navigator>
        </NavigationContainer>
        {/* {netInfo.isConnected && <SystemModal icon={'wifi'} body={COMMON_MESSAGE.INTERNET_CONNECTION_SUCCESS} />}
        {!netInfo.isConnected && <SystemModal icon={'wifi-off'} body={COMMON_MESSAGE.INTERNET_CONNECTION_FAILED} />} */}
    </>
}