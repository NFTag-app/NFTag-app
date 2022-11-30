import { useNavigation } from "@react-navigation/native";
import { createGame, signOut, useGames, useUser } from "client-sdk";
import { Game } from "client-sdk/dist/types";
// import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
} from "react-native";
// import { FloatingAction, IActionProps } from "react-native-floating-action";
import { RootNavigationProps } from "../components/navigation/NavigationParams";
import { Constants } from "../components/navigation/Styles";
import { CommonStyles } from "../styles/CommonStyles";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { useState } from "react";

export const GameListScreen = ({ navigation }) => {
  const rootNavigation = useNavigation<RootNavigationProps>();
  const games: Game[] = useGames();
  const dims = useWindowDimensions();
  const user = useUser();

  const renderItem = ({ item, index, separators }) => {
    if (item === "START") {
      return <View style={{ height: 5 }} />; // extra starting space
    }
    if (item === "END") {
      return (
        <View style={{ height: 5 }} /> // extra ending space
      );
    }
    return (
      <View
        style={{
          backgroundColor: "#25262b",
          borderColor: "#1a1b1e",
          borderWidth: 2,
          borderRadius: 8,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            rootNavigation.navigate("GameRoot", {
              screen: "FeedScreen",
              params: undefined,
              gameId: item.id,
            })
          }
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...CommonStyles.text, color: "#C1C2C5" }}>
            {item?.name}
          </Text>
          <Text
            style={{ ...CommonStyles.text, color: "#7d7d7d", fontSize: 15 }}
          >
            {item?.players && Object.keys(item.players).length} Players
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressItem = (item: string) => {
    const action = actions.find((x) => x.name === item);
    // console.log("pressed item", action);
    if (action.condition()) {
      return action?.action()?.catch((err) => console.warn(err));
    }
  };

  interface IActionPropsExtended extends IActionProps {
    condition: () => boolean;
    action: () => Promise<void>;
    buttonSize: number;
  }

  const actions: IActionPropsExtended[] = [
    {
      text: "Create Game",
      icon: (
        <Image
          source={require("../assets/Icons/1x/plus.png")}
          style={{
            width: 50,
            height: 50,
          }}
        />
      ),
      name: "create_game",
      margin: 0,
      color: "#25262b",
      buttonSize: 65,
      action: async () => {
        const id = await createGame(
          user.displayName.split(" ")[0] + "'s Game",
          user
        );
        rootNavigation.navigate("GameRoot", {
          screen: "ShareGameScreen",
          params: {
            gameId: id,
          },
          gameId: id,
        });
      }, //navigator.navigate("ShareGameScreen"),
      condition: () => true,
    },
  ];

  const [fabOpen, setFabOpen] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/Icons/1x/loginbg.png")}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "center",
        width: dims.width,
        alignItems: "center",
      }}
    >
      <FlatList
        style={{
          ...styles.container,
          // backgroundColor: "#001220",
          width: dims.width,
          //paddingVertical: 15,
        }}
        data={["START", ...games, "END"]}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 10,
            }}
          />
        )}
      />
      <FloatingAction
        floatingIcon={
          <Image
            source={require("../assets/Icons/1x/plus.png")}
            style={{
              width: 50,
              height: 50,
              transform: [{ rotate: fabOpen ? "45deg" : "0deg" }],
            }}
          />
        }
        animated={true}
        color="#25262b"
        buttonSize={75}
        actions={actions as unknown as IActionProps[]}
        onPressItem={onPressItem}
        onOpen={() => setFabOpen(true)}
        onClose={() => setFabOpen(false)}
        position={"right"}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
