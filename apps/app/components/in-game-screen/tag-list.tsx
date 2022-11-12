import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  useWindowDimensions
} from "react-native";
import { usePlayers, useTags } from "client-sdk/dist/GameProvider";
import { CommonStyles } from "../../styles/CommonStyles";


const newSize = (screenHeight, screenWidth, imageHeight, imageWidth) => {
  var maxWidth = screenWidth; // Max width for the image
  var maxHeight = screenHeight; // Max height for the image
  var ratio = 0;  // Used for aspect ratio

  // Check if the current width is larger than the max
  if (imageWidth > maxWidth){
      ratio = maxWidth / imageWidth;   // get ratio for scaling image
      return {
        width: maxWidth,
        height: imageHeight * ratio
      }
  } else {
      ratio = maxHeight / imageHeight;
      return {
        width: imageWidth * ratio,
        height: maxHeight
      }
  }
}

export const TagList = () => {
  const tags = useTags();
  const dims = useWindowDimensions();
  const players = usePlayers();

  console.log("tags", tags.map(t => t.image?.uri?.split('x')[0] ?? ''));

  const tagIds = tags
    ? [...tags.map((tag) => tag.id), "LASTITEM"]
    : ["NOITEMS"];

  console.log("xxxxxxxxxxxxxxxxxxxxxx", tagIds);

  const renderItem = ({ item, index, separators }) => {
    console.log("renderItem", item);
    if (item === "LASTITEM") {
      return (
        <View style={CommonStyles.container}>
          <Text>Go get a tag!!!</Text>
        </View>
      );
    }
    if (item === "NOITEMS") {
      return (
        <View style={CommonStyles.container}>
          <Text>NO TAGS YET!!!</Text>
        </View>
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

      const size = newSize(dims.height, dims.width, tag.image.height, tag.image.width);

      const image = (
        <Image 
          source={{ uri: tag.image.uri, scale: .2, height: size.height, width: size.width }}
          style={{ borderWidth: 3, borderColor: 'red', backgroundColor: 'green'}}
        />
      );

      const targetName = players![tag.target].name;
      const targetImage = players![tag.target].name;

      return (
        <View style={CommonStyles.container}>
          <Text>{`${targetName} was TAGGED!?!`}</Text>
          <View style={{
            flexDirection: 'row',
            flex: 1
          }}>
            {image}
            <Image
              source={{uri: targetImage, height: size.height, width: size.width }}
              style={{ borderWidth: 3, borderColor: 'red', backgroundColor: 'green'}}
              />
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

  return (
    <FlatList style={styles.container} data={tagIds} renderItem={renderItem} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
