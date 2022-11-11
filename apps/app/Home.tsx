import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HomeButton } from "./components/buttons/HomeButton";

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={{ color: "#333", fontSize: 20 }}>Welcome</Text>

      <HomeButton caption="Reg Camera" navigateTo="RegCamera" />
      <HomeButton caption="Snag Camera" navigateTo="TagCamera" />

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
