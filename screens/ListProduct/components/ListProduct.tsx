import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Product } from "../../../components/Product";

export const ListProduct = ({ data, navigation }: any) => {
    const renderItem = ({ item }: any) => (
      <Product data = {item} navigation = {navigation}/>
    );
  
    return (
      <View>
        <FlatList style={styles.flatList}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns = {2}
          showsHorizontalScrollIndicator = {false}
        />
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
      flatList: {
          flex: 1,
          marginLeft: 10,
          marginTop: 20,
      },
  });