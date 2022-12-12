import React, { useEffect, useState, memo, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { icon_no_code, data_icon_no_code } from '../Services/Helper/emoticons';
import { getTextWithIcon } from '../Services/Helper/common';
import { Paragraph } from 'react-native-paper'
function ViewWithIcon({ value, fontSize, iconSize }) {
    const [viewElm, setViewElm] = useState();
    const convertStringToListTextAndImage = useCallback((value) => {
        let newText = value;
        let data = [];
        let dataTmp = newText.split("\n");
        for (let i = 0; i < dataTmp.length; i++) {
            let arr = dataTmp[i].split(" ");
            for (let j = 0; j < arr.length; j++) {
                data.push(arr[j]);
                data.push(" ");
            }
            data.push("\n");
        }
        while (data[0] === "\n" || data[0] === " ") {
            data.splice(0, 1);
        }
        while (data[data.length - 1] === "\n" || data[data.length - 1] === " ") {
            data.splice(data.length - 1, 1);
        }
        let elm = data.map((item, index) => {
            if (data_icon_no_code[item] === undefined || data_icon_no_code[item] === null) {
                return <Text style={{fontSize: fontSize}} key={index}>{item}</Text>
            }
            else {
                return <Image style={{ width: iconSize, height: iconSize }} key={index} source={{ uri: data_icon_no_code[item] }} />
            }
        });
        setViewElm(elm);
    }, []);
    console.log('re-rendering');
    useEffect(() => {
        convertStringToListTextAndImage(value);
    }, [value]);
    return (
        <Paragraph style={{padding: 5}}>
            {viewElm}
        </Paragraph>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default memo(ViewWithIcon);
