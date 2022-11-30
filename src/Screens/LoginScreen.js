import { Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { deepCopy, onlyNumber, _getCache } from "../Services/Helper/common";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice";
import NetInfo from '@react-native-community/netinfo';
export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const { user, loginType } = useSelector(
        (state) => state.auth
      );
    // state
    const [borderInput, setBorderInput] = useState({
        phonenumber: {
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
        phonenumber: {
            exactly: true,
            errorName: '',
        },
        password: {
            exactly: true,
            errorName: ''
        }
    })
    const [phonenumber, setPhonenumber] = useState();
    const [password, setPassword] = useState();

    // function
    const handleFocusInput = (key, type) => {
        let dataTmp = deepCopy(borderInput);
        dataTmp[key].focus = type;
        setBorderInput(dataTmp);
    }
    const handlesetPhonenumber = (e) => {
        let dataTmp = deepCopy(validate);
        setPhonenumber(e);
        if (!onlyNumber(e)) {
            dataTmp['phonenumber'] = {
                exactly: false,
                errorName: 'Số điện thoại không hợp lệ'
            }
        }
        else {
            dataTmp['phonenumber'] = {
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
    const handleLogin = () => {
        dispatch(login({phonenumber: phonenumber, password: password}));
    }
    useEffect(() => {
        if (loginType) navigation.navigate('home');
    }, [loginType]);
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
                borderBottomColor: borderInput?.phonenumber.focus
                    ? borderInput?.phonenumber.focusColor : borderInput?.phonenumber.defaultColor
            }}
            onFocus={() => handleFocusInput('phonenumber', true)}
            onBlur={() => handleFocusInput('phonenumber', false)}
            onChangeText={(e) => handlesetPhonenumber(e)}
            value={phonenumber}
            placeholder="Số điện thoại"
        />
        {
            validate?.phonenumber?.errorName
            ? 
            <Text style={{ color: 'red', width: '100%', fontSize: 12 }}>{validate?.phonenumber?.errorName}</Text>
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
        {
            loginType === false ? 
            <Text style={{ color: 'red', width: '100%', fontSize: 12, marginTop: 5, marginBottom: 5 }}>Thông tin đăng nhập không đúng</Text> : 
            <></>
        }
        <TouchableOpacity
            onPress={() => handleLogin()}
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
            onPress={() => navigation.navigate('signup')}
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