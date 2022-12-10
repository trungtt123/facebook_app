import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Button, TextInput } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, Entypo, MaterialIcons, EvilIcons, AntDesign } from '@expo/vector-icons';
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import { changeFirstLogin, removeLoginInfoInRedux, changeLoginWithCache } from '../Redux/authSlice';
import authService from '../Services/Api/authService';
import * as Animatable from 'react-native-animatable';
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
            <Animatable.View animation="slideInUp" >
                <View style={{ flexDirection: 'column', paddingHorizontal: 5 }}>
                    <Image style={{ width: '100%' }} resizeMode="contain"
                        source={require('../../assets/images/android_device_1.png')} />
                </View>
                <View style={{ width: '100%', zIndex: 9999, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 150 }}>
                    <Image style={{ width: 40, height: 40 }} source={require('../../assets/images/logo_facebook.png')} />
                </View>
                <View
                    style={{ flexDirection: 'row', zIndex: 9999, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 220, paddingHorizontal: 30  }}>
                    <Image
                        style={{
                            width: 60, height: 60, borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#ccc"
                        }}
                        source={
                            (user?.avatar === null || user?.avatar === undefined) ? require('../../assets/images/default_avatar.jpg') : { uri: user?.avatar }
                        }
                    />
                    <Text style={{marginLeft: 10, fontWeight: 'bold' }}>{user?.username}</Text>
                </View>
            </Animatable.View>
            <View style={{
                flexDirection: 'row', bottom: 0, position: 'absolute',
                justifyContent: 'center', alignItems: 'center', width: '100%',
                borderTopColor: '#ccc',
                height: 50,
                borderTopWidth: 1,
                backgroundColor: 'white'
            }}>
                <TouchableOpacity style={{ flex: 1, borderRightColor: '#ccc', borderRightWidth: 1 }} onPress={() => dispatch(changeLoginWithCache(true))}>
                    <Text style={{
                        textAlign: 'center', fontSize: 15,
                        color: '#79797b', fontWeight: 'bold'
                    }}>LÚC KHÁC</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, borderLeftColor: '#ccc', borderLeftWidth: 1 }} onPress={() => handleSaveLoginInfo()}>
                    <Text style={{
                        textAlign: 'center', fontSize: 15,
                        color: '#216fdb', fontWeight: 'bold'
                    }}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
