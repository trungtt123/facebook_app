import { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from 'react-native';
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/userSlice";

function HomeScreen({ navigation }) {
    const { userList, isLoading } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);
    console.log(userList);
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    );
}




export default HomeScreen;
