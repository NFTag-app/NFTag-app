import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import { RootStackParamList } from "../../RootStackParams";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeButtonProps = {
  caption: string, 
  navigateTo: keyof RootStackParamList
};

export const HomeButton = ({ caption, navigateTo }: HomeButtonProps ) => {
  const navigation = useNavigation<HomeScreenProp>();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#47f",
        width: 150,
        padding: 10,
        margin: 10,
        alignItems: "center",
      }}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <Text style={{ fontSize: 18, color: "#fff" }}>{caption}</Text>
    </TouchableOpacity>
  );
};
