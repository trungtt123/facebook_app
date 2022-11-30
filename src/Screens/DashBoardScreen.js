import { Text, View, Button, StyleSheet, ScrollView, TextInput, TouchableOpacity, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import { deepCopy, onlyNumber, _getCache, _setCache } from "../Services/Helper/common";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import { Feather, Fontisto, Entypo, FontAwesome, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import HomeScreen from "./HomeScreen";
import VideoScreen from "./VideoScreen";
import NotificationScreen from "./NotificationScreen";
import MenuScreen from "./MenuScreen";
export default function DashBoardScreen({ navigation }) {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'home', index: 0 },
        { key: 'second', title: 'watch', index: 1 },
        { key: 'three', title: 'marketplace', index: 2 },
        { key: 'four', title: 'love', index: 3 },
        { key: 'five', title: 'notification', index: 4 },
        { key: 'six', title: 'me', index: 5 }
    ]);
    const ThreeRoute = () => (
        <Text>Three</Text>
    );
    const FourRoute = () => (
        <Text>Four</Text>
    );
    const renderScene = SceneMap({
        first: HomeScreen,
        second: VideoScreen,
        three: ThreeRoute,
        four: FourRoute,
        five: NotificationScreen,
        six: MenuScreen
    })
    return <>
        <View style={styles.header}>
            <Text style={styles.textLogoFacebook}>facebook</Text>
            <View style={styles.viewBtnRight}>
                <Fontisto onPress={() => navigation.navigate('createPost')}
                style={styles.btnRight} name="plus-a" size={20} color="black" />
                <FontAwesome onPress={() => navigation.navigate('search')}
                style={styles.btnRight} name="search" size={22} color="black" />
                <Fontisto onPress={() => navigation.navigate('message')}
                style={styles.btnRight} name="messenger" size={22} color="black" />
            </View>
        </View>
        <TabView
            springConfig
            lazy={true}
            renderTabBar={props => <TabBar {...props}
                indicatorStyle={{ backgroundColor: '#1d6ed9', height: 2 }}
                style={{ backgroundColor: 'white', minHeight: 30, padding: 0 }} // here
                renderLabel={({ route, focused, color }) => {
                    return <View style={{ color: 'black', margin: 5 }}>
                        {
                            route.key == 'first' ? <Ionicons color={index === 0 ? '#1d6ed9' : 'black'} name={index === 0 ? 'home' : 'home-outline'} size={25} />
                                : route.key == 'second' ? <Ionicons color={index === 1 ? '#1d6ed9' : 'black'} style={styles.menuItem} name={index === 1 ? 'tv' : 'tv-outline'} size={25} />
                                    : route.key == 'three' ? <Ionicons color={index === 2 ? '#1d6ed9' : 'black'} style={styles.menuItem} name={index === 2 ? 'bookmark' : 'bookmark-outline'} size={25} />
                                        : route.key == 'four' ? <Ionicons color={index === 3 ? '#1d6ed9' : 'black'} style={styles.menuItem} name={index === 3 ? 'md-heart' : 'md-heart-outline'} size={25} />
                                            : route.key == 'five' ? <FontAwesome color={index === 4 ? '#1d6ed9' : 'black'} style={styles.menuItem} name={index === 4 ? 'bell' : 'bell-o'} size={22} />
                                                : <Ionicons color={index === 5 ? '#1d6ed9' : 'black'} style={styles.menuItem} name={index === 5 ? 'person' : 'person-outline'} size={25} />
                        }
                    </View>

                }} />}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    </>
}
const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 30,
        flexDirection: "row",
        backgroundColor: 'white'
    },
    viewBtnRight: {
        flexDirection: "row",
        marginTop: 5
    },
    btnRight: {
        backgroundColor: '#f1f2f4',
        padding: 5,
        borderRadius: 20,
        marginLeft: 10
    },
    textLogoFacebook: {
        fontSize: 27,
        color: '#1c7bfc',
        fontWeight: 'bold'
    },
    menuItem: {
        // color: '#636363'
    }
});