import { useUser, signOut } from "client-sdk";
import { TouchableOpacity, Text } from "react-native";

export const LogoutButton = () => {
  const user = useUser();

  if (user) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#47f",
          width: 150,
          padding: 10,
          margin: 10,
          alignItems: "center",
        }}
        onPress={() => signOut()}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
    );
  }
  return undefined;
};
