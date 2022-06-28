import { StyleSheet, FlatList, ScrollView, View } from 'react-native';
import React from 'react';
import { Item } from './CategoryItem';

export  const CategoriesRender = ({ data, navigation }: any) => {
    const renderItem = ({ item }: any) => (
      <Item data = {item}  navigation = {navigation}/>
    );
    const numColumns = Math.round(data.length / 2);
  
    return (
      <View>
        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
        <FlatList style={styles.flatList}
          key = {numColumns}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal = {false}
          numColumns = {numColumns}
          showsHorizontalScrollIndicator = {false}
        />
        </ScrollView>
      </View>
    );
  }
  

const styles = StyleSheet.create({
    flatList: {
        display: 'flex',
        flexDirection: 'row',
       marginRight: 10,
        
    },
    
});