import React, { useEffect, useState, memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View, Image, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {
    _getCache,
    _setCache
} from '../Services/Helper/common';
import { Entypo, FontAwesome } from '@expo/vector-icons';
function NotificationScreen() {
    const { userList, isLoading } = useSelector(
        (state) => state.user
    );
    const data = [
        {
            avatar: "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/326583152_902112824250984_692745827693874110_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gME9536_8cMAX_0Y32v&_nc_ht=scontent.fhan5-11.fna&oh=00_AfCqM6kDrleHdjdoDvD_F-kcPdEzxkDIZjXM3_Gx4MJ7ew&oe=63E42637",
            name: "Huy Ngô",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Hello =))",
            time: "7 thg 1 lúc 22:27",
            backgroundColor: 'rgb(231,243,255)',
            index: 0
        },
        {
            avatar: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/322701278_2401550226659188_1575951535487307101_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Rxjdj-puo94AX_3KfF5&_nc_ht=scontent.fhan5-3.fna&oh=00_AfBaUK6ZQdITrGj9jfutjcugf7AZiUO8Lm8Jl9DViULVkw&oe=63E52787",
            name: "Official Real Madrid Fan Club in Vietnam",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Siuuuuuuuu",
            time: "6 thg 1 lúc 20:35",
            backgroundColor: 'white',
            index: 1
        },
        {
            avatar: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/322401621_510451461184116_1895790034957101620_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=t2P6voqGJ6AAX_-RaRn&_nc_ht=scontent.fhan5-3.fna&oh=00_AfDWuR8hNB9nMyxPuD24G6dsoPOpM0kO0TVPKK-DnBo2Iw&oe=63E52599",
            name: "Troll Bóng Đá",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Fan cứng",
            time: "1 thg 1 lúc 21:27",
            backgroundColor: 'white',
            index: 2
        },
        {
            avatar: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/239059233_164784659035936_9178630666960323564_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=QdV8hZEuQBgAX_SeBlo&_nc_ht=scontent.fhan5-3.fna&oh=00_AfC6ah0d6bcVaWCzLPR9FBy9aUlFqLsnn7bDR4PoAX-CRg&oe=63E4C27D",
            name: "PSG Việt Nam",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Hello =))",
            time: "7 thg 1 lúc 22:27",
            backgroundColor: 'rgb(231,243,255)',
            index: 3
        },
        {
            avatar: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/273693895_331942232280719_8475914674294484425_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=eY2EthmathgAX88FltW&_nc_ht=scontent.fhan5-3.fna&oh=00_AfB3uJuWL2NV5JTIj_w_LFBz5Ejk67mR-yfZBeStJ7q8mg&oe=63E3E395",
            name: "Barca Việt Nam",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Hello =))",
            time: "7 thg 1 lúc 22:27",
            backgroundColor: 'white',
            index: 4
        },
        {
            avatar: "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/324939972_1153549792012913_2127451858925811607_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=hHaUOabF4S0AX8OVzuz&tn=1MkzV0yKTxxJLrMG&_nc_ht=scontent.fhan5-11.fna&oh=00_AfAtxu-IDUZ53rTEXOnhEoDqnJ_HxzmtfeDQrXNXtvAFgg&oe=63E45870",
            name: "Manchester City Việt Nam",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Hello =))",
            time: "20 thg 12 lúc 22:27",
            backgroundColor: 'rgb(231,243,255)',
            index: 5
        },
        {
            avatar: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/326332640_875497347029829_1851610191909310679_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PXR1omtMLpoAX965kL_&_nc_ht=scontent.fhan5-3.fna&oh=00_AfAlvpJ8MpwGyZ_1GV5bdp1IWTWCKdIF1XomRAi4f-vaNg&oe=63E4E6A2",
            name: "Trung tâm Tin tức VTV24",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Hello =))",
            time: "30 thg 12 lúc 22:27",
            backgroundColor: 'white',
            index: 6
        },
        {
            avatar: "https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/199385759_345470910277839_3988273979229903886_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JGOg_uhh8YIAX-faxhl&_nc_ht=scontent.fhan5-3.fna&oh=00_AfBqPlelPyB2lYtAGL89nLfQc_vcvq4XRRDYP2C9gHyDrw&oe=64073DCF",
            name: "Leo Messi",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Hello =))",
            time: "7 thg 1 lúc 22:27",
            backgroundColor: 'rgb(231,243,255)',
            index: 7
        },
        {
            avatar: "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/326583152_902112824250984_692745827693874110_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gME9536_8cMAX_0Y32v&_nc_ht=scontent.fhan5-11.fna&oh=00_AfCqM6kDrleHdjdoDvD_F-kcPdEzxkDIZjXM3_Gx4MJ7ew&oe=63E42637",
            name: "Huy Ngô",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Hello =))",
            time: "7 thg 1 lúc 22:27",
            backgroundColor: 'white',
            index: 8
        },
        {
            avatar: "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/326583152_902112824250984_692745827693874110_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gME9536_8cMAX_0Y32v&_nc_ht=scontent.fhan5-11.fna&oh=00_AfCqM6kDrleHdjdoDvD_F-kcPdEzxkDIZjXM3_Gx4MJ7ew&oe=63E42637",
            name: "Huy Ngô",
            text: "đã bày tỏ cảm xúc về bài viết của bạn: Hello =))",
            time: "7 thg 1 lúc 22:27",
            backgroundColor: 'rgb(231,243,255)',
            index: 9
        },
    ];
    useEffect(() => {
    }, []);
    return (
        <View>
            <FlatList data={data}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    if (item.index === 0) {
                        return (
                            <>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 90, padding: 20}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Thông báo</Text>
                                <View style={{backgroundColor: '#DCDCDC', borderRadius: 30, width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                                <FontAwesome name="search" size={22} color="black" />
                                </View>
                            </View>
                                <TouchableOpacity>
                                <View style={{ flexDirection: 'row', height: 90, justifyContent: 'space-between', backgroundColor: item.backgroundColor }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                        <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }}></Image>
                                        <View style={{ flexDirection: 'column', width: 270, marginLeft: 10 }}>
                                            <Text>
                                                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                                <Text>{" " + item.text}</Text>
                                            </Text>
                                            <Text style={{ color: 'gray' }}>{item.time}</Text>
                                        </View>

                                    </View>
                                    <Entypo name="dots-three-horizontal" size={18} color="black" style={{ marginRight: 15, marginTop: 17 }} />
                                </View>
                                </TouchableOpacity>
                            </>
                        );
                    }
                    return (
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', height: 90, justifyContent: 'space-between', backgroundColor: item.backgroundColor }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }}></Image>
                                <View style={{ flexDirection: 'column', width: 270, marginLeft: 10 }}>
                                    <Text>
                                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                        <Text>{" " + item.text}</Text>
                                    </Text>
                                    <Text style={{ color: 'gray' }}>{item.time}</Text>
                                </View>

                            </View>
                            <Entypo name="dots-three-horizontal" size={18} color="black" style={{ marginRight: 15, marginTop: 17 }} />
                        </View>
                        </TouchableOpacity>
                    );
                }}>

            </FlatList>
        </View>
    );
}


export default memo(NotificationScreen);
