import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, Text, Button, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Picker} from "@react-native-picker/picker";


import axios from "../../setups/custom_axios";
import { _getCache } from "../../Services/Helper/common";

let comments = [];
let commentValue;
//goi api lay ra thong tin cac comment cua bai viet co post_id
const getComment = async (post_id)=>{
    let token = await _getCache("token");
    //console.log(token);  
    post_id="6386b4c98827e56f9cecbcb6"; 
    //const login = await axios.post(`http://localhost:8080/it4788/comment/set_comment?id=6386b4c98827e56f9cecbcb6&comment=Hello bro kk&index=0&count=10&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2IyNTQ0ODJjOWE3MDdjYzNkOWYyYyIsImRhdGVMb2dpbiI6IjIwMjItMTItMTRUMDc6MTU6NDguMTM3WiIsImlhdCI6MTY3MTAwMjE0OCwiZXhwIjoxNjcxMDg4NTQ4fQ.1gZnlJ3OxrZsYbUMDwsOetG37IiOO5pWUO0KeIJUXww`);
    const listComment = await axios.post(`/comment/get_comment?id=${post_id}&index=0&count=10`);
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
const setComment = async (post_id) => {
    //let token = await _getCache("token");  
    //console.log(token);
    post_id="6386b4c98827e56f9cecbcb6"; 
    console.log(commentValue);
    const setComment = await axios.post(`/comment/set_comment?id=${post_id}&comment=${commentValue}&index=0&count=10`);
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
    {/* 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' */}
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
                    
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: '#656766', marginLeft: 20, marginRight: 2}}>3</Text>
                    <View style={{width:16, height: 16, backgroundColor: 'red',marginTop: 2, borderRadius: 20, paddingTop:1, alignItems:'center'}}>
                    <Ionicons style={{}} name="heart" size={12} color="white" />
                    </View>
                   

                </View>
            </View>
            
           
        </View>
        );
    }
    
}


export default function CommentModal({ navigation, closeModal }) {
    const [isModalVisible, setModalVisible] = useState(true);
    const [pickerValue, setPickerValue] = useState("Phù hợp nhất");
    const [textComment, setTextComment] = useState("");
    const [like, setLike] = useState("like1");
    //click outside de dong modal
    // const outsideClick = () => {
    //     if(closeOnClickOutside) {
    //         this.setState({ isModalVisible: false });
    //     }
    // }
    
    //hàm này gọi khi mở modal comment lên
    const onScreenLoad =async () => {
        await getComment();
    }
    useEffect( () => {
         onScreenLoad();
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
                            <Picker
                                selectedValue={pickerValue}
                                style={{ height: "120%", width: "60%", marginTop:-13, }}
                                onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}
                            >
                                <Picker.Item label="Phù hợp nhất" value="phuhopnhat" style={{fontSize: 18}}/>
                                <Picker.Item label="Mới nhất" value="moinhat" style={{fontSize: 18}}/>
                                <Picker.Item label="Tất cả bình luận" value="tatca" style={{fontSize: 18}}/>
                            </Picker>
                            {/* <Text style={{fontSize: 20, marginTop:-5}}>Phù hợp nhất</Text>
                            <Ionicons style={{flex:1, alignItems:"flex-end", border: 1}} name="chevron-down-outline" size={23} color="black" onPress={()=>console.log("Click like")}/> */}
                        </View>

                        {/* thanh comment */}
                        <View style={styles.comment}>
                            <ScrollView>
                            {/* <ComponentComment time={'23p'} urlImage={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRN9yYfNZ8CyiytwR072VR6PuFRZ1je7NZ4RmY2gu_CaJuJP0j6T0-javOuzAyrAI8XDg&usqp=CAU'} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không?'}/>
                            <ComponentComment time={'24p'} urlImage={''} name={'Nguyễn Thị Trang'} textComment={'Bạn xinh gái quá!'}/>
                            <ComponentComment time={'25p'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? Làm ny mình đi mà, trời lạnh thế này mà có ny ôm thì thích cực! Thế nhé, mai mình đón bạn đi chơi'}/>
                            <ComponentComment time={'26p'} urlImage={''} name={'Tùng'} textComment={':))'}/>
                            <ComponentComment time={'1h'} urlImage={''} name={'Huy Quần Hoa'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'2h'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'1d'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'2p'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'2d'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'Vừa xong'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'4p'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh quá, làm ny mình được không? '}/> */}

                            {
                            comments?.map((item, index) => {
                                return <ComponentComment time={'4p'} urlImage={item.poster.avatar} key={index} name={item.poster.name} textComment={item.comment}/>
                            })}
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