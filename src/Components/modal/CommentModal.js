import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, Text, Button, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from "@react-native-community/netinfo";
import { getTimeUpdateCommentFromUnixTime } from '../../Services/Helper/common';
//import {Picker} from "@react-native-picker/picker";


import axios from "../../setups/custom_axios";
import { _getCache } from "../../Services/Helper/common";

let comments = [];
let commentValue;
//goi api lay ra thong tin cac comment cua bai viet co post_id
const getComment = async (postId)=>{
    //const login = await axios.post(`http://localhost:8080/it4788/comment/set_comment?id=6386b4c98827e56f9cecbcb6&comment=Hello bro kk&index=0&count=10&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2IyNTQ0ODJjOWE3MDdjYzNkOWYyYyIsImRhdGVMb2dpbiI6IjIwMjItMTItMTRUMDc6MTU6NDguMTM3WiIsImlhdCI6MTY3MTAwMjE0OCwiZXhwIjoxNjcxMDg4NTQ4fQ.1gZnlJ3OxrZsYbUMDwsOetG37IiOO5pWUO0KeIJUXww`);
    const listComment = await axios.post(`/comment/get_comment?id=${postId}&index=0&count=10`);
    // có 2 cách xử lý
    //const login = await axios.post(`/auth/login?phonenumber=0987654340&password=123456`);
    console.log('login nè: ', listComment);
    comments = listComment.data;
    
    // axios.post(`/auth/login?phonenumber=0987654321&password=123456`).then((result) => {
    //     // truong hop api ko loi 
    //     console.log(result);
    // }).catch(e => {
    //     // truong hop api loi
    // })
}
const setComment = async (postId) => {
    console.log(commentValue);
    const setComment = await axios.post(`/comment/set_comment?id=${postId}&comment=${commentValue}&index=0&count=10`);
    console.log(setComment);
  };

//đây là mỗi phần tử comment, có urlImage, ten và textComment, time
class ComponentComment extends React.Component{
    constructor(props) {
        super(props);
        
      }
    render(){
        
        return(
        <View style={styles.commentContainer}>
            <Image
                style={styles.image}
                source={{
                    uri: this.props.urlImage,
                  }}
            />

            <View >
                {/* //comment text */}
                <View style={styles.commentComponent}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>{this.props.name}</Text>
                    <Text style={{fontSize: 17}}>{this.props.textComment}</Text>
                </View>

                {/* //time+like+réponse */}
                <View style={{flexDirection:'row', marginLeft: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: '#656766', marginRight: 13}}>{this.props.time}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: '#656766', marginRight: 13}}>Thích</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: '#656766'}}>Phản hồi</Text>

                    {/* số like comment */}
                    
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: '#656766', marginLeft: 20, marginRight: 2}}>1</Text>
                    <View style={{width:16, height: 16, backgroundColor: 'red',marginTop: 2, borderRadius: 20, paddingTop:1, alignItems:'center'}}>
                    <Ionicons style={{}} name="heart" size={12} color="white" />
                    </View>
                   

                </View>
            </View>
            
           
        </View>
        );
    }
    
}

//day la man hinh comment khi khong co internet
const NetworkError = ()=> {
  
    return (
      <View style={{ flex: 1,alignItems: "center",justifyContent: "center", marginTop: 120}}>
         <Ionicons name="chatbubble-ellipses-outline" size={120} color={'#cfd0d1'} ></Ionicons>
         <Text style={{fontWeight:"bold", fontSize:15}}>Viết bình luận trong khi offline</Text>
         <View style={{flexDirection:"row", marginTop: 5}}>
              <Ionicons name="refresh-outline" size={20} color={'#4c4c4c'} ></Ionicons>
              <Text style={{fontSize:15}}>Nhấn để tải lại bình luận</Text>
         </View>
      </View>
    );
  }

