import { useUser } from "client-sdk";
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
        onPress={() => {
          return signOut();
        } }
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
    );
  }
  return undefined;
};
function signOut(): void {
  throw new Error("Function not implemented.");
}

