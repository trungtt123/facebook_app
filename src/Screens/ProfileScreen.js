import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Button,
    View,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import CommentModal from '../Components/modal/CommentModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from 'react-native-vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import {FontAwesome5, FontAwesome, AntDesign, Fontisto} from 'react-native-vector-icons';
import ModalBottom from 'react-native-modalbox';
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import styles from './style/profile';
import postService from '../Services/Api/postService';
import userService from '../Services/Api/userService';
import PostInHome from "../Components/PostInHome";

function ProfileScreen({ navigation, token, userId }) {

    const listFriend =[
        {
            avatar: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/66266963_101143601202898_5231374645902442496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2JJF9ypo7CYAX9KaWm0&_nc_ht=scontent.fhan5-3.fna&oh=00_AfBETtD72W9zWphBXkFgFVj68uPWHmau_qaN9dV-Z2pRBQ&oe=640195A1',
            username: 'An Vu'
        },
        {
            avatar: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/66266963_101143601202898_5231374645902442496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2JJF9ypo7CYAX9KaWm0&_nc_ht=scontent.fhan5-3.fna&oh=00_AfBETtD72W9zWphBXkFgFVj68uPWHmau_qaN9dV-Z2pRBQ&oe=640195A1',
            username: 'An Vu'
        },
        {
            avatar: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/66266963_101143601202898_5231374645902442496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2JJF9ypo7CYAX9KaWm0&_nc_ht=scontent.fhan5-3.fna&oh=00_AfBETtD72W9zWphBXkFgFVj68uPWHmau_qaN9dV-Z2pRBQ&oe=640195A1',
            username: 'An Vu'
        },
        {
            avatar: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/66266963_101143601202898_5231374645902442496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2JJF9ypo7CYAX9KaWm0&_nc_ht=scontent.fhan5-3.fna&oh=00_AfBETtD72W9zWphBXkFgFVj68uPWHmau_qaN9dV-Z2pRBQ&oe=640195A1',
            username: 'An Vu'
        },
        {
            avatar: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/66266963_101143601202898_5231374645902442496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2JJF9ypo7CYAX9KaWm0&_nc_ht=scontent.fhan5-3.fna&oh=00_AfBETtD72W9zWphBXkFgFVj68uPWHmau_qaN9dV-Z2pRBQ&oe=640195A1',
            username: 'An Vu'
        },
        {
            avatar: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/66266963_101143601202898_5231374645902442496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2JJF9ypo7CYAX9KaWm0&_nc_ht=scontent.fhan5-3.fna&oh=00_AfBETtD72W9zWphBXkFgFVj68uPWHmau_qaN9dV-Z2pRBQ&oe=640195A1',
            username: 'An Vu'
        }
    ]
    const dispatch = useDispatch();
    const {width} = Dimensions.get('window');
    const { userList, isLoading } = useSelector(
        (state) => state.user
    );

    const [showModalAva, setShowModalAva] = useState(false);
    const [showModalCover, setShowModalCover] = useState(false);


    const [listPost, setListPost] = useState([]);
    const { user } = useSelector(
        (state) => state.auth
    );
    const {userInfor, isEdit} = useSelector((state) => state.user);
    const [userInfors, setUserInfors] = useState(userInfor);
    console.log('userPr: ', user);
    useEffect(() => {
        const fetchListPost = async () => {
            try {
                let responese = await postService.getListPostByUserId(userId ? userId:user.id);
                setListPost(responese.data);
                if (userId) {
                    let responseInfor = await userService.getUserInfor(userId);
                    setUserInfors(responseInfor.data);
                }
            } catch (e) {
                console.log('Bug: ',e);
            }
        }

        fetchListPost();
    }, [])

    const  showModalAvatar = () => {
        setShowModalAva(true);
    }
    return (
        <>
            <ModalBottom
                backdropPressToClose={true}
                isOpen={showModalAva}
                style={styles.modalBox}
                onClosed={() => setShowModalAva(false)}
            >
                <View style={styles.contentAva}>
                    <View style = {styles.rowModal}>
                        <View style={styles.iconModal}>
                            <MaterialIcons name='filter-frames' size={25}/>
                        </View>
                        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: '500' }}>
                            Thêm khung
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('pickAvatar')}
                    >
                        <View style = {styles.rowModal}>
                            <View style={styles.iconModal}>
                                <FontAwesome5 name='images' size={25}/>
                            </View>
                            <Text style={{ fontSize: 20, marginTop: 5, fontWeight: '500' }}>
                                Chọn ảnh đại diện
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style = {styles.rowModal}>
                        <View style={styles.iconModal}>
                            <FontAwesome5 name='user-circle' size={25}/>
                        </View>
                        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: '500' }}>
                            Xem ảnh đại diện
                        </Text>
                    </View>
                </View>
            </ModalBottom>

            <ModalBottom
                backdropPressToClose={true}
                isOpen={showModalCover}
                style={styles.modalBox}
                onClosed={() => setShowModalCover(false)}
            >
                <View style={styles.contentCover}>
                    <View style = {styles.rowModal}>
                        <View style={styles.iconModal}>
                            <FontAwesome5 name='image' size={25}/>
                        </View>
                        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: '500' }}>
                            Xem  ảnh bìa
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('pickCover')}
                    >
                        <View style = {styles.rowModal}>
                            <View style={styles.iconModal}>
                                <FontAwesome name='upload' size={25}/>
                            </View>
                            <Text style={{ fontSize: 20, marginTop: 5, fontWeight: '500' }}>
                                Tải ảnh lên
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style = {styles.rowModal}>
                        <View style={styles.iconModal}>
                            <MaterialCommunityIcons name='facebook' size={25}/>
                        </View>
                        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: '500' }}>
                            Chọn ảnh trên facebook
                        </Text>
                    </View>
                    <View style = {styles.rowModal}>
                        <View style={styles.iconModal}>
                            <AntDesign name='appstore1' size={25}/>
                        </View>
                        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: '500' }}>
                            Tạo nhóm ảnh bìa
                        </Text>
                    </View>
                </View>
            </ModalBottom>
        <ScrollView style={styles.container}>
            <View style={styles.firstView}>
                <TouchableOpacity
                    onPress={() => setShowModalCover(true)}
                >
                    <Image source={(userId?!userInfors?.cover_image : !userInfor.cover_image) ? require('../../assets/images/default_avatar.jpg') : { uri: userId? userInfors?.cover_image : userInfor?.cover_image}} style={styles.coverImage}/>
                </TouchableOpacity>
                <View style={styles.avatar}>
                    <TouchableOpacity
                        onPress={() => showModalAvatar()}
                    >
                        <Image source={(userId?!userInfors?.avatar:!userInfor.avatar) ? require('../../assets/images/default_avatar.jpg') : { uri: userId? userInfors?.avatar: userInfor?.avatar}} style={styles.avatarImg}/>
                    </TouchableOpacity>
                    <Text style={styles.name}>
                        { userInfors?.username }
                    </Text>
                    <View style={styles.addNews}>
                        {userId ? <Fontisto name="messenger" size={20} color="#ffffff"/> : <Icon name="add-circle-sharp" size={20} color="#ffffff"/>}
                        <Text style={styles.addNewsText}>
                            {userId ? 'Nhắn tin' :'Thêm vào tin'}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', width: 0.9*width}}>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate('editProfile')}
                        style={styles.editInfor}
                        >
                            <View style={styles.editInfor}>
                                {userId ? <FontAwesome5 name="user-check" size={20} color="#ffffff"/> :<MaterialCommunityIcons name="pencil" size={20} color='#000000'/>}
                                <Text style={styles.editText}>
                                    {userId? 'Bạn bè' :'Chỉnh sửa trang cá nhân'}
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
                {
                (userId?userInfors.city:userInfor.city)?
                    <View style={styles.rowInfor}>
                        <Icon name='home-sharp' size={25} color='#909698'/>
                        <Text style={styles.hardTextAddress}>
                            Sống tại
                        </Text>
                        <Text style={styles.data}>
                            {userId?userInfors.city:userInfor.city}
                        </Text>
                    </View>
                : <View></View>
                }
                {
                (userId? userInfors.country : userInfor.country)?
                    <View style={styles.rowInfor}>
                        <FontAwesome5 name='map-marker-alt' size={25} color='#909698'/>
                        <Text style={styles.hardTextCountry}>
                            Đến từ
                        </Text>
                        <Text style={styles.data}>
                            {userInfors?.country}
                        </Text>
                    </View>
                :<View></View>
                }
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.title}>
                        Bạn bè
                    </Text>
                    <Text style={styles.titleButton}>
                        Tìm bạn bè
                    </Text>
                </View>
                <Text style={{ fontSize: 18, color:'#7a7c7d', marginTop: 5 }}>
                    290 người bạn
                </Text>
                <SimpleGrid
                    data={listFriend}
                    spacing={2}
                    renderItem={({ item }) => (
                        <Friend data={item}/>
                    )}
                />
                <View style={{
                    marginTop: 20,
                    marginBottom: 20,
                    backgroundColor: '#E4E6EB',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderRadius: 5
                }}>
                    <Text style={styles.editText}>
                        Xem tất cả bạn bè
                    </Text>
                </View>
            </View>
            <View style={styles.thirdView}>
                <Text style={styles.titleThird}>
                    Bài viết
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('createPost')}
                >
                    <View style={styles.thinking}>
                        <Image source={!userInfors?.avatar ? require('../../assets/images/default_avatar.jpg') : { uri: userInfors?.avatar }} style={styles.postImage}/>
                        <Text style={styles.thinkText}>
                            Bạn dang nghĩ gì?
                        </Text>
                        <View style={styles.imageIcon}>
                            <FontAwesome5 name='images' size={25} color='#61ec84'/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            {listPost?.map((item, index) => {
                return <PostInHome navigation={navigation} key={index} postData={item} />
            })}
        </ScrollView>
        </>
    );
}

function Friend({data}) {
    return (
        <View style = {styles.friendCard}>
            <Image source={!data?.avatar ? require('../../assets/images/default_avatar.jpg') : { uri: data?.avatar }} style={styles.imageFr}/>
            <Text style={{ fontSize: 18, fontWeight: '500'}}>
                {data?.username}
            </Text>
        </View>
    );
}


export default memo(ProfileScreen);
