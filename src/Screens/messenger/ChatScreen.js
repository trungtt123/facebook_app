import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Touchable, TouchableOpacity, Image, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
//đây là mỗi phần tử tin nhắn, props gồm mess, avt, role(của ai)
function MessageItem(props) {
  const handleAddDialog = () => {
    socket.emit('client_add_dialog', {
      token: user.token,
      senderId: user.id,
      //id của người muốn nhắn
      targetUserId: '639315083fa4155480da25f0',
      content: 'Tin nhắn 3'
    })
  }
  const { user, socket } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    socket.emit('client_join_conversation', {
      // thisUserId, targetUserId, token
      token: user.token,
      thisUserId: user.id,
      //id của người muốn nhắn
      targetUserId: '639315083fa4155480da25f0'
    })
    socket.on('server_send_conversation', (data) => {
      console.log('server_send_conversation', data);
    })
  }, [])

  if (props.role == 0)
    return (
      <View style={[styles.messContainer, { alignSelf: "flex-start" }]}>

        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          source={{
            uri: props?.avt,
          }}
        />
        {/* //nội dung tin nhắn */}
        <View style={styles.messItemLeft}>
          <Text style={{ color: "#0b0b0b", fontSize: 17 }}>{props.mess}</Text>
        </View>
      </View>
    );
  else
    return (
      <View style={[styles.messContainer, { alignSelf: "flex-end" }]}>
        {/* //nội dung tin nhắn */}
        <View style={{ flexDirection: "row", alignSelf: "flex-end", width: "100%", alignItems: "flex-end", paddingRight: 12 }}>
          <View style={styles.messItemRight}>
            <Text style={{ color: "white", fontSize: 17 }}>{props.mess}</Text>
          </View>
          <Image
            style={{ width: 20, height: 20, borderRadius: 100 }}
            source={{
              uri: props?.avt,
            }}
          />
        </View>
      </View>
    );
}

export default class ChatScreen extends React.Component {
  render() {
    const avt = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjpbpY1XBGZRCPHLc5Rrb__Qb1g5XS1T6fgg&usqp=CAU";
    const time = "17 THG 12, 2022 LÚC 10:00";
    const name = "Nguyễn A";
    const info = "Đã học tại Đại học Back khoa Hà Nội";
    return (
      <View style={styles.container}>
        {/* thanh tim kiem */}
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={{
              fontSize: 17,
              backgroundColor: '#f1f2f4',
              marginTop: 0,
              height: 40,
              paddingRight: 10,
              paddingLeft: 10,
              borderRadius: 25
            }}
            placeholder=" Tìm kiếm trong cuộc trò chuyện "
            keyboardType="default"
          >
            <Ionicons style={{ border: 1, width: 20, marginTop: 2 }} name="search" size={20} color="grey" />
            <Text style={{ color: "grey" }}> Tìm kiếm trong cuộc trò chuyện </Text>
          </TextInput>
        </View>


        <ScrollView style={{ width: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <Image source={{ uri: avt }} style={{ width: 110, height: 110, borderRadius: 500, marginTop: 50 }} />
            <Text style={{ fontWeight: "bold", fontSize: 22, marginTop: 5 }}>{name}</Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>Các bạn là bạn bè trên Facebook</Text>
            <Text style={{ fontSize: 15, marginTop: 5, color: "grey" }}>{info}</Text>
            <Text style={{ fontSize: 15, marginTop: 35, color: "grey", marginBottom: 25 }}>{time}</Text>

            {/* tin nhan */}
            <MessageItem mess="Hello my friend" avt={this.props.av} role="0" />
            <MessageItem mess="Hello my friend" avt={avt} role="0" />
            <MessageItem mess="Hello my friend hh h hh h hhh hh hh h" avt={avt} role="1" />
            <MessageItem mess="Hello my friend" avt={this.props.av} role="0" />
            <MessageItem mess="Hello my friend" avt={avt} role="0" />
            <MessageItem mess="Hello my friend, hghg hgh  hg hgh h gh g ghghg h h g" avt={avt} role="0" />
          </View>
        </ScrollView>

        {/* thanh nhập tin nhắn */}
        <View style={styles.nhapTinNhan}>
          <AntDesign name="appstore1" size={24} color="#0099ff" style={{ marginLeft: 5 }} />
          <Entypo name="camera" size={24} color="#0099ff" style={{ marginLeft: 10 }} />
          <Entypo name="image" size={24} color="#0099ff" style={{ marginLeft: 10 }} />
          <Entypo name="mic" size={24} color="#0099ff" style={{ marginLeft: 10 }} />
          <TextInput
            style={{
              fontSize: 17,
              backgroundColor: '#f2f3f4',
              marginLeft: 10,
              height: 40,
              width: "50%",
              paddingRight: 10,
              paddingLeft: 10,
              borderRadius: 25
            }}
            placeholder=" Aa"
            keyboardType="default"
          ></TextInput>
          <AntDesign name="like1" size={24} color="#0099ff" style={{ marginLeft: 10 }} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  messContainer: {
    width: '80%',
    shadowColor: "#000",
    flexDirection: "row",
    marginTop: 3,
    alignItems: "flex-end"
  },
  messItemLeft: {
    borderRadius: 20,
    backgroundColor: '#f1f2f6',
    marginLeft: 5,
    marginRight: 30,
    marginBottom: 0,
    width: 'auto',
    padding: 10
  },
  messItemRight: {
    borderRadius: 20,
    backgroundColor: '#f1f2f6',
    marginRight: 2,
    marginBottom: 0,
    width: 'auto',
    padding: 10,
    backgroundColor: "#0099ff"
  },
  nhapTinNhan: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center"
  }

});
