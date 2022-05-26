import { StyleSheet, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item } from './CategoryItem';

export  const CategoriesRender = ({ data }) => {
    const renderItem = ({ item }) => (
      <Item title={item.title} icon = {item.icon} />
    );
  
    return (
      <SafeAreaView>
        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
        <FlatList style={styles.flatList}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal = {false}
          numColumns = {7}
          showsHorizontalScrollIndicator = {false}
        />
        </ScrollView>

      </SafeAreaView>
    );
  }
  

const styles = StyleSheet.create({
    flatList: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    
});