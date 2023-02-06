import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Image ,TouchableOpacity } from 'react-native';
import styles from '../style/style_item';


function Item (props) {
    
    
        const {item} = props;
        // console.log(item);
        const {navigation} = props;
        let av = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-13.jpg";
        const [lastMessage, setLastMessage] = useState("ô");
        useEffect(() => {
            setLastMessage(item.lastMessage.message)
        })
       return (
        <TouchableOpacity onPress={()=>{navigation.navigate('chatscreen', {userId: item.partner.id, userName: item.partner.username, avatar: (item.partner.avatar==null)?av:item.partner.avatar})}}>
        <View style={styles.container}>
            <View style={styles.bgAvatar}>
                <Image
                    source={{uri: (item.partner.avatar==null)?av:item.partner.avatar}}
                    style={styles.avatar}
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{item.partner.username}</Text>
                <Text numberOfLines={1}>{lastMessage}</Text>
            </View>
            <View style={styles.bgSeen}>
                <Image
                    source={{uri: (item.partner.avatar==null)?av:item.partner.avatar}}
                    style={styles.avatarSeen}
                />
            </View>
        </View>
    </TouchableOpacity>
    )
    

}

export default Item


