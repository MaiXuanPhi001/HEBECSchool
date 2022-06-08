import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Product } from "../../../components/Product";
import bookStore from "../../../store/bookStore";

export const ListProduct = observer(({navigation, cateId, style }: any) => {
    const renderItem = ({ item }: any) => (
      <Product data = {item} navigation = {navigation}/>
    );
    return (
      <View style = {style}>
        <FlatList style={styles.flatList}
          data={bookStore.books}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns = {2}
          showsHorizontalScrollIndicator = {false}
          onEndReachedThreshold = {0.5}
          onEndReached = {() => {
            bookStore.loadMoreBooks(cateId);
          }}
        />
      </View>
    );
  }
);
  
  
  const styles = StyleSheet.create({
      flatList: {
          flex: 1,
          marginLeft: 10,
          marginTop: 20,
      },
  });