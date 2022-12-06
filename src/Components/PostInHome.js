import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import { Ionicons, Entypo, EvilIcons, AntDesign } from '@expo/vector-icons';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { unixTimeConvert } from '../Services/Helper/common';
import postService from '../Services/Api/postService';
import CenterModal from './modal/CenterModal';
function PostInHome({ navigation, postData}) {
    const dispatch = useDispatch();
    const [post, setPost] = useState(postData);
    const [isError, setIsError] = useState(false);
    const postUpdated = () => {
        postService.getPost(post.id).then(async (result) => {
            setPost(result.data);
            await postService.updateListPostsCache([result.data]);
        }).catch((e) => {
            console.log(e);
        })
    }
    const LeftContent = () => {
        return <Avatar.Image size={45} source={{ uri: post?.author?.avatar }} />
    }
    const RightContent = () => {
        return <View style={{ flexDirection: 'row' }}>
            <Entypo style={{ top: -10, right: 20 }} name="dots-three-horizontal" size={18} color="#626262" />
            <Ionicons style={{ top: -15, right: 10 }} name="md-close" size={25} color="#626262" />
        </View>
    }
    const handleLikePost = () => {
        // call api like post
        postService.likePost(post?.id).then((data) => {
            postUpdated();
        }).catch((e) => {
            console.log(e);
            setIsError(true);
        });
    }
    return (
        <View style={{ flex: 1, marginTop: 10 }}>
            {isError && <CenterModal onClose={() => setIsError(false)} body={"Không có kết nối Internet \n Hãy thử lại sau."}/>}
            <Card>
                <Card.Title
                    titleStyle={{ fontSize: 15, flexDirection: 'row' }}
                    title={
                        <Text>
                            <View style={{ flexDirection: 'row', width: 200 }}>
                                <Text numberOfLines={4}>
                                    <Text style={{ fontWeight: 'bold' }}>{post?.author?.username}</Text>
                                    <Text style={{ fontWeight: 'normal' }}>
                                        {` đang cảm thấy ${post?.state}`}
                                    </Text>
                                </Text>
                            </View>
                        </Text>
                    }
                    subtitleNumberOfLines={2}
                    subtitle={
                        <Text>
                            <Text>{unixTimeConvert(post?.modified)}</Text>
                        </Text>
                    } left={LeftContent}
                    right={RightContent}
                />
                <Card.Content>
                    <Paragraph>{post?.described}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={{
                            flex: 1,
                            marginLeft: 5,
                            marginRight: 5,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>

                            <View style={{ flexDirection: "row", }}>
                                <AntDesign name="like1" size={10} color="white" style={{top: 1, padding: 4, borderRadius: 10, backgroundColor: '#30a4f0'}}/>
                                <Text style={{ left: 5, color: "#626262" }}>{post?.is_liked}</Text>
                            </View>
                            
                            <TouchableOpacity style={{ flexDirection: "row", }}>
                                <Text style={{ color: "#626262" }}>{post?.comment} bình luận</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ height: 1, backgroundColor: '#e7e7e7', marginVertical: 15, marginHorizontal: 5}} />
                        <View style={{
                            flex: 1,
                            marginHorizontal: 20,
                            marginBottom: 5,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>

                            <TouchableOpacity activeOpacity={.75} style={{ flexDirection: "row", }} onPress={() => handleLikePost()}>
                                <AntDesign name={+post?.is_liked === 1 ? 'like1' : 'like2'} size={22} color={+post?.is_liked === 1 ? '#30a4f0' : '#626262'} />
                                <Text style={{ top: 4, left: 3, color: "#626262" }}>Thích</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.75} style={{ flexDirection: "row", }}>
                                <Ionicons style={{ top: 3 }} name="chatbox-outline" size={22} color="#626262" />
                                <Text style={{ top: 4, left: 3, color: "#626262" }}>Bình luận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.75} style={{ flexDirection: "row", }}>
                                <Ionicons style={{ top: 2 }} name="share-social-outline" size={22} color="#626262" />
                                <Text style={{ top: 4, left: 3, color: "#626262" }}>Chia sẻ</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Card.Actions>
            </Card>
        </View>
    );
}


export default PostInHome;
