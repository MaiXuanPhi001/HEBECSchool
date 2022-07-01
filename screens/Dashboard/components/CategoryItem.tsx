import React, { useState } from "react"; 
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../../../config";
import bookStore from "../../../store/bookStore";
import { colors, sizes } from "../../../styles/themes";
import { width } from "../../../utils/dimensions";
import * as Sentry from "@sentry/react-native";

export const Item = ({ data, navigation }: any) => {
  const [imageError, setimageError] = useState(false);
  const onImageError = () => {
      setimageError(true);
      Sentry.captureException(new Error("Image not found"));
  }
  return(
    <TouchableOpacity 
    onPress={() => {
      bookStore.setCurrentCategory(data.id, 1);
      bookStore.setKey("");
      navigation.navigate("ListProduct");
      
  }}
    style={styles.item}>
      <Image style = {styles.icon} source={imageError?require("../../../assets/HEBEC.png"):{uri: BASE_URL+data.thumbnail}} onError={onImageError}/>
      <Text numberOfLines={2} style={styles.title}>{data.name}</Text>
    </TouchableOpacity>
)};

  const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: (width-4)/4,
        marginBottom: 20,
    },
    title: {
         fontSize: sizes.size14,
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        maxWidth: (width-10)/4-10,
        maxHeight: 100,
        flexWrap: 'wrap',
        color: colors.darkGrey,
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        },

  }
        
  );
