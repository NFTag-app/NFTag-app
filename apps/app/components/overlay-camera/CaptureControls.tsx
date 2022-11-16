import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

export const CaptureControls = ({
  onTakePicture,
  onGoBack,
}: {
  onTakePicture: ((event: GestureResponderEvent) => void) | undefined;
  onGoBack: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <View style={captContStyles.bottom}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onTakePicture}
          style={captContStyles.captureButton}
        />
        <TouchableOpacity onPress={onGoBack} style={captContStyles.backButton}>
          <Text style={captContStyles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const captContStyles = StyleSheet.create({
  bottom: {
    marginTop: "auto",
    marginBottom: 50,
    display: "flex",
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "#f5f5f5",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  backButton: {
    position: "absolute",
    bottom: 10,
    left: 20,
    width: 100,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: "white",
    fontSize: 30,
  },
});
