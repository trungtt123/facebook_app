import React, { useEffect, useState, memo, Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    Keyboard,
    StatusBar,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback } from 'react-native-web';
export default function CreatePostScreen({navigation}){
    
    return (
        <View style={{height: Dimensions.get('window').height}}>
            <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                <Image source={require('../Screens/img/me.png')} style={styles.img}/>
                <View style={{paddingLeft: 8}}>
                    <Text style={{color: 'black', fontWeight: '600'}}>Ngô Huy</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 2, paddingLeft: 4, paddingRight: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        marginTop: 4, borderColor: '#D3D6DB', borderWidth: 1, borderRadius: 5}}>
                            <Icon name="md-globe" color={'gray'}/>
                            <Text style={{color: 'gray', marginLeft: 4, marginRight: 4}}>Công khai</Text>
                            <Icon name='caret-down' color={'gray'} size={16}/>
                        </View>
                    </View>
                </View>
            </View>
    
            <View style={{flex: 1, padding: 16, paddingTop: 0}}>
                <TextInput autoFocus={true} style={{height: 100, fontSize: 16}} placeholderTextColor={'gray'} placeholder={"Bạn đang nghĩ gì?"}/>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("image")}>
                <View style={{flexDirection: 'row', height: 56, alignItems: 'center', paddingLeft: 16,
                    borderTopColor: '#72757A', borderTopWidth: StyleSheet.hairlineWidth}}> 
                    <Icon name="md-camera" color='#93B75F' size={24}/>
                    <Text style={{color: 'gray', fontSize: 16, fontWeight: '500', paddingLeft: 16}}>Ảnh/Video</Text>          
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("emoji")}>
                <View style={{flexDirection: 'row', height: 56, alignItems: 'center', paddingLeft: 16,
                    borderTopColor: '#72757A', borderTopWidth: StyleSheet.hairlineWidth}}>
                    <Icon name="ios-happy" color='#EDC370' size={24}/>
                    <Text style={{color: 'gray', fontSize: 16, fontWeight: '500', paddingLeft: 16}}>Cảm xúc</Text>
                </View>
                </TouchableOpacity>
            
            </View>
                <View style={{height:56}}/>         
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
