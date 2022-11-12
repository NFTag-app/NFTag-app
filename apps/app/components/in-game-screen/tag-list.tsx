import { FlatList, View, Text, StyleSheet } from "react-native";
import { useTags } from "client-sdk/dist/GameProvider";

export const TagList = () => {
  const tags = useTags();

  const renderItem = ({ item, index, separators }) => {
    const tag = tags[item];
    if (tag) {
      return (
        <View style={{ height: 200 }}>
          <Text>
            Key: {item.id} Name: {item.name}
          </Text>
        </View>
      );
    }
    return (
      <View style={{ height: 200 }}>
        <Text>No Tags captured yet. Get tagging!</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={Object.keys(tags)}
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
