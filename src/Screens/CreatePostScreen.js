import React, { useEffect, useState, memo, Component, useRef } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    Keyboard,
    StatusBar,
    ScrollView,
    Modal,
    Button,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';
import axios from '../setups/custom_axios';
import { createPost, editPost } from '../Redux/postSlice';
import { getTextWithIcon } from '../Services/Helper/common';
import { setNewData, setOriginalData, addImageDel, setVideoDel, setAsset } from '../Redux/emojiSlice';

export default function CreatePostScreen({ route, navigation }) {
    const prevPage = useRef(route.params?.prevPage);
    const dispatch = useDispatch();
    const { user } = useSelector(
        (state) => state.auth
    );
    const newData = useSelector((state) => state.emoji.newData);
    const aggregateData = useSelector((state) => state.emoji.aggregateData);
    const originalData = useSelector((state) => state.emoji.originalData);
    const image_del = useSelector((state) => state.emoji.image_del);
    const post = useSelector((state) => state.emoji);
    const [text, setText] = useState(post.described);

    const getType = (filename) => {
        return filename.split('.').pop();
    }
    useEffect(() => {
        prevPage.current = route.params?.prevPage;
    }, [route])
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Tạo bài viết</Text>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => { postData(); navigation.goBack() }}
                    style={{ backgroundColor: '#365899', borderRadius: 10, width: 50, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Đăng</Text>
                </TouchableOpacity>)
        });
    }, [navigation, text, post.textEmoji, post.checkEmoji, post.iconEmoji, post.assets, newData, post.checkImage, post.checkVideo, aggregateData]);
    const postData = () => {

        let formData = new FormData();
        let status = post.textEmoji;
        let described = getTextWithIcon(text);

        if (newData.length > 0 && post.checkImage) {
            for (let i = 0; i < newData.length; i++) {
                formData.append("image", { name: newData[i].filename, uri: newData[i].uri, type: newData[i].type })
            }
            //formData.append("image", assets);
        } else if (newData.length > 0 && post.checkVideo) {
            formData.append("video", { name: newData[0].filename, uri: newData[0].uri, type: newData[0].type })
        }
        if (!post.checkEdit) {
            // check xem người dùng đã nhập các thông tin tối thiểu hay chưa
            dispatch(createPost({ described, status, formData, isMedia: (post.checkImage || post.checkVideo), videoWidth: post.videoWidth, videoHeight: post.videoHeight }));
        } else {
            //console.log({ id: post.postID, described, status, formData, isMedia: (newData.length==0), videoWidth: post.videoWidth, videoHeight: post.videoHeight, image_del: JSON.stringify(image_del), video_del: post.video_del});
            dispatch(editPost({ id: post.postID, described, status, formData, isMedia: !(newData.length==0), videoWidth: post.videoWidth, videoHeight: post.videoHeight, image_del: JSON.stringify(image_del), video_del: post.video_del}))
        }
    }
    const CustomImage = ({ style, item }) => {
        return (
            <View style={style}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <TouchableOpacity style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                }} onPress={() => {
                    //console.log(post.checkEdit);
                    let itemData = newData.find(x => x.uri === item.uri);
                    if (typeof (itemData) === "undefined") {
                        let data = originalData.filter(x => x.url != item.uri);
                        let delData = originalData.find(x => x.url === item.uri);
                        dispatch(addImageDel(delData.id));
                        dispatch(setOriginalData(data));
                    } else {
                        let data = newData.filter(x => x.uri != item.uri);
                        let assets = post.assets.filter(x=> x.uri != item.uri);
                        dispatch(setNewData(data));
                        dispatch(setAsset(assets));
                    }

                }}>
                    <AntDesign name="close" size={20} color="gray" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: 'white', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                <Image source={user?.avatar === null ? require('../../assets/images/default_avatar.jpg') : { uri: user?.avatar }} style={styles.img} />
                <View style={{ paddingLeft: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontWeight: '600' }}>{user?.username}</Text>
                        {(post.checkEmoji) ? (
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: post.iconEmoji }} style={styles.emoji} />
                                <Text>{' đang cảm thấy '}</Text>
                                <Text style={{ fontWeight: 'bold' }}>{post.textEmoji}</Text>
                            </View>) : null
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            padding: 2, paddingLeft: 4, paddingRight: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                            marginTop: 4, borderColor: '#D3D6DB', borderWidth: 1, borderRadius: 5
                        }}>
                            <Icon name="md-globe" color={'gray'} />
                            <Text style={{ color: 'gray', marginLeft: 4, marginRight: 4 }}>Công khai</Text>
                            <Icon name='caret-down' color={'gray'} size={16} />
                        </View>
                    </View>
                </View>
            </View>


            <TextInput autoFocus={true} multiline style={{ height: 60, fontSize: 16, padding: 16, paddingTop: 0 }} selectionColor={'gray'} placeholderTextColor={'gray'} placeholder={"Bạn đang nghĩ gì?"} defaultValue={text} onChangeText={newText => setText(getTextWithIcon(newText))} />


            <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: 'white', height: 400, flexDirection: 'row', }}>
                {(post.checkImage && aggregateData.length == 1) ? (
                    <CustomImage style={{
                        flex: 1, borderWidth: 1,
                        borderColor: "white",
                    }} item={aggregateData[0]} />
                ) : null}
                {(post.checkImage && aggregateData.length == 2) ? (
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CustomImage style={{
                            flex: 1, width: '50%', height: '100%', borderWidth: 1, borderColor: "white",
                        }} item={aggregateData[0]} />
                        <CustomImage style={{
                            flex: 1, width: '50%', height: '100%', borderWidth: 1, borderColor: "white",
                        }} item={aggregateData[1]} />
                    </View>
                ) : null}
                {(post.checkImage && aggregateData.length == 3) ? (
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CustomImage style={styles.firstImage} item={aggregateData[0]} />

                        <View style={{ flex: 1, width: '50%', flexDirection: 'column' }}>
                            <CustomImage style={styles.secondImage} item={aggregateData[1]} />
                            <CustomImage style={styles.secondImage} item={aggregateData[2]} />
                        </View>
                    </View>

                ) : null}
                {(post.checkImage && aggregateData.length == 4) ? (
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CustomImage style={styles.firstImage} item={aggregateData[0]} />
                        <View style={{ width: '50%' }}>
                            <CustomImage style={styles.thirdImage} item={aggregateData[1]} />
                            <CustomImage style={styles.thirdImage} item={aggregateData[2]} />
                            <CustomImage style={styles.thirdImage} item={aggregateData[3]} />
                        </View>
                    </View>
                ) : null}
                {(post.checkVideo) ? (
                    <View style={{ flex: 1 }}>
                        <Video source={{ uri: aggregateData[0].uri }} style={{ flex: 1, alignSelf: 'stretch' }}
                            useNativeControls={true}
                            resizeMode='contain'>
                        </Video>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            right: 5,
                            top: 5,
                        }} onPress={() => {
                            let itemData = newData.find(x => x.uri === aggregateData[0].uri);
                            if (typeof (itemData) === "undefined") {
                                dispatch(setVideoDel());
                                dispatch(setOriginalData([]));
                            } else {
                                dispatch(setNewData([]));
                                dispatch(setAsset([]));
                            }
                        }}>
                            <AntDesign name="close" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
            <View>
                <TouchableOpacity onPress={() => { navigation.navigate("image") }}>
                    <View style={{
                        flexDirection: 'row', height: 56, alignItems: 'center', paddingLeft: 16,
                        borderTopColor: '#72757A', borderTopWidth: StyleSheet.hairlineWidth
                    }}>
                        <Icon name="md-camera" color='green' size={24} />
                        <Text style={{ color: 'gray', fontSize: 16, fontWeight: '500', paddingLeft: 16 }}>Ảnh/Video</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    //console.log(JSON.stringify(image_del)); console.log(post.video_del);
                    navigation.navigate("emoji")
                }}>
                    <View style={{
                        flexDirection: 'row', height: 56, alignItems: 'center', paddingLeft: 16,
                        borderTopColor: '#72757A', borderTopWidth: StyleSheet.hairlineWidth
                    }}>
                        <Icon name="happy-outline" color='#EDC370' size={24} />
                        <Text style={{ color: 'gray', fontSize: 16, fontWeight: '500', paddingLeft: 16 }}>Cảm xúc</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    emoji: {
        marginLeft: 5,
        width: 20,
        height: 20,
        borderRadius: 50,
        marginBottom: 5
    },

    icon: {
        marginLeft: 10
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        overflow: "hidden",
    },
    firstImage: {
        flex: 1,
        borderWidth: 1,
        borderColor: "white",
        width: '50%'
    },
    secondImage: {
        flex: 1,
        borderWidth: 1,
        borderColor: "white",
        height: '50%',
    },
    thirdImage: {
        flex: 1,
        height: '33%',
        borderWidth: 1,
        borderColor: "white",
    },

});
