import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, Text, Button, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Picker} from "@react-native-picker/picker";

//đây là mỗi phần tử comment, có urlImage, ten và textComment, time
class ComponentComment extends React.Component{
    render(){
        return(
        <View style={styles.commentContainer}>
            <Image
                style={styles.image}
                source={{
                    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
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
    //click outside de dong modal
    // const outsideClick = () => {
    //     if(closeOnClickOutside) {
    //         this.setState({ isModalVisible: false });
    //     }
    // }
    
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
                            <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', marginTop: 3}}> 1.234</Text>
                            <Ionicons style={{}} name="chevron-forward-outline" size={33} color="black" />                           
                        </TouchableOpacity>

                        <Ionicons style={{flex:1, alignItems:"flex-end", border: 3, borderColor: "#636363"}} name="thumbs-up" size={23} color="#070707" onPress={()=>console.log("Click like")}/>
                        
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
                            <ComponentComment time={'23p'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không?'}/>
                            <ComponentComment time={'24p'} urlImage={''} name={'Nguyễn Thị Trang'} textComment={'Bạn xinh gái quá!'}/>
                            <ComponentComment time={'25p'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? Làm ny mình đi mà, trời lạnh thế này mà có ny ôm thì thích cực! Thế nhé, mai mình đón bạn đi chơi'}/>
                            <ComponentComment time={'26p'} urlImage={''} name={'Tùng'} textComment={':))'}/>
                            <ComponentComment time={'1h'} urlImage={''} name={'Huy Quần Hoa'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'2h'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'1d'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'2p'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'2d'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'Vừa xong'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh gái quá, làm ny mình được không? '}/>
                            <ComponentComment time={'4p'} urlImage={''} name={'Huỳnh Đức'} textComment={'Bạn xinh quá, làm ny mình được không? '}/>
                            </ScrollView>
                        </View>

                        {/* thanh viết bình luận */}
                        <View style={styles.binhluan}>
                        
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder=" Viết bình luận..."
                            keyboardType="default"
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
        fontSize: 23,
        height: '80%',
        backgroundColor: '#f1f2f4',
        marginTop: 5,
        borderRadius: 25,
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