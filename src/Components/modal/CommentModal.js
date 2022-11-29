import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, Text, Button, View } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
export default function CommentModal({ navigation, closeModal }) {
    const [isModalVisible, setModalVisible] = useState(true);

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
                        <Text>Comment Modal</Text>
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
        margin: 5,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 100
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center"
    }
});