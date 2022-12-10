import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { useState } from "react";
import { deepCopy, onlyNumber } from "../Services/Helper/common";
import { REST_API_URL } from "../Services/Helper/constant";
import NetInfo from '@react-native-community/netinfo';
import MyDatePicker from "../Components/MyDatePicker";
import { TabView, SceneMap } from 'react-native-tab-view';
import { getAge } from "../Services/Helper/common";
import { useEffect } from "react";
import { useRef } from "react";
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from "react-redux";
import authService from '../Services/Api/authService';
import { login, changeLoginWithCache } from "../Redux/authSlice";
export default function SignupScreen({ navigation }) {
    const dispatch = useDispatch();
    // state
    const step = ['Tạo tài khoản', 'Tên', 'Ngày sinh', 'Số di động', 
    'Mật khẩu', 'Điều khoản & quyền riêng tư', 'Xác nhận tài khoản', 'Tạo tài khoản thành công'];
    const [stepIndex, setStepIndex] = useState(0);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dataBirthDay, setDataBirthDay] = useState(new Date());
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [checkValidate, setCheckValidate] = useState(0);
    const [verifyCode, setVerifyCode] = useState();
    const [verifyCodeServer, setVerifyCodeServer] = useState();
    const { height } = Dimensions.get("window");
    const validate = useRef({
        firstName: {
            exactly: true,
            errorName: '',
        },
        lastName: {
            exactly: true,
            errorName: '',
        },
        phoneNumber: {
            exactly: true,
            errorName: '',
        },
        password: {
            exactly: true,
            errorName: ''
        },
        birthday: {
            exactly: true,
            errorName: ''
        },
        password: {
            exactly: true,
            errorName: ''
        },
        confirmPassword: {
            exactly: true,
            errorName: ''
        },
        verifyCode: {
            exactly: true,
            errorName: ''
        }
    });
    // function
    const handleSetFirstName = (e) => {
        let dataTmp = deepCopy(validate.current);
        if (e === undefined || e === "") {
            dataTmp['firstName'] = {
                exactly: false,
                errorName: 'Vui lòng nhập'
            }
        }
        else {
            dataTmp['firstName'] = {
                exactly: true,
                errorName: ''
            }
        }
        validate.current = dataTmp;
        setFirstName(e);
        setCheckValidate(checkValidate + 1);
    }
    const handleSetLastName = (e) => {
        let dataTmp = deepCopy(validate.current);
        setLastName(e);
        if (e === undefined || e === "") {
            dataTmp['lastName'] = {
                exactly: false,
                errorName: 'Vui lòng nhập'
            }
        }
        else {
            dataTmp['lastName'] = {
                exactly: true,
                errorName: ''
            }
        }
        validate.current = dataTmp;
        setCheckValidate(checkValidate + 1);
    }
    const handleSetPhoneNumber = (e) => {
        let dataTmp = deepCopy(validate.current);
        if (e === undefined || !onlyNumber(e)) {
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
        validate.current = dataTmp;
        setPhoneNumber(e);
        setCheckValidate(checkValidate + 1);
    }
    const handleSetPassword = (e) => {
        let dataTmp = deepCopy(validate.current);
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
        validate.current = dataTmp;
        setCheckValidate(checkValidate + 1);
    }
    const handleSetConfirmPassword = (e) => {
        let dataTmp = deepCopy(validate.current);
        setConfirmPassword(e);
        if (e !== password) {
            dataTmp['confirmPassword'] = {
                exactly: false,
                errorName: 'Mật khẩu không khớp'
            }
        }
        else {
            dataTmp['confirmPassword'] = {
                exactly: true,
                errorName: ''
            }
        }
        validate.current = dataTmp;
        setCheckValidate(checkValidate + 1);
    }
    const handleSetBirthDay = (date) => {
        let dataTmp = deepCopy(validate.current);
        if (date === undefined || date === "" || getAge(date) <= 4) {
            dataTmp['birthday'] = {
                exactly: false,
                errorName: 'Hình như bạn đã nhập sai thông tin. Hãy đảm bảo sử dụng đúng ngày sinh của mình.'
            }
        }
        else {
            dataTmp['birthday'] = {
                exactly: true,
                errorName: ''
            }
        }
        validate.current = dataTmp;
        setDataBirthDay(date);
        setCheckValidate(checkValidate + 1);
    }
    const handleNextStep = async () => {
        if (stepIndex === 0) {
            setStepIndex(1);
            navigation.setOptions({ title: step[1] })
        }
        if (stepIndex === 1) {
            handleSetLastName(lastName);
            if (validate.current.lastName.exactly) handleSetFirstName(firstName);
        }
        if (stepIndex === 2) handleSetBirthDay(dataBirthDay);
        if (stepIndex === 3) {
            handleSetPhoneNumber(phoneNumber);
        }
        if (stepIndex === 4) {
            handleSetPassword(password);
            if (validate.current.password.exactly) handleSetConfirmPassword(confirmPassword);
        }
        if (!validate.current.firstName.exactly || !validate.current.lastName.exactly
            || !validate.current.birthday.exactly || !validate.current.phoneNumber.exactly
            || !validate.current.password.exactly || !validate.current.confirmPassword.exactly) return;
        // console.log(index);
        setStepIndex(stepIndex + 1);
        navigation.setOptions({ title: step[stepIndex + 1] })
    }
    const handleSetVerifyCode = (e) => {
        if (e !== verifyCodeServer) {
            validate.current.verifyCode.exactly = false;
            validate.current.verifyCode.errorName = 'Mã code không đúng';
        }
        else {
            validate.current.verifyCode.exactly = true;
            validate.current.verifyCode.errorName = '';
        }
        setVerifyCode(e);
        setCheckValidate(validate + 1);
    }
    const handleVerifyCode = () => {
        
        authService.checkVerifyCode(phoneNumber, verifyCode).then(() => {
            validate.current.verifyCode.exactly = true;
            validate.current.verifyCode.errorName = '';
            handleNextStep();
        }).catch(e => {
            console.log(e);
            validate.current.verifyCode.exactly = false;
            validate.current.verifyCode.errorName = 'Mã code không đúng';
        });

    }
    const handleSignUp = () => {
        let date = dataBirthDay.getFullYear() + '-' + (dataBirthDay.getMonth() + 1) + '-' + dataBirthDay.getDate();
        authService.signup(phoneNumber, password, firstName + ' ' + lastName, date).then((result) => {
            console.log(result);
            setVerifyCodeServer(result.data.verifyCode);
            handleNextStep();
        }).catch(e => {
            console.log(e);
        });
    }
    const handleCheckPhoneNumber = () => {
        authService.checkExistPhoneNumber(phoneNumber).then((result) => {
            if (result.data.isExisted === "true") {
                validate.current.phoneNumber.exactly = false;
                validate.current.phoneNumber.errorName = 'Số điện thoại đã tồn tại';
                setCheckValidate(checkValidate + 1);
            }
            else {
                validate.current.phoneNumber.exactly = true;
                validate.current.phoneNumber.errorName = '';
                handleNextStep();
            }
        }).catch((e) => {
            console.log(e);
        })
    }
    return <View style={styles.container}>
        {
            stepIndex === 0
                ? <View style={styles.viewIndex}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        Tham gia Facebook
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                        Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng.
                    </Text>
                    <Button title="Tiếp"
                        uppercase={false}
                        color="#216fdb"
                        style={{ marginTop: 50, width: '100%' }}
                        onPress={() => handleNextStep()}
                    />
                </View>
                : stepIndex === 1 ?
                    <View style={styles.viewIndex}>
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                                Nhập họ tên của bạn
                            </Text>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <TextInput value={lastName} label="Họ"
                                        onChangeText={(e) => handleSetLastName(e)}
                                        style={{
                                            padding: 2,
                                            width: '100%', marginTop: 30
                                        }} variant="standard" color="#216fdb" />
                                    {validate.current && !validate.current.lastName.exactly &&
                                        <Text style={{ color: 'red', marginTop: 10 }}>
                                            {validate.current.lastName.errorName}
                                        </Text>}
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <TextInput value={firstName} label="Tên"
                                        onChangeText={(e) => handleSetFirstName(e)}
                                        style={{ width: '100%', padding: 2, marginTop: 30 }} variant="standard" color="#216fdb" />
                                    {validate.current && !validate.current.firstName.exactly &&
                                        <Text style={{ color: 'red', marginTop: 10 }}>
                                            {validate.current.firstName.errorName}
                                        </Text>}
                                </View>
                            </View>
                        </View>
                        <Button title="Tiếp"
                            uppercase={false}
                            color="#216fdb"
                            style={{ marginTop: 50, width: '100%' }}
                            onPress={() => handleNextStep()}
                        />
                    </View>
                    : stepIndex === 2 ?
                        <View style={styles.viewIndex}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                                Ngày sinh của bạn khi nào?
                            </Text>
                            {
                                !validate.current.birthday.exactly &&
                                <Text style={{ color: 'red', textAlign: 'center', marginVertical: 20 }}>
                                    {validate.current.birthday.errorName}
                                </Text>
                            }
                            <View style={{ paddingHorizontal: 30 }}>
                                <MyDatePicker onChange={(data) => handleSetBirthDay(data)} />
                            </View>
                            <Text style={{ textAlign: 'center', marginTop: 20 }}
                            >{`${getAge(dataBirthDay)} tuổi`}</Text>
                            <Button title="Tiếp"
                                uppercase={false}
                                color="#216fdb"
                                style={{ marginTop: 50, width: '100%' }}
                                onPress={() => handleNextStep()}
                            />
                        </View>
                        : stepIndex === 3 ?
                            <View style={styles.viewIndex}>
                                <View style={{ flexDirection: 'column', width: '100%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                                        Nhập số điện thoại của bạn
                                    </Text>
                                    <TextInput value={phoneNumber} label="Số điện thoại"
                                        onChangeText={(e) => handleSetPhoneNumber(e)}
                                        style={{ width: '100%', marginTop: 30 }} variant="outlined" color={validate.current.phoneNumber.exactly ? "#216fdb" : 'red'} />
                                    {!validate.current.phoneNumber.exactly &&
                                        <Text style={{ color: 'red', marginTop: 10 }}>
                                            {validate.current.phoneNumber.errorName}
                                        </Text>}
                                </View>
                                <Button title="Tiếp"
                                    uppercase={false}
                                    color="#216fdb"
                                    style={{ marginTop: 50, width: '100%' }}
                                    onPress={() => handleCheckPhoneNumber()}
                                />
                            </View>
                            : stepIndex === 4 ?
                                <View style={styles.viewIndex}>
                                    <View style={{ flexDirection: 'column', width: '100%' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                                            Nhập mật khẩu
                                        </Text>
                                        <TextInput value={password} label="Mật khẩu" secureTextEntry={true}
                                            onChangeText={(e) => handleSetPassword(e)}
                                            style={{ width: '100%', marginTop: 30 }} variant="outlined" color="#216fdb" />
                                        {!validate.current.password.exactly &&
                                            <Text style={{ color: 'red', marginTop: 10 }}>
                                                {validate.current.password.errorName}
                                            </Text>}
                                        <TextInput value={confirmPassword} label="Xác nhận mật khẩu" secureTextEntry={true}
                                            onChangeText={(e) => handleSetConfirmPassword(e)}
                                            style={{ width: '100%', marginTop: 10 }} variant="outlined" color="#216fdb" />
                                        {!validate.current.confirmPassword.exactly &&
                                            <Text style={{ color: 'red', marginTop: 10 }}>
                                                {validate.current.confirmPassword.errorName}
                                            </Text>}
                                    </View>
                                    <Button title="Tiếp"
                                        uppercase={false}
                                        color="#216fdb"
                                        style={{ marginTop: 50, width: '100%' }}
                                        onPress={() => handleNextStep()}
                                    />
                                </View>
                                : stepIndex === 5 ?
                                    <View style={{ flex: 1 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 30 }}>
                                            <Button title="Đăng ký"
                                                uppercase={false}
                                                color="#216fdb"
                                                style={{ width: '100%', position: 'absolute', top: height / 2, zIndex: 9999 }}
                                                onPress={() => handleSignUp()}
                                            />
                                        </View>
                                        <WebView
                                            source={{ uri: `${REST_API_URL}/finishedsignup` }} />

                                    </View>
                                    : stepIndex === 6 ?
                                        <View style={styles.viewIndex}>
                                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                                                    Nhập mã code {verifyCodeServer} để xác nhận tài khoản
                                                </Text>
                                                <TextInput value={verifyCode} label="Mã code"
                                                    onChangeText={(e) => handleSetVerifyCode(e)}
                                                    style={{ width: '100%', marginTop: 30, paddingHorizontal: 50 }} variant="outlined" color={validate.current.phoneNumber.exactly ? "#216fdb" : 'red'} />
                                                {!validate.current.verifyCode.exactly &&
                                                    <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>
                                                        {validate.current.verifyCode.errorName}
                                                    </Text>}
                                            </View>
                                            <Button title="Xác nhận"
                                                uppercase={false}
                                                color="#216fdb"
                                                style={{ marginTop: 50, width: '100%' }}
                                                onPress={() => handleVerifyCode()}
                                            />
                                        </View>
                                        : stepIndex === 7 ? 
                                        <View>
                                            <Text>Tạo tài khoản thành công</Text>
                                            <Button title="Nhấn để tiếp tục"
                                                uppercase={false}
                                                color="#216fdb"
                                                style={{ marginTop: 50, width: '100%' }}
                                                onPress={() => {
                                                    dispatch(login({phonenumber: phoneNumber, password: password}));
                                                    dispatch(changeLoginWithCache(false))
                                                }
                                            }
                                            />
                                        </View>
                                        :<></>

        }

    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewIndex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
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