import React from "react";
import { FlatList,StyleSheet, View } from "react-native";
import { NewsItem } from "./News";

export const ListNews = ({ data, navigation }: any) => {
    const renderItem = ({ item }: any) => {return(
      <NewsItem data = {item} navigation = {navigation}/>
    )};
  
    return (
        <View>
          <FlatList style={styles.flatList}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item,index) => index.toString()}
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
          />
        </View>
      );
    }
    
  
  const styles = StyleSheet.create({
      flatList: {
          display: 'flex',
          flexDirection: 'row',
          marginHorizontal: 20,
      },
      
  });