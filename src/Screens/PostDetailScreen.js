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
function PostDetailScreen() {
    return (
        <View>
            <Text>Post Detail</Text>
        </View>
    );
}


export default PostDetailScreen;