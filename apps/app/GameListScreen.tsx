import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Game } from "client-sdk/dist/types";
import { useGames } from "client-sdk";
import { CommonStyles } from "./styles/CommonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

type InGameScreenProps = NativeStackNavigationProp<RootStackParamList, "InGameScreen">;
export const GameListScreen = () => {
    const games: Game[] = useGames();
    const navigation = useNavigation<InGameScreenProps>()

    const renderItem = ({ item, index, separators }) => (
        <View>
        <TouchableOpacity onPress={() => navigation.navigate(item.id)} style={{backgroundColor: 'green', padding: 20}}>
            <Text style={CommonStyles.text}>
                Key: {item.id} Name: {item.name}
            </Text>
        </TouchableOpacity>
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
  },
});
