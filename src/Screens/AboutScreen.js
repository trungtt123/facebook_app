import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
function AboutScreen() {
    const { userList, isLoading } = useSelector(
        (state) => state.user
    );
    useEffect(() => {
    }, []);
    console.log(userList);
    return (
        <View>
            <Text>{userList[0]?.id}</Text>
        </View>
    );
}


export default AboutScreen;
