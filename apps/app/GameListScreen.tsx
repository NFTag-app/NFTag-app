import { FlatList, View, Text, StyleSheet } from "react-native";
import { Game } from "client-sdk/dist/types";
import { useGames } from "client-sdk";

export const GameListScreen = () => {
    const games: Game[] = useGames();

    const renderItem = ({ item, index, separators }) => (
        <View style={{height: 200}}>
        <Text>
            Key: {item.id} Name: {item.name}
        </Text>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={games}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
