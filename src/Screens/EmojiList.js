import React, { useState,useEffect } from "react";
import { Text,View,Image, StyleSheet } from "react-native";
import data from "./img/emoji";
export default function EmojiList(){
    return (
        <View>
            <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
            {data.map((item, key) => {
                const tmp = './'+item.img;  
                console.log("check",tmp);
                return <Image source={require(tmp)} key={key} style={styles.img}></Image>
})}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    img: {
        width: 50,
        height: 50,
        borderRadius:50
    },

    icon: {
        marginLeft: 10
    }
});