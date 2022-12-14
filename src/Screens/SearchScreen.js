import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import axios from '../setups/custom_axios';
function SearchScreen({ navigation }) {
    const { user, isLoading } = useSelector(
        (state) => state.auth
    );
    const [result, setResult] = useState([])
    const [isSearch, setIsSearch] = useState(0)
    const handleSearch = (keyword) => {
        setIsSearch(1);
        axios.post(`/search/search?index=0&count=20&keyword=${keyword}`)
            .then(res => {
                setResult(res.data)
                // setResult(res)
            })
            .catch(error => {
                setResult([]);
            })
    }

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
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TextInput
                    style={styles.textSearch}
                    placeholder="Tìm kiếm"
                    value={textSearch}
                    onFocus={() => getSavedSearch()}
                    onChangeText={e => getSavedSearch(e)
                    }
                />
            ),
            headerStyle: {
                backgroundColor: 'white', //Set Header color
            },
        });
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: "bold" }}>Tìm kiếm gần đây</Text>
                <Text style={{ color: 'blue', fontSize: 18, marginLeft: 140 }}>Chỉnh sửa</Text>
            </View>
            {result.length != 0 ?
                isSearch == 0 ?
                    (
                        result.map((item, index) => {
                            return (
                                <View key={index} styles={styles.itemResult}>
                                    <Text>{item.keyword}</Text>
                                </View>
                            )
                        })
                    ) : (
                        result.map((item, index) => {
                            return (
                                <View key={index} styles={styles.itemResult}>
                                    <Text></Text>
                                </View>
                            )
                        })
                    )
                :
                (<View>
                    <Text>Không có kết quả tìm kiếm</Text>
                </View>)}
        </View>
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

export default SearchScreen;
