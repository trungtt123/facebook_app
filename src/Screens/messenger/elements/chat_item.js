import React, { Component } from 'react';
import { View, Text, Image ,TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../style/style_item';
//start
import { io } from 'socket.io-client'
import { Modal } from 'react-native-paper';
const socket = io.connect("http://localhost:8080");
const openConversation = (a)=>{
        console.log(a);
       
            socket.emit("send_message", {message: "Hello"});
        
    }

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visi: true
        };
      }
        
    render() {
        const {item} = this.props;
        console.log(item)

       return (
        <TouchableOpacity onPress={()=>openConversation(item.name)}>
            
        <View style={styles.container}>
            <View style={styles.bgAvatar}>
                <Image
                    source={{uri: item.avatar}}
                    style={styles.avatar}
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text numberOfLines={1}>{item.description}</Text>
            </View>
            <View style={styles.bgSeen}>
                <Image
                    source={{uri: item.avatar}}
                    style={styles.avatarSeen}
                />
            </View>
        </View>
    </TouchableOpacity>
    )
    }

}
const st = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
export default Item


