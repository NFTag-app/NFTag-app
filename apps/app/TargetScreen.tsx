import { useTarget } from "client-sdk/dist/GameProvider"
import { View, ImageBackground, useWindowDimensions, Image } from 'react-native'
import { CommonStyles } from "./styles/CommonStyles"

const TargetScreen = ({navigation: {navigate}}) => {
    const dims = useWindowDimensions();
    const target = useTarget()

    return (
        <View style={{...CommonStyles.container}}>
            <ImageBackground
                source = {require('./assets/Icons/1x/loginbg.png')}
                resizeMode = "cover"
                style={{
                    flex: 1,
                    justifyContent: "center",
                    width: dims.width,
                    alignItems: "center",
                }}
            >
            <View
                style={{
                    width: dims.width * 0.8,
                    borderRadius: 8,
                    margin: 'auto',
                    backgroundColor: "#25262b"
                }}
            >
                <Image
                    source={{uri: target.image.uri}}
                    style={{
                        alignSelf: 'center',
                        width: dims.width * 0.5,
                        height: dims.width * 0.5,
                        borderRadius: dims.width * 0.25,
                    }}
                />
            </View>

            </ImageBackground>
        </View>
    )
}

export default TargetScreen