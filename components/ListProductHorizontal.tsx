import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Product } from "./Product";


export const ListProductHorizontal = observer(({navigation, data, style }: any) => {
    const renderItem = ({ item }: any) => (
      <Product data = {item} navigation = {navigation}/>
    );
    return (
      <View style = {style}>
        <FlatList style={styles.flatList}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal = {true}
          showsHorizontalScrollIndicator = {false}
        />
      </View>
    );
  }
);
  
  
  const styles = StyleSheet.create({
      flatList: {
          flex: 1,
          marginTop: 20,
          marginLeft: 10,
      },
  });