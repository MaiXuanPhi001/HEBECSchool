import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Category = [
    {
        id: 1,
        title: 'Danh mục',
        icon: require('./assets/Categories/BookCategories.png'),
    },
    {
        id: 2,
        title: 'Đồ chơi',
        icon: require('./assets/Categories/Toy.png'),
    },
    {
        id: 3,
        title: 'Thiếu nhi',
        icon: require('./assets/Categories/Children.png'),
    },
    {
        id: 4,
        title: 'Văn học',
        icon: require('./assets/Categories/VanHoc.png'),
    },
    {
        id: 5,
        title: 'HEBEC Shop',
        icon: require('./assets/Categories/Shop.png'),
    },
    {
        id: 6,
        title: 'Sổ liên lạc',
        icon: require('./assets/Categories/SoLienLac.png'),
    },
    {
        id: 7,
        title: 'Kho ứng dựng học tập',
        icon: require('./assets/Categories/KhoUngDung.png'),
    },
  ]
  const Item = ({ title, icon }) => (
    <View style={styles.item}>
      <Image source={icon}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
export  function Dashboard(){
    const renderItem = ({ item }) => (
      <Item title={item.title} icon = {item.icon} />
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.FlatList}
          data={Category}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal = {true}
          initialNumToRender = {4}       
          ItemSeparatorComponent = {() => <View style = {styles.separator}/>}
        />
      </SafeAreaView>
    );
  }
  

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        width: 100,
        height: 120,
    },
    title: {
        fontSize: 14,
        justifyContent: 'center',
    },
    FlatList: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    separator: {
        backgroundColor: '#fff',
    }
});
export default Dashboard;