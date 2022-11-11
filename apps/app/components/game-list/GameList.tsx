import { FlatList, View, Text, StyleSheet } from 'react-native'
import { Game } from 'client-sdk/dist/types';
import { useGames } from 'client-sdk';

export const GameList = () => {
  const games: Game[] = useGames();

  const renderItem = ({item, index, separators}) => (
    <View>
      <Text>Key: {item.id} Name: {item.name}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList data={games} renderItem={renderItem}/>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})