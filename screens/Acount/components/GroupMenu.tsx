import { StyleSheet, FlatList, ScrollView, View } from 'react-native';
import React from 'react';
import { Item } from './Item';

export  const GroupMenu = ({ user,data, notice, navigation }: any) => {
    const renderItem = ({ item }: any) => (
      <Item user ={user} data = {item} notice = {notice}  navigation = {navigation}/>
    );
  
    return (
      <View>
        <FlatList style={styles.flatList}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator = {false}
        />
      </View>
    );
  }
  

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});