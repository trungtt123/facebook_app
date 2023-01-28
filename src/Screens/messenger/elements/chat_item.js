import React, { Component } from 'react';
import { View, Text, Image ,TouchableOpacity } from 'react-native';
import styles from '../style/style_item';
//start
import { io } from 'socket.io-client'
const socket = io.connect("http://localhost:8080");
const openConversation = (a)=>{
        console.log(a);
       
            socket.emit("send_message", {message: "Hello"});
        
    }

class Item extends Component {

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

export default Item


