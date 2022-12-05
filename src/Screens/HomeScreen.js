import { Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect, memo } from "react";
import { deepCopy, onlyNumber, _getCache, _setCache } from "../Services/Helper/common";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import { ScrollView, SafeAreaView } from "react-native";
import PostScreen from "./PostScreen";
import axios from '../setups/custom_axios';
function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const [listPost, setListPost] = useState();
    const getListPost = () => {
        axios.post('post/get_list_posts?last_id=0&index=0&count=20')
            .then((res) => {
                setListPost(res.data.posts);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getListPost();
    }, []);
    return <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} >
            {listPost?.map((item, index) => {
                if (index === 0) console.log(item);
                return <PostScreen key={index} postDetail={false} postData={item}/>
            })}
            {/* <Button
                onPress={() => setIndex(index + 1)}
                title="TAPPING"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                style={{ marginBottom: 5 }}
            /> */}


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