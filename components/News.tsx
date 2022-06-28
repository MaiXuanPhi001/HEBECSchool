import { observer } from "mobx-react";
import React, { useState } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { BASE_URL } from "../config";
import { colors } from "../styles/themes";
import { convertDate } from "../types/DateTime";
import { width } from "../utils/dimensions";

export const NewsItem = observer(({data, navigation}: any) => {
    const [imageError, setimageError] = useState(false);
    const onImageError = () => {
        setimageError(true);
    }

    return(
    <TouchableOpacity
    onPress={() => navigation.navigate('News',{
        id: data.id,
      })}
    style={styles.itemRow}>
         <Image source={imageError?require("../assets/HEBEC.png"):{uri: BASE_URL+data.thumbnail}} 
                style = {imageError? styles.imageErr:styles.imageRow} 
                onError = {() => onImageError()}/>
        <View style={styles.content}>
            <Text numberOfLines={2} style={styles.titleRow}>{data.title}</Text>
            <Text style={styles.date}>{convertDate(data.createdAt)}</Text>
        </View>
    </TouchableOpacity>
)}
);
const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        padding: 10,
    },
    date: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        justifyContent: 'center',
        textAlign: 'left',
        color: colors.mediumGrey,
        flexWrap: 'wrap',
        lineHeight: 14,
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 100,
        backgroundColor: colors.white,
        borderRadius: 7,
        shadowColor: colors.darkGrey,
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
        paddingRight: 10,
    },
    imageRow: {
        width: 130,
        height: 100,
    },
    titleRow: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        justifyContent: 'center',
        textAlign: 'left',
        lineHeight: 24,
        width: width-170,
    },
    imageErr: {
        width: 90,
        height: 100,
        marginHorizontal: 20,
        resizeMode: 'contain',
    }
});
