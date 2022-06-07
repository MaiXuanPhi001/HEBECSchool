import React from "react";
import { FlatList,StyleSheet, View } from "react-native";
import { NewsItem } from "./News";

export const ListNews = ({ data, navigation, vertical }: any) => {
    const renderItem = ({ item }: any) => {return(
      <NewsItem data = {item} navigation = {navigation} vertical = {vertical}/>
    )};
  
    return (
        <View>
          <FlatList style={styles.flatList}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item,index) => index.toString()}
            horizontal = {!vertical? false : true}
            showsHorizontalScrollIndicator = {false}
            showsVerticalScrollIndicator = {false}
          />
        </View>
      );
    }
    
  
  const styles = StyleSheet.create({
      flatList: {
          display: 'flex',
         marginHorizontal: 10,
      },
      
  });