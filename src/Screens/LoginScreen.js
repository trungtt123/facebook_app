import { Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { deepCopy, onlyNumber } from "../Services/Helper/common";
import {API_URL} from '@env';

import NetInfo from '@react-native-community/netinfo';
export default function LoginScreen({ navigation }) {

    // state
    const [borderInput, setBorderInput] = useState({
        phoneNumber: {
            focus: false,
            defaultColor: '#afb1b3',
            focusColor: '#216fdb'
        },
        password: {
            focus: false,
            defaultColor: '#afb1b3',
            focusColor: '#216fdb'
        }
    });
    const [validate, setValidate] = useState({
        phoneNumber: {
            exactly: true,
            errorName: '',
        },
        password: {
            exactly: true,
            errorName: ''
        }
    })
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();

    // function
    const handleFocusInput = (key, type) => {
        let dataTmp = deepCopy(borderInput);
        dataTmp[key].focus = type;
        setBorderInput(dataTmp);
    }
    const handleSetPhoneNumber = (e) => {
        let dataTmp = deepCopy(validate);
        setPhoneNumber(e);
        if (!onlyNumber(e)) {
            dataTmp['phoneNumber'] = {
                exactly: false,
                errorName: 'Số điện thoại không hợp lệ'
            }
        }
        else {
            dataTmp['phoneNumber'] = {
                exactly: true,
                errorName: ''
            }
        }
        setValidate(dataTmp);
    }
    const handleSetPassword = (e) => {
        let dataTmp = deepCopy(validate);
        setPassword(e);
        if (e == undefined || e.length < 6) {
            dataTmp['password'] = {
                exactly: false,
                errorName: 'Mật khẩu phải lớn hơn 6 ký tự'
            }
        }
        else {
            dataTmp['password'] = {
                exactly: true,
                errorName: ''
            }
        }
        setValidate(dataTmp);
    }
    return <View style={styles.container}>
        <Image
            style={styles.logoFacebook}
            source={require('../../assets/images/logo_facebook.png')}
        />
        <TextInput
            style={{
                height: 40,
                width: '100%',
                borderBottomWidth: 1,
                margin: 10,
                padding: 10,
                borderBottomColor: borderInput?.phoneNumber.focus
                    ? borderInput?.phoneNumber.focusColor : borderInput?.phoneNumber.defaultColor
            }}
            onFocus={() => handleFocusInput('phoneNumber', true)}
            onBlur={() => handleFocusInput('phoneNumber', false)}
            onChangeText={(e) => handleSetPhoneNumber(e)}
            value={phoneNumber}
            placeholder="Số điện thoại"
        />
        {
            validate?.phoneNumber?.errorName
            ? 
            <Text style={{ color: 'red', width: '100%', fontSize: 12 }}>{validate?.phoneNumber?.errorName}</Text>
            : <></>
        }
        <TextInput
            style={{
                height: 40,
                width: '100%',
                margin: 10,
                borderBottomWidth: 1,
                padding: 10,
                borderBottomColor: borderInput?.password.focus
                    ? borderInput?.password.focusColor : borderInput?.password.defaultColor
            }}
            onFocus={() => handleFocusInput('password', true)}
            onBlur={() => handleFocusInput('password', false)}
            secureTextEntry={true}
            onChangeText={(e) => handleSetPassword(e)}
            value={password}
            placeholder="Mật khẩu"
        />
        {
            validate?.password?.errorName
            ?
            <Text style={{ color: 'red', width: '100%', fontSize: 12 }}>{validate?.password?.errorName}</Text>
            : <></>
        }
        <TouchableOpacity
            onPress={() => navigation.navigate('about')}
            style={styles.btnLogin}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
            Quên mật khẩu?
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#8c8d90' }} />
            <View>
                <Text style={{ width: 50, textAlign: 'center', color: '#8c8d90' }}>HOẶC</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: '#8c8d90' }} />
        </View>
        <TouchableOpacity
            // onPress={buttonClickedHandler}
            style={styles.btnSignup}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Tạo tài khoản Facebook mới</Text>
        </TouchableOpacity>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
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
    btnLogin: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#216fdb',
        marginTop: 5
    },
    btnSignup: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 50,
        backgroundColor: '#31a24c',
    }
});