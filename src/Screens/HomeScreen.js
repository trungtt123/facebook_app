import { Text, View, Button, StyleSheet, Image, RefreshControl, TouchableOpacity, useCallback } from "react-native";
import { useState, useEffect, memo } from "react";
import { deepCopy, onlyNumber, _getCache, _setCache } from "../Services/Helper/common";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, SafeAreaView } from "react-native";
import { fetchListPost } from "../Redux/postSlice";
import { delay } from '../Services/Helper/common';
import PostInHome from "../Components/PostInHome";
//@trungtt123
function HomeScreen({ navigation }) {
    const defaultCount = 4;
    const defaultIndex = 0;
    const defaultLastId = 0;
    const dispatch = useDispatch();
    const { postList, isPostListLoading } = useSelector(
        (state) => state.post
    );
    const [postListTotal, setPostListTotal] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        if (!isPostListLoading){
            dispatch(fetchListPost({ lastId: defaultLastId, index: defaultIndex, count: defaultCount }));
            setPostListTotal([]);
        }
        await delay(2000);
        setRefreshing(false);
    };
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height;
    };
    useEffect(() => {
        dispatch(fetchListPost({ lastId: defaultLastId, index: defaultIndex, count: defaultCount }));
    }, []);
    useEffect(() => {
        let newPostList = postListTotal;
        newPostList = newPostList.concat(postList);
        setPostListTotal(newPostList);
    }, [postList]);
    return <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#0f80f7"]}
                />}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    // đã đến cuối trang -> gọi api lấy bài tiếp theo
                    // khi không load nữa
                    if (!isPostListLoading)
                        dispatch(fetchListPost({ lastId: postListTotal[postListTotal.length - 1]?.id, index: defaultIndex + 1, count: defaultCount }));
                }
            }}
            scrollEventThrottle={400} // kich hoat onScroll trong khung hinh co do dai 400
        >
            {postListTotal?.map((item, index) => {
                //if (index === 0) console.log(item);
                return <PostInHome key={index} postDetail={false} postData={item} />
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