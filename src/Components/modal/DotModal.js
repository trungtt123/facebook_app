import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, Text, Button, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { AntDesign, Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from "@react-native-community/netinfo";
import { getTextWithIcon, getTimeUpdateCommentFromUnixTime } from '../../Services/Helper/common';
//import {Picker} from "@react-native-picker/picker";
import ReportModal from "./ReportModal";

import axios from "../../setups/custom_axios";
import { _getCache } from "../../Services/Helper/common";
import { Paragraph } from "react-native-paper";
import ViewWithIcon from "../ViewWithIcon";



//day la man hinh comment khi khong co internet
const MyDot = () => {

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20, backgroundColor: "white", borderRadius: 10}}>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <AntDesign name="pushpin" size={30} color="black" style={{marginLeft: 20}}></AntDesign>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Ghim bài viết</Text>
            </View>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <Entypo name="bookmark" size={30} color="black" style={{marginLeft: 20}}></Entypo>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Lưu bài viết</Text>
            </View>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <Entypo name="edit" size={30} color="black" style={{marginLeft: 20}}></Entypo>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Chỉnh sửa bài viết</Text>
            </View>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <MaterialIcons name="notifications-off" size={30} color="black" style={{marginLeft: 20}}></MaterialIcons>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Tắt thông báo về bài viết này</Text>
            </View>
        </View>
    );
}
const HideMyDot = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20, backgroundColor: "white", borderRadius: 10, height:100}}>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <FontAwesome5 name="window-close" size={30} color="black" style={{marginLeft: 20}}></FontAwesome5>
                <View>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Ẩn khỏi trang cá nhân</Text>
                <Text style={{fontSize: 15, marginLeft: 5}}>Bài viết này vẫn có thể xuất hiện ở nơi khác</Text>
                </View>
            </View>
        </View>
    );
}
const FriendDot = ({setReportDot, setModalVisible, closeModal}) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20, backgroundColor: "white", borderRadius: 10}}>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <AntDesign name="pushpin" size={30} color="black" style={{marginLeft: 20}}></AntDesign>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Ghim bài viết</Text>
            </View>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <Entypo name="bookmark" size={30} color="black" style={{marginLeft: 20}}></Entypo>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Lưu bài viết</Text>
            </View>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <Ionicons name="ios-copy" size={30} color="black" style={{marginLeft: 20}}></Ionicons>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Sao chép liên kết</Text>
            </View>
            <TouchableOpacity onPress={()=> {setReportDot(true);setModalVisible(false); closeModal(false);}}>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <MaterialIcons name="report" size={30} color="black" style={{marginLeft: 20}}></MaterialIcons>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Báo cáo bài viết</Text>
            </View>
            </TouchableOpacity>
        </View>
    );
}
const HideFriendDot = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20, backgroundColor: "white", borderRadius: 10, height:100}}>
            <View style={{ flexDirection: "row", width: 400, alignItems: "center", marginBottom: 5}}>
                <AntDesign name="clockcircle" size={30} color="black" style={{marginLeft: 20}}></AntDesign>
                <View>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 5}}> Tạm ẩn trong 30 ngày</Text>
                <Text style={{fontSize: 15, marginLeft: 5}}>Tạm thời dừng xem bài viết</Text>
                </View>
            </View>
        </View>
    );
}
const NetworkError = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20, backgroundColor: "white", borderRadius: 10, height:200, width: 400,}}>
            <Image source={require('../../../assets/images/repair.png')}
             resizeMode="cover" style={{width: 100, height: 100}}
            ></Image>
            <Text style={{textAlign: "center", width: 300}}>Đây có thể là do lỗi kỹ thuật mà chúng tôi đang tìm cách khắc phục. Hãy thử tải lại trang này.</Text>
        </View>
    );
}

export default function DotModal({ closeModal, postUserId, userID, setReportDot }) {
    const [isModalVisible, setModalVisible] = useState(true);

    //check internet
    const [isConnected, setConnected] = useState(false);
    useEffect(() => {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            setConnected(state.isConnected);
        });
        // Unsubscribe
        return () => {
            unsubscribe();
        };
    }, [])
    
    const [h, setH] = useState(400);//chieu cao khi cuon
    return (
        <View style={{justifyContent: "flex-end"}}>
            <Modal
                style={{ margin: 0 }}
                isVisible={isModalVisible}
                swipeDirection="down"
                swipeThreshold={300}
                onSwipeComplete={(e) => { setModalVisible(false); closeModal(false); }}
            >

                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <View style={styles.grabber}></View>
      

                        {/* thanh comment */}
                        <View style={styles.comment}>


                            <ScrollView
                                onScroll={(e) => {
                                    
                                    //paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                                    if(e.nativeEvent.contentOffset.y >= h) {
                                      //console.log("Load comment ");
                                      setH(h+400);
                                    }
                                  }}
                            >
                                {/* check xem co internet ko, neu co=>comment, ko thi man hinh error */}
                                {!isConnected ? <NetworkError/> : null}
                                {(postUserId==userID && isConnected) ? <MyDot/> : <FriendDot setReportDot={setReportDot} setModalVisible={setModalVisible} closeModal={closeModal}/>}
                                {(postUserId==userID && isConnected) ? <HideMyDot/> : <HideFriendDot/>}

                            </ScrollView>
                        </View>
                    </View>
                </View>

            </Modal>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "flex-end",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    modalView: {
        width: '100%',
        height: '40%',
        marginTop: 5,
        backgroundColor: "rgb(240,242,245)",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 100,
        alignItems: "center"

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center"
    },

    like: {
        flex: 1,
        flexDirection: "row",

    },
    phuhopnhat: {

        flex: 1,
        flexDirection: "row",

    },
    comment: {

        flex: 10
    },
    binhluan: {
        flex: 1.25,
        borderTopWidth: 1.5,
        borderTopColor: '#d2d2d2'
    },
    input: {
        fontSize: 22,
        height: '80%',
        backgroundColor: '#f1f2f4',
        marginTop: 5,
        borderRadius: 25,
        paddingLeft: 10
    },
    touchable: {
        flexDirection: "row",
        flex: 7
    },


    //phan danh cho phan tu comment
    commentContainer: {
        width: '100%',
        marginTop: 5,
        backgroundColor: "white",
        padding: 10,
        shadowColor: "#000",
        flexDirection: "row",
        marginTop: -8
    },
    image: {
        width: 40,
        height: 40,
        backgroundColor: '#ffd480',
        borderRadius: 100
    },
    commentComponent: {
        borderRadius: 15,
        backgroundColor: '#f1f2f6',
        marginLeft: 5,
        marginRight: 30,
        width: 'auto',
        padding: 10
    },
    grabber: {
        width: 100,
        height: 5,
        backgroundColor: "#aaa",
        borderRadius: 2,
        marginBottom: 1,
    },

});