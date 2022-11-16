import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  useWindowDimensions,
} from "react-native";

export const PreviewControls = ({
  onSave,
  onRetake,
}: {
  onSave: ((event: GestureResponderEvent) => void) | undefined;
  onRetake: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  const dims = useWindowDimensions();
  const previewStylesSD = StyleSheet.create({
    button: {
      marginBottom: 10,
      height: 60,
      width: dims.width / 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <View style={previewStyles.bottom}>
        <TouchableOpacity style={previewStylesSD.button} onPress={onRetake}>
          <Text style={previewStyles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={previewStylesSD.button} onPress={onSave}>
          <Text style={previewStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const previewStyles = StyleSheet.create({
  bottom: {
    marginTop: "auto",
    marginBottom: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonText: {
    fontSize: 30,
    color: "white",
  },
});
