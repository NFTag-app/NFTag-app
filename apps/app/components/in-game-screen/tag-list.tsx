import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGame, usePlayers, useTags } from "client-sdk/dist/GameProvider";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonStyles } from "../../styles/CommonStyles";

const newSize = (screenHeight, screenWidth, imageHeight, imageWidth) => {
  var maxWidth = screenWidth; // Max width for the image
  var maxHeight = screenHeight; // Max height for the image
  var ratio = 0; // Used for aspect ratio

  // Check if the current width is larger than the max
  if (imageWidth > maxWidth) {
    ratio = maxWidth / imageWidth; // get ratio for scaling image
    return {
      width: maxWidth,
      height: imageHeight * ratio,
    };
  } else {
    ratio = maxHeight / imageHeight;
    return {
      width: imageWidth * ratio,
      height: maxHeight,
    };
  }
};

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setLiked(!liked)}
      style={{
        backgroundColor: liked ? "#1a1b1e" : "#25262b",
        borderRadius: 8,
        padding: 10,
        marginLeft: 5,
      }}
    >
      <FontAwesome
        name="heart"
        size={24}
        color={liked ? "#ff0000" : "#7d7d7d"}
      />
    </TouchableOpacity>
  );
};

export const TagList = () => {
  const tags = useTags();
  const dims = useWindowDimensions();
  const players = usePlayers();
  const game = useGame();

  let tagIds = tags
    ? [...tags.map((tag) => tag.id).reverse(), "LASTITEM"]
    : ["NOITEMS"];

  if (game.winner) {
    tagIds.reverse();
    tagIds.push("WINNER");
    tagIds.reverse();
  }

  const RenderItem = ({ item, index, separators }) => {
    const tag = tags.find((t) => t.id === item);
    const size = newSize(
      290,
      dims.width * 0.9,
      tag?.image.height,
      tag?.image.width
    );

    const size2 = newSize(
      dims.height,
      dims.width,
      tag?.image.height,
      tag?.image.width
    );

    const ImageFullscreen: React.FC<{
      uri?: string;
    }> = ({ uri }) => {
      const [fullscreen, setFullscreen] = useState(false);

      return (
        <>
          <TouchableOpacity onPress={() => setFullscreen(true)}>
            <Image
              source={{
                uri: uri ?? tag?.image.uri,
                scale: 0.2,
                height: size.height,
                width: size.width,
              }}
            />
          </TouchableOpacity>
          <Modal
            visible={fullscreen}
            transparent={true}
            onRequestClose={() => setFullscreen(false)}
            onDismiss={() => setFullscreen(false)}
            presentationStyle="fullScreen"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() => setFullscreen(false)}
            >
              <Image
                resizeMode="contain"
                source={{
                  uri: tag?.image.uri,
                  scale: 0.2,
                  height: size2.height,
                  width: size2.width,
                }}
                style={{
                  flex: 1,
                  padding: 50,
                }}
              />
            </TouchableOpacity>
          </Modal>
        </>
      );
    };

    if (item === "WINNER") {
      return (
        <View
          style={{
            ...CommonStyles.container,
            width: dims.width * 0.9,
            height: 350,
            backgroundColor: "#25262b",
            borderColor: "#1a1b1e",
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              width: dims.width * 0.9,
              height: 60,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
              borderBottomColor: "#7d7d7d",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={{
                  uri: players[game.winner].image.uri,
                }}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 10,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#7d7d7d",
                }}
              />
              <Text
                style={{
                  color: "#C1C2C5",
                  fontWeight: "600",
                  fontSize: 18,
                  paddingVertical: 20,
                }}
              >
                {players[game.winner].name} won the game!
              </Text>
            </View>
          </View>
          <View
            style={{
              width: dims.width * 0.9,
              height: 240,
              overflow: "hidden",
            }}
          >
            <ImageFullscreen uri={players[game.winner].image.uri} />
          </View>
          <View
            style={{
              height: 50,
              width: dims.width * 0.9,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <LikeButton />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            ></View>
          </View>
        </View>
      );
    }
    if (item === "NOITEMS" || item === "LASTITEM") {
      return (
        <SafeAreaView
          style={{
            backgroundColor: "transparent",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            {item === "NOITEMS"
              ? "Nothing here yet..."
              : "You've reached the end..."}
          </Text>
          <Image
            resizeMode="center"
            source={require("../../assets/Icons/1x/searching.png")}
            style={{
              width: 250,
              height: 250,
              alignSelf: "center",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          />
        </SafeAreaView>
      );
    }

    if (tag?.image?.uri) {
      const text = `Key: ${tag.id}; Player: ${tag.player}; Target: ${tag.target}; Approved?: ${tag.approved?.approved}`;

      const targetName = players![tag.target].name;
      const targetImage = players![tag.target].name;

      return (
        <View
          style={{
            ...CommonStyles.container,
            width: dims.width * 0.9,
            height: 350,
            backgroundColor: "#25262b",
            borderColor: "#1a1b1e",
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              width: dims.width * 0.9,
              height: 60,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
              borderBottomColor: "#7d7d7d",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={{
                  uri: players[tag.player].image.uri,
                }}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 10,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#7d7d7d",
                }}
              />
              <Text
                style={{
                  color: "#C1C2C5",
                  fontWeight: "600",
                  fontSize: 18,
                  paddingVertical: 20,
                }}
              >
                {players[tag.player].name}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
                color: "#7d7d7d",
              }}
            >
              {new Date(tag.timestamp).toLocaleString()}
            </Text>
          </View>
          <View
            style={{
              width: dims.width * 0.9,
              height: 240,
              overflow: "hidden",
            }}
          >
            <ImageFullscreen />
          </View>
          <View
            style={{
              height: 50,
              width: dims.width * 0.9,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <LikeButton />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* <ApprovalButton />
              <ApprovalButton /> */}
              {/* <RejectionButton /> */}
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={CommonStyles.container}>
        <Text>Error</Text>
      </View>
    );
  };

  console.log(tagIds)

  return (
    <FlatList
      style={{ ...styles.container, paddingVertical: 20 }}
      data={tagIds}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      renderItem={RenderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
