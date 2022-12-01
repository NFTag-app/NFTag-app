import { useNavigation } from "@react-navigation/native";
import { createGame, signOut, useGames, useUser } from "client-sdk";
import { UserData } from "client-sdk/dist/types";
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
import { RootNavigationProps } from "../components/navigation/NavigationParams";
import { CommonStyles } from "../styles/CommonStyles";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";

interface IActionPropsExtended extends IActionProps {
  condition: () => boolean;
  action: () => Promise<void>;
  buttonSize: number;
}

export const GameListScreen = ({ navigation }) => {
  const rootNavigation = useNavigation<RootNavigationProps>();
  const { games, loaded } = useGames();
  const dims = useWindowDimensions();
  const user = useUser();
  const [fabOpen, setFabOpen] = useState(false);


  const onPressItem = async (item: string) => {
    const action = actions.find((x) => x.name === item);
    // console.log("pressed item", action);
    if (action.condition()) {
      try {
        return action?.action();
      } catch (ex) {
        console.log('GameListScreen.onPressItem.error', item, ex);
        alert(`Oops! That didn't work! Try again(?)!`);
      }
    }
  };
  const actions: IActionPropsExtended[] = buildActions(user, rootNavigation);
  const fabs = (
    <FloatingAction
      floatingIcon={
        <Image
          source={require("../assets/Icons/1x/plus.png")}
          style={{ ...styles.fabIcon, transform: [{ rotate: fabOpen ? "45deg" : "0deg" }]}}
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
  );

  if (!loaded) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
        {fabs}
      </View>
    );
  }

  if (games.length < 1) {
    return (
      <View style={styles.container}>
        <LoadingScreen text="Do you have a Game Code? Click Join Game below!"/>
        {fabs}
      </View>
    )
  }

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
        style={styles.row}
      >
        <TouchableOpacity
          onPress={() =>
            rootNavigation.navigate("GameRoot", {
              screen: "FeedScreen",
              params: {
                gameId: item.id,
              },
              gameId: item.id,
            })
          }
          style={styles.rowButton}
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

  return (
    <ImageBackground
      source={require("../assets/Icons/1x/loginbg.png")}
      resizeMode="cover"
      style={{ ...styles.background, width: dims.width }}
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
        )}/>
      {fabs}
    </ImageBackground>
  );
};

function buildActions(user: UserData, rootNavigation: RootNavigationProps): IActionPropsExtended[] {
  return [
    {
      text: "Create Game",
      icon: (
        <Image
          source={require("../assets/Icons/1x/plus.png")}
          style={{
            width: 50,
            height: 50,
          }} />
      ),
      name: "create_game",
      margin: 0,
      color: "#25262b",
      buttonSize: 65,
      action: async () => {
        try {
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
        } catch (ex) {
          console.log('GameListScreen.action.create_game.error', ex);
          alert(`Oops! That didn't work! Try again(?)!`);
        }
      },
      condition: () => true,
    },
    {
      text: "Logout",
      icon: (
        <Image
          source={require("../assets/Icons/1x/plus.png")}
          style={{
            width: 50,
            height: 50,
          }} />
      ),
      name: "log_out",
      margin: 0,
      color: "#25262b",
      buttonSize: 65,
      action: async () => {
        try {
          await signOut();
          rootNavigation.navigate('HomeRoot');
        } catch (ex) {
          console.log('GameListScreen.fab.signOut.error', ex);
          alert(`Oops! That didn't work! Try again(?)!`);
        }
      },
      condition: () => true,
    },
  ];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    backgroundColor: "#25262b",
    borderColor: "#1a1b1e",
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  rowButton: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fabIcon: {
    width: 50,
    height: 50,
  },

});
