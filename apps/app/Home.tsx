import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from './RootStackParams'

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>
const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenProp>()

    return (
        <View style={styles.container}>
            <Text style={{ color: '#333', fontSize: 20 }}>Welcome</Text>
            <TouchableOpacity
                style={{backgroundColor:'#47f', width: 150, padding: 10, margin: 10, alignItems: 'center'}}
                onPress={() => navigation.navigate('TagCamera')}
            >
                <Text style={{ fontSize: 18, color: '#fff' }}>Tag Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{backgroundColor:'#47f', width: 150, padding: 10, margin: 10, alignItems: 'center'}}
                onPress={() => navigation.navigate('RegCamera')}
            >
                <Text style={{ fontSize: 18, color: '#fff' }}>Reg Camera</Text>
            </TouchableOpacity>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default HomeScreen