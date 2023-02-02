import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Button,
    View,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import CommentModal from '../Components/modal/CommentModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from 'react-native-vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import {FontAwesome5} from 'react-native-vector-icons';
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import styles from './style/profile';
import postService from '../Services/Api/postService';
import PostInHome from "../Components/PostInHome";

function ProfileScreen({ navigation }) {
    const dispatch = useDispatch();
    const {width} = Dimensions.get('window');
    const { userList, isLoading } = useSelector(
        (state) => state.user
    );
    const [listPost, setListPost] = useState([]);
    const { user } = useSelector(
        (state) => state.auth
    );
    const {userInfor, isEdit} = useSelector((state) => state.user);
    console.log('userInfor: ', userInfor);
        useEffect(() => {
            const fetchListPost = async () => {
                try {
                    let responese = await postService.getListPostByUserId(user.id);
                    setListPost(responese.data);
                } catch (e) {
                    console.log('Bug: ',e);
                }
            }

            fetchListPost();
        }, [])
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.firstView}>
                <Image source={!userInfor?.cover_image ? require('../../assets/images/default_avatar.jpg') : { uri: userInfor?.cover_image }} style={styles.coverImage}/>
                <View style={styles.avatar}>
                    <Image source={!userInfor?.avatar ? require('../../assets/images/default_avatar.jpg') : { uri: userInfor?.avatar }} style={styles.avatarImg}/>
                    <Text style={styles.name}>
                        { userInfor?.username }
                    </Text>
                    <View style={styles.addNews}>
                        <Icon name="add-circle-sharp" size={20} color="#ffffff"/>
                        <Text style={styles.addNewsText}>
                            Thêm vào tin
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', width: 0.9*width}}>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate('editProfile')}
                        style={styles.editInfor}
                        >
                            <View style={styles.editInfor}>
                                <MaterialCommunityIcons name="pencil" size={20} color='#000000'/>
                                <Text style={styles.editText}>
                                    Chỉnh sửa trang cá nhân
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.setting}
                            onPress={()=> navigation.navigate('setting')}
                        >
                            <View>
                                <MaterialIcons name="more-horiz" size={20} color='#000000'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.secondView}>
                <Text style={styles.title}>
                    Chi tiết
                </Text>
                <View style={styles.rowInfor}>
                    <MaterialCommunityIcons name='school' size={27} color='#909698'/>
                    <Text style={styles.hardTextAddress}>
                        Học tại
                    </Text>
                    <Text style={styles.data} numberOfLines={2}>
                        Đại học Bách Khoa Hà Nội
                    </Text>
                </View>
                <View style={styles.rowInfor}>
                    <MaterialCommunityIcons name='school' size={27} color='#909698'/>
                    <Text style={styles.hardTextAddress}>
                        Từng học tại
                    </Text>
                    <Text style={styles.data}>
                        Đại học Bách Khoa Hà Nội
                    </Text>
                </View>
                <View style={styles.rowInfor}>
                    <MaterialCommunityIcons name='school' size={27} color='#909698'/>
                    <Text style={styles.hardTextAddress}>
                        Đã học tại
                    </Text>
                    <Text style={styles.data}>
                        Tôi yêu Yên Mô A
                    </Text>
                </View>
                <View style={styles.rowInfor}>
                    <Icon name='home-sharp' size={25} color='#909698'/>
                    <Text style={styles.hardTextAddress}>
                        Sống tại
                    </Text>
                    <Text style={styles.data}>
                        {userInfor?.city}
                    </Text>
                </View>
                <View style={styles.rowInfor}>
                    <FontAwesome5 name='map-marker-alt' size={25} color='#909698'/>
                    <Text style={styles.hardTextCountry}>
                        Đến từ
                    </Text>
                    <Text style={styles.data}>
                        {userInfor?.country}
                    </Text>
                </View>
                <View style={styles.rowInfor}>
                    <MaterialIcons name="more-horiz" size={27} color='#909698'/>
                    <Text style={styles.hardTextAddress}>
                        Xem thông tin giới thiệu của bạn
                    </Text>
                </View>
                <View style={styles.editPublicInfor}>
                    <Text style={styles.textEditPublic}>
                        Chỉnh sửa chi tiết công khai
                    </Text>
                </View>
            </View>
            <View style={styles.thirdView}>
                <Text style={styles.titleThird}>
                    Bài viết
                </Text>
                <View style={styles.thinking}>
                    <Image source={{uri: `${userInfor?.avatar}`}} style={styles.postImage}/>
                    <Text style={styles.thinkText}>
                        Bạn đang nghĩ gì?
                    </Text>
                    <View style={styles.imageIcon}>
                        <FontAwesome5 name='images' size={25} color='#61ec84'/>
                    </View>
                </View>
            </View>
            {listPost?.map((item, index) => {
                //if (index === 0) console.log(item.image);
                return <PostInHome navigation={navigation} key={index} postData={item} userID={user.id}/>
            })}
        </ScrollView>
    );
}


export default memo(ProfileScreen);
