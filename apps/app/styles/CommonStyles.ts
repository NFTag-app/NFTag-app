import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "#333", fontSize: 20 },
  screenListItem: {
    borderWidth: 5,
    borderColor: "red",
    backgroundColor: "green",
    height: "200px",
  },
  screenList: {
    borderWidth: 5,
    borderColor: "red",
    flex: 1,
    backgroundColor: "red",
  },
});
