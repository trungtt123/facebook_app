import { Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { deepCopy, onlyNumber, _getCache, _setCache } from "../Services/Helper/common";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    return <View style={styles.container}>

        <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
            HomeScreen
        </Text>
        
        <Button 
            onPress={() => dispatch(logout())}
            title="Đăng xuất"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
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
    btnLogout: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#216fdb',
        marginTop: 5
    },
});