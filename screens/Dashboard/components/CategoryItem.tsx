import React from "react";
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../../../config";
import bookStore from "../../../store/bookStore";
export const Item = ({ data, navigation }: any) => (
    <TouchableOpacity 
    onPress={() => {
      navigation.navigate("ListProduct",{
        id: data.id,});
      bookStore.setKey("");
  }}
    style={styles.item}>
      <Image style = {styles.icon} source={{uri: BASE_URL+data.thumbnail}}/>
      <Text numberOfLines={2} style={styles.title}>{data.name}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: 85,
        maxHeight: 100,
        flexWrap: 'wrap',
        color: '#231F20',
    },
    icon: {
        width: 60,
        height: 60,
        },

  }
        
  );
