import { Text, TextInput, View, Button, StyleSheet, Image, RefreshControl, TouchableOpacity, Alert, FlatList } from "react-native";
import { useState, useEffect, memo, useRef } from "react";
import { deepCopy, onlyNumber, _getCache, _setCache } from "../Services/Helper/common";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, SafeAreaView } from "react-native";
import { fetchListPost } from "../Redux/postSlice";
import postService from '../Services/Api/postService';
import { delay } from '../Services/Helper/common';
import PostInVideo from "../Components/PostInVideo";
import { useNetInfo } from '@react-native-community/netinfo';
import { COMMON_COLOR } from "../Services/Helper/constant";
import { resetData } from "../Redux/emojiSlice";
//@trungtt123
function VideoScreen({ route, onSwipeUp, onSwipeDown, navigation }) {
    const defaultCount = 4;
    const defaultIndex = 0;
    const defaultLastId = 0;
    const dispatch = useDispatch();
    const netInfo = useNetInfo();
    const layoutOffset = useRef(0);
    const endScroll = useRef(true);
    const { user } = useSelector(
        (state) => state.auth
    );
    const [postListTotal, setPostListTotal] = useState([]);
    const [postList, setPostList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        handleGetListVideos();
        await delay(2000);
        setRefreshing(false);
    };
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 50;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    const handleGetListVideos = () => {
        postService.getListVideos(0, 0, 0).then((result) => {
            setPostListTotal(result.data.post);
            // setPostList(result.data.post.slice(0, 4));
        }).catch(e => {
            console.log(e);
        })
    }
    const handleScroll = (nativeEvent) => {
        const currentVideo = Math.max(0, Math.floor(nativeEvent.contentOffset.y / nativeEvent.layoutMeasurement.height));
        console.log('video', currentVideo);
        //setPageIndex(Math.floor(currentVideo / 4));
    }
    useEffect(() => {
        handleGetListVideos();
    }, []);
    return <View style={styles.container}>
        <FlatList
            data={postListTotal}
            renderItem={(data) => {
                return <PostInVideo navigation={navigation} key={data.item.id} postData={data.item} />
            }}
        // refreshControl={
        //     <RefreshControl
        //         refreshing={refreshing}
        //         onRefresh={onRefresh}
        //         colors={["#0f80f7"]}
        //     />}
        // onScroll={({ nativeEvent }) => {
        //     handleScroll(nativeEvent);
        //     if (isCloseToBottom(nativeEvent)) {
        //         pageIndex.current++;
        //         setPostList(postListTotal.slice(pageIndex.current * 4 + (pageIndex.current + 1) * 4));
        //         console.log('end');
        //     }
        // }}
        // scrollEventThrottle={400} // kich hoat onScroll trong khung hinh co do dai 400
        />
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COMMON_COLOR.GRAY_COLOR_BACKGROUND
    },
    scrollView: {
        marginHorizontal: 20,
    }
});

export default memo(VideoScreen)