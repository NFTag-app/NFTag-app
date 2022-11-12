import { usePlayers, useTags } from "client-sdk/dist/GameProvider";
import {
  FlatList,
  Image,
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

export const TagList = () => {
  const tags = useTags();
  const dims = useWindowDimensions();
  const players = usePlayers();

  const tagIds = tags
    ? [...tags.map((tag) => tag.id).reverse(), "LASTITEM"]
    : ["NOITEMS"];

  const renderItem = ({ item, index, separators }) => {
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
    const tag = tags.find((t) => t.id === item);
    if (tag?.image?.uri) {
      const text = `Key: ${tag.id}; Player: ${tag.player}; Target: ${tag.target}; Approved?: ${tag.approved?.approved}`;

      const ApprovalButton = () => {
        if (!tag.approved?.approved) {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: "#47f",
                padding: 10,
                margin: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Approve</Text>
            </TouchableOpacity>
          );
        }
        return undefined;
      };

      const size = newSize(
        290,
        dims.width * 0.9,
        tag.image.height,
        tag.image.width
      );

      const image = (
        <Image
          source={{
            uri: tag.image.uri,
            scale: 0.2,
            height: size.height,
            width: size.width,
          }}
          resizeMode="center"
          style={{}}
        />
      );

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
          {image}
        </View>
      );
    }
    return (
      <View style={CommonStyles.container}>
        <Text>Error</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={{ ...styles.container, paddingVertical: 20 }}
      data={tagIds}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
