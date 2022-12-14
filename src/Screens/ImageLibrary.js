import React, { useState,useEffect } from "react";
import { Text,View, } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { PermissionsAndroid, Platform,SafeAreaView,
    ScrollView,
    TouchableOpacity,Button,Image, } from "react-native";
import SwipeUpDown from "react-native-swipe-up-down";


export default function ImageLibrary(){
    const [nodes, setNodes] = useState([]);
    const [detailViewVisible, setDetailViewVisibility] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    useEffect(() => {
        checkPermission()
          .then(() => {
            getPhotos()
          })
      }, [])
    const checkPermission = async () => {
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    
        if (hasPermission) {
          return true;
        }
    
        const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
          title: "Image gallery app permissions",
          message: "Image gallery needs your permission to access your photos",
          buttonPositive: "OK",
        })
    
        return status === 'granted';
      }
    
      const getPhotos = async () => {
        const photos = await CameraRoll.getPhotos({
          first: 10
        })
    
        setNodes(photos.edges.map(edge => edge.node))
      }
    
   
    return (
        <SafeAreaView>
      <ScrollView>
        {
          detailViewVisible
          ? (
            <SwipeUpDown
              loop={false}
              index={selectedIndex}
            >
              {
                nodes.map(
                  (node, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#333',
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          flex: 1,
                        }}
                        resizeMode="contain"
                        source={{
                          uri: node.image.uri
                        }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 60
                        }}
                      >
                        <Button
                          title="Close"
                          onPress={() => {
                            setDetailViewVisibility(false)
                          }}
                        />
                      </View>
                    </View>
                  )
                )
              }
            </SwipeUpDown>
          )
          : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {
                nodes.map(
                  (node, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        height: 100,
                        minWidth: 100,
                        flex: 1
                      }}
                      onPress={() => {
                        setDetailViewVisibility(true)
                        setSelectedIndex(index)
                      }}
                    >
                      <Image
                        style={{
                          height: 100,
                          minWidth: 100,
                          flex: 1
                        }}
                        source={{
                          uri: node.image.uri
                        }}
                      />
                    </TouchableOpacity>
                  )
                )
              }
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
    );
    
    
}