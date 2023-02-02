import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedbackComponent,
} from 'react-native';
import { Image } from 'react-native';
// import { COMMON_COLOR } from "../Services/Helper/constant";
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import axios from '../setups/custom_axios';
import { MaterialIcons } from '@expo/vector-icons';
function SearchScreen3({ navigation }) {
    const { user, isLoading } = useSelector(
        (state) => state.auth
    );
    console.log(_getCache("token"))

    const [result, setResult] = useState([])
    const [isSearch, setIsSearch] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [clear, setClear] = useState(false)
    const handleClear = () => {
        setClear(true);
        setKeyword('');
    }
    const handleSearch = () => {
        setIsSearch(1)
        axios.post(`/search/search?index=0&count=20&keyword=${keyword}`)
            .then(res => {
                setResult(res.data)
                console.log('data', res.data)
                console.log(res.data.length)
                // setResult(res)
            })
            .catch(error => {
                setResult([]);
            })
    }

    useEffect(() => {
        axios.post(`/search/get_saved_search?index=0&count=20`)
            .then(res => {
                setResult(res.data)
            })
            .catch(error => {
                setResult([])
            })
    }, [clear])

    const getSavedSearch = () => {
        setIsSearch(0);
        axios.post(`/search/get_saved_search?index=0&count=20`)
            .then(res => {
                setResult(res.data)
            })
            .catch(error => {
                setResult([])
            })
    }

    console.log(1, result);
    React.useEffect(() => {
        console.log(5, keyword)
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <TextInput
                        // style={styles.textSearch}
                        placeholder="Tìm kiếm"
                        value={keyword}
                        onFocus={() => getSavedSearch()}
                        onChangeText={e => setKeyword(e)}
                        onSubmitEditing={() => handleSearch()}
                    >
                    </TextInput>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => handleClear()}>
                    <MaterialIcons name="clear" size={25} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: 'white', //Set Header color
            },
        });
    }, [navigation, keyword])
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: "bold" }}>Tìm kiếm gần đây</Text>
                <TouchableOpacity onPress = {() => navigation.navigate('deleteSearch')}>
                    <Text style={{ color: 'blue', fontSize: 18, marginLeft: 30 }}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
            {result.length != 0 ?
                isSearch == 0 ?
                    (
                        result.map((item, index) => {
                            return (
                                <View key={index} style={{ width: '100%', paddingVertical: 5, flexDirection: 'row' }}>
                                    <View style={{ justifyContent: 'center', marginLeft: 10, flex: 1 }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 17, fontWeight: '600' }}>{item.keyword}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    ) : (
                        result.map((item, index) => {
                            return (
                                <View key={index} style={{ width: '100%', paddingVertical: 5, flexDirection: 'row' }}>
                                    <Image source={
                                        !item.author ? require('../../assets/images/logo_facebook.png')
                                            : { uri: item.author.avatar.url }
                                    } style={{ width: 80, height: 80, borderRadius: 40, borderColor: "#dbdbdd", borderWidth: 1 }} />

                                    <View style={{ justifyContent: 'center', marginLeft: 10, flex: 1 }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 17, fontWeight: '600' }}>{item.author ? item.author.username : null}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    )
                :
                (<View>
                    <Text>Không có kết quả tìm kiếm</Text>
                </View>)}
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: 'white'
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    logoFacebook: {
        width: 50,
        height: 50
    },
    btnSignup: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 100
    },
    textSearch: {
        color: "black",
    },
    itemResult: {

    }
});

export default SearchScreen3;
