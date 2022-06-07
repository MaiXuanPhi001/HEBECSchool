import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

export const NewsItem = ({data, navigation, vertical}: any) => {
    let day = data.publishedAt.split('T')[0];
    day = day.split('-').join('/');
    let dayRevert = day.split('/');
    dayRevert = dayRevert[2]+ '/' + dayRevert[1] + '/' + dayRevert[0] ;
    let time = data.publishedAt.split('T')[1].split(':')[0] + ':' + data.publishedAt.split(':')[1];
    return(
    <TouchableOpacity
    onPress={() => navigation.navigate('News',{
        url: data.url,
      })}
    style={vertical? styles.item : styles.itemRow}>
        <Image style = {vertical? styles.image : styles.imageRow} source={{uri: data.urlToImage}}/>
        <View style={styles.content}>
            <Text numberOfLines={2} style={vertical? styles.title : styles.titleRow}>{data.title}</Text>
            <Text style={styles.date}>{time}  {dayRevert}</Text>
        </View>
    </TouchableOpacity>
)};
const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 160,
        height: 185,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 7,
          elevation: 2,
          marginBottom: 10,
        overflow: 'hidden',
    },
    image: {
        width: 160,
        height: 113,
    },
    content: {
        flexDirection: 'column',
        padding: 10,
    },
    title: {
        marginBottom: 5,
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        justifyContent: 'center',
        textAlign: 'left',
        flexWrap: 'wrap',
        lineHeight: 16,
    },
    date: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        justifyContent: 'center',
        textAlign: 'left',
        color: '#9E9E9E',
        flexWrap: 'wrap',
        lineHeight: 14,
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 7,
          elevation: 2,
          marginBottom: 20,
        overflow: 'hidden',
        marginRight: 10,
    },
    imageRow: {
        width: 130,
        height: 100,
    },
    titleRow: {
        marginTop: 10,
        marginBottom: 5,
        paddingRight: 10,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        justifyContent: 'center',
        textAlign: 'left',
        lineHeight: 24,
        maxWidth: '80%',
    }
});
