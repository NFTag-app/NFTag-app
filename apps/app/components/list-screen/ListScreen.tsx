import { FlatList, View, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../../styles/CommonStyles";

export const ListScreen = ({ data, listItemStyle, renderInnerItem }) => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

  const renderItem = ({ item, index, separators }) => {
    const rendered = renderInnerItem(item, index, separators);
    return <View style={CommonStyles.screenListItem}>{rendered}</View>;
  };

  if (data) {
    return (
      <FlatList
        style={CommonStyles.screenList}
        data={data}
        renderItem={renderItem}
      />
    );
  }
  return (
    <View style={CommonStyles.container}>
      <Text>Loading ..... </Text>
    </View>
  );
};