export default function CommentModal({ navigation, closeModal, postId }) {
    const [isModalVisible, setModalVisible] = useState(true);
    const [pickerValue, setPickerValue] = useState("Phù hợp nhất");
    const [textComment, setTextComment] = useState("");
    const [like, setLike] = useState("like1");
    
    
    //hàm này gọi khi mở modal comment lên
    const onScreenLoad =async () => {
        await getComment();
    }
    useEffect( () => {
         onScreenLoad();
    }, [])

    //check internet
    const [isConnected, setConnected] = useState(false);
    useEffect(()=>{
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setConnected(state.isConnected);
        });       
        // Unsubscribe
        return ()=>{
            unsubscribe();
        };
    }, [])

    return (
        <View>
            <Modal
                style={{margin: 0}} 
                isVisible={isModalVisible}
                swipeDirection="down"
                swipeThreshold={300}
                onSwipeComplete={(e) => { setModalVisible(false); closeModal(false) }}
            >

                <View style={styles.container}>
                    <View style={styles.modalView}>

                        {/* thanh like */}
                        <View style={styles.like}>
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={()=>console.log("Show nguoi like")}
                            >
                            {/* <Ionicons style={{marginTop: 3}} name="thumbs-up" size={23} color="#1e90ff" /> */}
                            <View style={{width:16, height: 16, backgroundColor: '#1f65ed',marginTop: 9, borderRadius: 20, paddingTop:1, alignItems:'center'}}>
                            <Ionicons style={{}} name="thumbs-up" size={12} color="white" />
                            </View>
                            <View style={{width:16, height: 16, backgroundColor: 'red',marginTop: 9, borderRadius: 20, paddingTop:1, alignItems:'center'}}>
                            <Ionicons style={{}} name="heart" size={12} color="white" />
                            </View>
                            {/* <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', marginTop: 3}}> 1.234</Text> */}
                            <Ionicons style={{}} name="chevron-forward-outline" size={33} color="black" />                           
                        </TouchableOpacity>

                        <AntDesign name={like} size={22} color={'#216fdb'} onPress={()=>{if(like=="like1")setLike("like2");else setLike("like1")}}/> 
                        </View>

                        {/* thanh phù hợp nhất */}
                        <View style={styles.phuhopnhat}>
                            {/* <Picker
                                selectedValue={pickerValue}
                                style={{ height: "120%", width: "60%", marginTop:-13, }}
                                onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}
                            >
                                <Picker.Item label="Phù hợp nhất" value="phuhopnhat" style={{fontSize: 18}}/>
                                <Picker.Item label="Mới nhất" value="moinhat" style={{fontSize: 18}}/>
                                <Picker.Item label="Tất cả bình luận" value="tatca" style={{fontSize: 18}}/>
                            </Picker> */}
                            <Text style={{fontSize: 20, marginTop:-5}}>Phù hợp nhất</Text>
                            <Ionicons style={{flex:1, alignItems:"flex-end", border: 1}} name="chevron-down-outline" size={23} color="black" onPress={()=>console.log("Click like")}/>
                        </View>

                        {/* thanh comment */}
                        <View style={styles.comment}>
                            

                            <ScrollView> 
                                {/* check xem co internet ko, neu co=>comment, ko thi man hinh error */}
                                {isConnected?
                                 comments?.map((item, index) => {
                                    return <ComponentComment time={getTimeUpdateCommentFromUnixTime(item.created)} urlImage={item.poster.avatar} key={index} name={item.poster.name} textComment={item.comment}/>
                                }):  <NetworkError/>}
                                
                            </ScrollView>
                        </View>

                        {/* thanh viết bình luận */}
                        <View style={styles.binhluan}>
                        
                        <TextInput
                            style={styles.input}
                            onChangeText = {(text)=>{setTextComment(text);commentValue=text;}}
                            value={textComment}
                            placeholder=" Viết bình luận..."
                            keyboardType="default"
                            onSubmitEditing={()=>{setComment();setTextComment("");}}
                        />
                        </View>
                    </View>
                </View>

            </Modal>
        </View>
        // <Modal
        //     animationType="slide"
        //     transparent={true}
        //     visible={modalVisible}
        // >

        // </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "flex-end",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        height: '100%',
        marginTop: 5,
        backgroundColor: "white",
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
        paddingLeft:10
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
    }
    
});