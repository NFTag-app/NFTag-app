import { test, UserProvider } from "client-sdk";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

import CameraScreen from "./Camera";
import HomeScreen from "./Home";
import RegCameraScreen from "./RegCamera";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	const message = test();

	return (
		<UserProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ title: "NFTag | Home" }}
					/>
					<Stack.Screen
						name="Camera"
						component={CameraScreen}
						options={{
							title: "NFTag | Camera",
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="RegCamera"
						component={RegCameraScreen}
						options={{
							title: "NFTag | RegCamera",
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</UserProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
