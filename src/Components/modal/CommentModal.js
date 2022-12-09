import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, Text, Button, View, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Picker} from "@react-native-picker/picker";

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
                style={{margin: 5}} 
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
                            <Ionicons style={{marginTop: 3}} name="thumbs-up" size={23} color="#1e90ff" />
                            <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', marginTop: 3}}>1.234</Text>
                            <Ionicons style={{}} name="chevron-forward-outline" size={33} color="black" />                           
                        </TouchableOpacity>

                        <Ionicons style={{flex:1, alignItems:"flex-end", border: 1}} name="thumbs-up" size={23} color="black" onPress={()=>console.log("Click like")}/>
                        
                        </View>

                        {/* thanh phù hợp nhất */}
                        <View style={styles.phuhopnhat}>
                            <Picker
                                selectedValue={pickerValue}
                                style={{ height: "120%", width: "50%", marginTop:-10}}
                                onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}
                            >
                                <Picker.Item label="Phù hợp nhất" value="phuhopnhat" />
                                <Picker.Item label="Mới nhất" value="moinhat" />
                                <Picker.Item label="Tất cả bình luận" value="tatca" />
                            </Picker>
                            {/* <Text style={{fontSize: 20, marginTop:-5}}>Phù hợp nhất</Text>
                            <Ionicons style={{flex:1, alignItems:"flex-end", border: 1}} name="chevron-down-outline" size={23} color="black" onPress={()=>console.log("Click like")}/> */}
                        </View>

                        {/* thanh comment */}
                        <View style={styles.comment}>
                            <Text>Bình luận đây</Text>
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
        borderRadius: 15,
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
        backgroundColor: "red"
    },
    comment: {
        backgroundColor: "springgreen",
        flex: 10
    },
    binhluan: {
        flex: 1,
        
    },
    input: {
        fontSize: 23,
        height: '80%',
        backgroundColor: '#f1f2f4',
        margin: 5,
        borderRadius: 25,
        color: 'white',
        
    },
    touchable: {
        flexDirection: "row",
        flex: 7
    }
    
});