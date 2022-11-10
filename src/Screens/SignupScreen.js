import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { useState } from "react";
import { deepCopy, onlyNumber } from "../Services/Helper/common";
import { API_URL } from '@env';
import NetInfo from '@react-native-community/netinfo';
import DatePicker from "../Components/DatePicker";
export default function SignupScreen({ navigation }) {

    // state
    const step = ['Tạo tài khoản', 'Tên', 'Ngày sinh', 'Số di động', 'Mật khẩu'];
    const [stepIndex, setStepIndex] = useState(0);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [date, setDate] = useState(new Date())
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
        {
            stepIndex === 0
                ? <>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        Tham gia Facebook
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                        Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng.
                    </Text>
                </>
                : stepIndex === 1 ?
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TextInput style={{ width: '50%', marginRight: 10 }} label="Họ" variant="standard" color="#216fdb" />
                        <TextInput style={{ width: '50%' }} label="Tên" variant="standard" color="#216fdb" />
                    </View>
                    : stepIndex === 2 ?
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Sinh nhật của bạn khi nào?
                            </Text>
                            <DatePicker />
                        </View>
                        : <></>

        }
        <Button title="Tiếp"
            uppercase={false}
            color="#216fdb"
            style={{ marginTop: 80, width: '100%' }}
            onPress={() => { setStepIndex(stepIndex + 1); navigation.setOptions({ title: step[stepIndex + 1] }); }}
        />
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