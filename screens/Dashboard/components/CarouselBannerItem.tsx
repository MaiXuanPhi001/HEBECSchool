import React from 'react'
import {  StyleSheet, Image, TouchableOpacity } from "react-native"
import { BASE_URL } from '../../../config'
import { colors } from '../../../styles/themes'
import { width } from '../../../utils/dimensions'

export const SLIDER_WIDTH = width + 80
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
    width: width-40,
    height: 160,
    borderRadius: 7,
    shadowColor: colors.darkGrey,
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
    width: width-40,
    height: 160,
    borderRadius: 7,
  },
})

export default CarouselCardItem