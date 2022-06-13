import { observer } from "mobx-react";
import React, { useState } from "react";
import {  FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Loading } from "../../../components/Loading";
import { Product } from "../../../components/Product";
import bookStore from "../../../store/bookStore";
import { width } from "../../../utils/dimensions";

export const ListProduct = observer(({navigation, cateId, style, key }: any) => {
  //pull to refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    bookStore.setBooks(cateId);
    setRefreshing(false);
  }
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
          showsVerticalScrollIndicator = {false}
          onEndReachedThreshold = {0.5}
          onEndReached = {() => {
            bookStore.loadMoreBooks(cateId);
          }}
          refreshControl = {
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#489620"]}
              progressBackgroundColor="#fff"
              />
          }
        />
        {bookStore.isLoadingMore? <Loading style = {styles.loading} large = {false}/> : null}
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
      loading: {
          width: 50,
          height: 50,
          position: 'absolute',
          bottom: 10,
          right: width / 2 - 25,
          zIndex: 1.5,
          borderRadius: 25,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
      }
  });