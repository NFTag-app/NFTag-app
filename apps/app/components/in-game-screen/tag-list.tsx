import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType
} from "react-native";
import { useTags } from "client-sdk/dist/GameProvider";
import { CommonStyles } from "../../styles/CommonStyles";

export const TagList = () => {
  const tags = useTags();
  console.log("tags", tags.map(t => t.image && t.image.uri.split('x')[0]));

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
    if (tag) {
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

      const image = tag.image ? (
        <Image 
          source={{ uri: tag.image.uri }}
          style={{ width: tag.image.width / 2, height: tag.image.height / 2, borderWidth: 3, borderColor: 'red', backgroundColor: 'green'}}
        />
      ) : undefined;

      return (
        <View style={CommonStyles.container}>
          {image}
          <Text>{text}</Text>
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
