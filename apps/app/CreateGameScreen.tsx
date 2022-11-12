import { createGame, useUser } from "client-sdk";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
  Share
} from "react-native";
import { CommonStyles } from "./styles/CommonStyles"; //https://www.nftag.app/invite.html?from=owner&game=000000

const CreateGameScreen = ({navigation: {navigate}}) => {
  const owner = useUser()
  const dims = useWindowDimensions();
  const [gameId, setGameId] = useState('')

  useEffect(() => {
    (async () => {
      if(!gameId) {
        const id = await createGame(owner + "'s Game", owner)
        await setGameId(id)
      }
    })()
  }, [])

  const share = async () => {
    console.log(0)
    try {
      const res = await Share.share({
        message: 'Join my NFTag game and have fun with crypto!\nhttps://www.nftag.app/invite.html?from=' + owner.displayName.split(' ')[0] + '&game=' + gameId
      })
      if(res.action === Share.sharedAction) {
        if(res.activityType) {
          console.log(1)
          // shared with activity type of res.activityType
        } else {
          console.log(2)
          // shared
        }
      } else if (res.action === Share.dismissedAction) {
        console.log(3)
        // dismissed
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={{ ...CommonStyles.container }}>
      <ImageBackground
        source={require("./assets/Icons/1x/loginbg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: dims.width,
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: -50,
            borderRadius: 8,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: dims.width * 0.8,
            height: dims.height * 0.45,
            backgroundColor: "#25262b",
          }}
        >
          <Image
            source={require("./assets/Icons/1x/plus.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text
            style={{
              color: "white",
              marginBottom: 10,
              fontSize: Math.floor(dims.width / 10),
            }}
          >
            {gameId || '000000'}
          </Text>
          <TouchableOpacity
            onPress={share}
            style={{
              backgroundColor: "#704ddb",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: Math.floor(dims.width / 16),
              }}
            >
              Share Link
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CreateGameScreen;

const styles = StyleSheet.create({});
