import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    firstView: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#ffffff',
        height: height*0.62
    },
    coverImage: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: height*0.3,
        // width: width,
        resizeMode: 'cover'
    },
    avatar: {
        marginTop: height*0.3 - width*0.2,
        position: 'absolute',
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImg: {
        width: width*40/100,
        height: width*40/100,
        borderRadius: width*40/100
    },
    name: {
        marginTop: height*0.01,
        fontWeight: 'bold',
        fontSize: 30
    },
    addNews: {
        borderRadius: 5,
        backgroundColor: '#2374E1',
        height: height*0.05,
        alignItems: 'center',
        justifyContent: 'center',
        width: width*0.9,
        flexDirection: 'row',
        marginTop: height*0.02,
        marginBottom: height*0.01
    },
    addNewsText: {
        fontSize: 20,
        color: '#ffffff',
        paddingStart: width*0.02,
        fontWeight: '500'
    },
    edit: {
        // flexDirection:' row',
        width: width*0.9
    },
    editInfor: {
        flex: 10,
        backgroundColor: '#E4E6EB',
        height: height*0.05,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5
    },
    editText: {
        fontSize: 18,
        color: '#000000',
        paddingStart: width*0.02,
        fontWeight: '500'
    },
    setting: {
        flex: 2,
        height: height*0.05,
        backgroundColor: '#E4E6EB',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: width*0.02
    },

    secondView: {
        marginTop: height*0.02,
        paddingHorizontal: 10,
        height: 0.5*height,
        backgroundColor: '#FFFFFF',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: height*0.02
    },
    rowInfor: {
        marginTop: height*0.02,
        flexDirection: 'row',
    },
    icon: {
        size: 20,
    },
    hardTextAddress: {
        fontSize: 18,
        marginStart: width*0.03
    },
    hardTextCountry: {
        fontSize: 18,
        marginStart: width*0.045
    },
    data: {
        fontSize: 18,
        fontWeight: 'bold',
        marginStart: 4,
        numberOfLines: 1,
    },
    editPublicInfor: {
        borderRadius: 5,
        backgroundColor: Colors.blue100,
        height: height*0.05,
        marginTop: 0.02*height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textEditPublic: {
        fontSize: 16,
        color: 'blue'
    },
    thirdView: {
        marginTop: height*0.02,
        paddingHorizontal: 10,
        height: 150,
        backgroundColor: '#FFFFFF',
    },
    titleThird: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0.03*height
    },
    thinking: {
        marginTop: 0.03*height,
        flexDirection: 'row',
        height: 0.12*width
    },
    postImage: {
        height: 0.12*width,
        width: 0.12*width,
        borderRadius: 0.12*width
    },
    thinkText: {
        fontSize:18,
        marginStart: 0.03*width,
        marginTop: 0.03*width
    },
    imageIcon: {
        marginTop: 0.04*width,
        marginStart: 0.4*width
    }

})