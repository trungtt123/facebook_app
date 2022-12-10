import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, TextInput } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import { changeFirstLogin, removeLoginInfoInRedux, changeLoginWithCache } from '../Redux/authSlice';
import authService from '../Services/Api/authService';
function SaveLoginInfoScreen({ navigation }) {
    const { firstLogin, loginWithCache, loginPhonenumber, loginPassword, user } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (loginWithCache) {
            navigation.navigate('dashboard');
        }
    }, [loginWithCache]);
    const handleSaveLoginInfo = async () => {
        await authService.saveLoginInfo({
            phonenumber: loginPhonenumber,
            password: loginPassword,
            avatar: user.avatar,
            username: user.username
        })
        dispatch(removeLoginInfoInRedux());
        dispatch(changeLoginWithCache(true));
    }
    return (
        <View style={styles.container}>
            <View>
                <Button title="OK"
                    color="#216fdb"
                    style={{ marginTop: 50, width: '100%' }}
                    onPress={() => handleSaveLoginInfo()}
                />
                <Button title="LÚC KHÁC"
                    color="#216fdb"
                    style={{ marginTop: 50, width: '100%' }}
                    onPress={() => dispatch(changeLoginWithCache(true))}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 30,
        backgroundColor: 'white'
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    logoFacebook: {
        width: 50,
        height: 50
    },
    btnSignup: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 100
    }
});

export default SaveLoginInfoScreen;
