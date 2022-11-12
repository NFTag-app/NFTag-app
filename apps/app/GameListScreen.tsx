import { useGames } from "client-sdk";
import { Game } from "client-sdk/dist/types";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CommonStyles } from "./styles/CommonStyles";

export const GameListScreen = ({ navigation: { navigate } }) => {
  const games: Game[] = useGames();

  const renderItem = ({ item, index, separators }) => (
    <View>
      <TouchableOpacity
        onPress={() => navigate("GameNavigatorScreen", { gameId: item.id })}
        style={{ backgroundColor: "green", padding: 20 }}
      >
        <Text style={CommonStyles.text}>
          Key: {item.id} Name: {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      style={{ ...styles.container, backgroundColor: "#001220" }}
      data={games}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
