import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import { logout } from "../Redux/authSlice";
function MenuScreen() {
    const dispatch = useDispatch();
    const { userList, isLoading } = useSelector(
        (state) => state.user
    );
    useEffect(() => {
    }, []);
    return (
        <View style={{flex: 1}}>
            <Text>Setting</Text>
            <Button
                onPress={() => dispatch(logout())}
                title="Đăng xuất"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
}


export default memo(MenuScreen);
