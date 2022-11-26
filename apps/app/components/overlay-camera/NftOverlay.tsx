import { useUser } from "client-sdk";
import moment from "moment";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useInterval } from "../../hooks/useInterval";
import { OverlayStyles } from "./OverlayStyles";

const logo = require("../../assets/Icons/1x/Logo_Transparent.png");

export const NftOverlay = ({
  setReady,
  isUpdating,
  title,
}: {
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
  title: string | undefined;
}) => {
  const [timeStamp, setTimeStamp] = useState<string>("[Loading Timetamp]");

  useInterval(() => {
    if (isUpdating) {
      setTimeStamp(moment().format("MM-DD-YYYY:x"));
    }
  }, 73);

  const user = useUser();

  useEffect(() => {
    if (!!user) {
      setReady(true);
    }
  }, [user]);

  return (
    <View style={OverlayStyles.wrapper}>
      <View style={OverlayStyles.flexContainer}>
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 15,
            top: 20,
            right: 20,
          }}
        >
          {title || "Undefined"}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            position: "absolute",
            top: 50,
            right: 20,
          }}
        >
          {timeStamp}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 15,
            top: 80,
            right: 20,
          }}
        >
          {user?.uid || "Undefined ID"}
        </Text>
        <Image
          style={{
            position: "absolute",
            left: 14,
            top: 13,
            width: 100,
            height: 50,
          }}
          resizeMode="cover"
          source={logo}
        />
      </View>
    </View>
  );
};
