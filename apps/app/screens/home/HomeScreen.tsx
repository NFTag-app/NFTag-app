import { useNavigation } from "@react-navigation/native";
import { createGame, signOut, useUser } from "client-sdk";
import { UserData } from "client-sdk/dist/types";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
} from "react-native";
import { RootNavigationProps } from "../../components/navigation/NavigationParams";
import { CommonStyles } from "../../styles/CommonStyles";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { useState } from "react";
import { LoadingScreen } from "../LoadingScreen";

interface IActionPropsExtended extends IActionProps {
  condition: () => boolean;
  action: () => Promise<void>;
  buttonSize: number;
}

export const HomeScreen = ({ navigation }) => {
  const rootNavigation = useNavigation<RootNavigationProps>();
  const dims = useWindowDimensions();
  const user = useUser();
  const [fabOpen, setFabOpen] = useState(false);

  // const onPressItem = async (item: string) => {
  //   const action = actions.find((x) => x.name === item);
  //   // console.log("pressed item", action);
  //   if (action.condition()) {
  //     try {
  //       return action?.action();
  //     } catch (ex) {
  //       console.log("GameListScreen.onPressItem.error", item, ex);
  //       alert(`Oops! That didn't work! Try again(?)!`);
  //     }
  //   }
  // };
  // const actions: IActionPropsExtended[] = buildActions(user, rootNavigation);
  // const fabs = (
  //   <FloatingAction
  //     floatingIcon={
  //       <Image
  //         source={require("../../assets/Icons/1x/plus.png")}
  //         style={{
  //           ...styles.fabIcon,
  //           transform: [{ rotate: fabOpen ? "45deg" : "0deg" }],
  //         }}
  //       />
  //     }
  //     animated={true}
  //     color="#25262b"
  //     buttonSize={75}
  //     actions={actions as unknown as IActionProps[]}
  //     onPressItem={onPressItem}
  //     onOpen={() => setFabOpen(true)}
  //     onClose={() => setFabOpen(false)}
  //     position={"right"}
  //   />
  // );

  return (
    <ImageBackground
      source={require("../../assets/Icons/1x/loginbg.png")}
      resizeMode="cover"
      style={{ ...styles.background, width: dims.width }}
    >
      <Text style={{ fontSize: 18, color: "white" }}>
        Join or create a game to get started!
      </Text>
      {/* {fabs} */}
    </ImageBackground>
  );
};

// function buildActions(
//   user: UserData,
//   rootNavigation: RootNavigationProps
// ): IActionPropsExtended[] {
//   return [
//     {
//       text: "Create Game",
//       icon: (
//         <Image
//           source={require("../../assets/Icons/1x/plus.png")}
//           style={{
//             width: 50,
//             height: 50,
//           }}
//         />
//       ),
//       name: "create_game",
//       margin: 0,
//       color: "#25262b",
//       buttonSize: 65,
//       action: async () => {
//         try {
//           const id = await createGame(
//             user.displayName.split(" ")[0] + "'s Game",
//             user
//           );
//           rootNavigation.navigate("OwnedGameRoot", {
//             screen: "ShareGameScreen",
//             params: {
//               gameId: id,
//             },
//             gameId: id,
//           });
//         } catch (ex) {
//           console.log("GameListScreen.action.create_game.error", ex);
//           alert(`Oops! That didn't work! Try again(?)!`);
//         }
//       },
//       condition: () => true,
//     },
//     {
//       text: "Logout",
//       icon: (
//         <Image
//           source={require("../../assets/Icons/1x/plus.png")}
//           style={{
//             width: 50,
//             height: 50,
//           }}
//         />
//       ),
//       name: "log_out",
//       margin: 0,
//       color: "#25262b",
//       buttonSize: 65,
//       action: async () => {
//         try {
//           await signOut();
//           rootNavigation.navigate("HomeRoot");
//         } catch (ex) {
//           console.log("GameListScreen.fab.signOut.error", ex);
//           alert(`Oops! That didn't work! Try again(?)!`);
//         }
//       },
//       condition: () => true,
//     },
//   ];
// }

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
