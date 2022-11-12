import { FlatList, View, Text, StyleSheet } from "react-native";
import { useGame, useTags } from "client-sdk/dist/GameProvider";
import { CommonStyles } from "../../styles/CommonStyles";

export const TagList = () => {
  const tags = useTags();
  console.log("tags", tags);

  const tagIds = tags ? [
    ...tags.map(tag => tag),
    'LASTITEM'
  ] : ['NOITEMS']

  const renderItem = ({ item, index, separators }) => {
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
    const tag = tags[item];
    if (tag) {
      const text = `Key: ${tag.id}; Player: ${tag.player}; Target: ${tag.target}; Approved?: ${tag.approved?.approved}`;
      return (
        <View style={{ height: 200 }}>
          <Text>{text}</Text>
        </View>
      );
    }
    return undefined;
  };

  return (
    <FlatList
      style={styles.container}
      data={tagIds}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
