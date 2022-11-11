import { useState, useEffect, useRef } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Game } from "client-sdk/dist/types";
import { useGames } from "client-sdk";

const GameFlatList = ({ parentWidth, styles, games, renderItem }) =>
  parentWidth ? (
    <FlatList
      style={[styles.container, { width: parentWidth }]}
      data={games}
      renderItem={renderItem}
    />
  ) : undefined;

export const GameList = ({ parentWidth }:{ parentWidth:number }) => {
  const games: Game[] = useGames();

  const renderItem = ({ item, index, separators }) => (
    <View style={{height: 200}}>
      <Text>
        Key: {item.id} Name: {item.name}
      </Text>
    </View>
  );
  return (
    <GameFlatList
      parentWidth={parentWidth}
      styles={styles}
      games={games}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
