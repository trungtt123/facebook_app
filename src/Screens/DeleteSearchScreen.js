import { View, Button, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import axios from '../setups/custom_axios';
import { MaterialIcons } from '@expo/vector-icons';

function DeleteSearchScreen({ navigation }) {
    const [result, setResult] = useState([])
    const [clear, setClear] = useState(false)
    const handleClear = () => {
        setClear(true);
        setKeyword('');
    }

    useEffect(() => {
        axios.post(`/search/get_saved_search?index=0&count=20`)
            .then(res => {
                setResult(res.data)
            })
            .catch(error => {
                setResult([])
            })
    }, [])
    console.log(result)


    return (
        <View style={styles.container}>
            {(result.length != 0 && result.length != undefined) ?
                (
                    result.map((item, index) => {
                        console.log("res", index, item)
                        return (
                            <View key={index} style={{ width: '100%', paddingVertical: 5, flexDirection: 'row' }}>
                                <Image source={
                                    require('../../assets/images/logo_facebook.png')
                                } style={{ width: 80, height: 80, borderRadius: 40, borderColor: "#dbdbdd", borderWidth: 1 }} />

                                <View style={{ justifyContent: 'center', marginLeft: 10, flex: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'column' }}>
                                            <Text style={{ fontSize: 17, fontWeight: '600' }}>Bạn đã tìm kiếm trên Facebook </Text>
                                            <Text style={{ fontSize: 17, fontWeight: '600' }}>"{item.keyword}"</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleClear()}>
                                            <MaterialIcons name="clear" size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                ) : (<View>
                    <Text>Không có kết quả tìm kiếm</Text>
                </View>

                )}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: 'dark'
    }
})

export default DeleteSearchScreen