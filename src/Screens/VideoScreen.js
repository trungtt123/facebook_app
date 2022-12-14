import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Button,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import CommentModal from '../Components/modal/CommentModal';
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';

function VideoScreen() {
    const { userList, isLoading } = useSelector(
        (state) => state.user
    );
    const [index, setIndex] = useState(0);
    useEffect(() => {
    }, []);
    console.log(index);
    const [show, setShow] = useState(false);
    return (
        <View>
            <Text>Video</Text>
            <Button
                onPress={() => setShow(true)}
                title="SHOW COMMENT MODAL"
                color="#841584"
                style={{ marginTop: 5 }}
            />
            {show && <CommentModal closeModal={() => setShow(false)}/>}
        </View>
    );
}


export default memo(VideoScreen);
