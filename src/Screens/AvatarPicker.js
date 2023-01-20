import { ImagePicker, Album, Asset } from "expo-image-multiple-picker";
import {useDispatch, useSelector} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import {setAvatar} from '../Redux/userSlice';
import { useEffect } from "react";

export default function AvatarPicker({navigation}) {
    const dispatch = useDispatch();
    const {user} = useSelector(
        (state) => state.auth
    );
    const {userInfor} = useSelector((state) => state.user);
    const getType = (filename) => {
        return filename.split('.').pop();
    }

    useEffect(() => {
        console.log('new Data: ',userInfor);
    },[userInfor])

    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Text style={{ color: '#6b6b6b', fontSize: 18 }}>Hủy</Text>
            </TouchableOpacity>
        )
    });
    return <View style={{flex: 1}}>
        <ImagePicker
            onSave={(assets) => {
                let formData = new FormData();
                formData.append("avatar", { name: assets[0].filename, uri: assets[0].uri, type: 'image/' + getType(assets[0].filename) });
                dispatch(setAvatar({formData: formData, userId: user.id}));
                navigation.goBack();
            }}
            onCancel={() => console.log('no permissions or user go back')}
        />
    </View>
}