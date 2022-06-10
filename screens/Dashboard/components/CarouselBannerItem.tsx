import React from 'react'
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { BASE_URL } from '../../../config'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.93)

function CarouselCardItem({ item, index }: any) {
  return (
    <TouchableOpacity style = {styles.container} key={index}>
      <Image
        source={{ uri: BASE_URL+item.thumbnail }}
        style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 374,
    height: 160,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.85,
      shadowRadius: 7,
      elevation: 3,
      marginBottom: 10,
      marginTop: 10,
  },
  image: {
    width: 374,
    height: 160,
    borderRadius: 7,
  },
})

export default CarouselCardItem