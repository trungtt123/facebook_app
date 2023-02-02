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
function SearchScreen({ navigation }) {
    const { user, isLoading } = useSelector(
        (state) => state.auth
    );

    const [keyword, setKeyword] = useState("")
    const getCacheSearchList = async () => {
        try {
            let list = JSON.parse(await _getCache("cacheSearchList"));
            if (list === null || list === undefined || list === "") list = [];
            return list;
          }
          catch(e){
            console.log(e);
          }
    }
    const keywordListOrgin=getCacheSearchList
    const [keywordList, setKeywordList] = useState(keywordListOrgin)
    



    const handleSearch = () => {
        saveCacheSearch(keyword);
        keywordListOrgin = getCacheSearchList();
        setKeywordList(keywordListOrgin);
    }


    const handleChangeText = (e) => {
        tmp = keywordListOrgin.filter((keyword, e) => keyword.contains(e))
        setKeywordList(tmp)
    }
    
    const saveCacheSearch = async (keyword) => {
        try {
          console.log(keyword);
          let list = JSON.parse(await _getCache("cacheSearchList"));
          if (list === null || list === undefined || list === "") list = [];
          let index = list.indexOf(keyword);
          if (index === -1) list.push(keyword);
          else {
            list[index] = keyword;
          }
          // remove cache
          // await _setCache("ketwordList", "");
          await _setCache("cacheSearchList", JSON.stringify(list));
        }
        catch (e) {
          console.log(e);
        }
      }

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <TextInput
                        // style={styles.textSearch}
                        placeholder="Tìm kiếm"
                        value={keyword}
                        onFocus={() => getCacheSearchList()}
                        onChangeText={e => handleChangeText(e)}
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
                {   
                    keywordList.length!=0 
                    ?(keywordList.map((item, index) => {
                            return (
                                <View key={index} style={{ width: '100%', paddingVertical: 5, flexDirection: 'row' }}>
                                    <View style={{ justifyContent: 'center', marginLeft: 10, flex: 1 }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 17, fontWeight: '600' }}>{item}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    ):(<View><Text>Không có kết quả tìm kiếm</Text></View>)
                    }
            </View>
            
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

export default SearchScreen;