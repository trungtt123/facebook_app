import { Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect, memo } from "react";
import { deepCopy, onlyNumber, _getCache, _setCache } from "../Services/Helper/common";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import { ScrollView, SafeAreaView } from "react-native";
function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0);
    console.log('re-render home');
    return <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} >
                
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#216fdb' }}>
                {`HomeScreen ${index}`}
            </Text>


            <Button
                onPress={() => setIndex(index + 1)}
                title="TAPPING"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                style={{ marginBottom: 5 }}
            />

            
        </ScrollView>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    scrollView: {
        marginHorizontal: 20,
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

export default memo(HomeScreen)