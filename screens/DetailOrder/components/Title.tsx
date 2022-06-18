import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

export const Title = ({title, icon, subtitle, styleSub, border}: any) => {
    return (
        <View style = {styles.content}>
            <View style = {styles.left}>
                <Image style = {styles.image} source={icon} /> 
                <Text style = {styles.text}>{title}</Text>
            </View>
            <View style = {styles.right}>
                {border ? 
                <View style = {styles.border}>
                  <Text style = {styleSub}>{subtitle}</Text>
                </View>
                : <Text style = {styleSub}>{subtitle}</Text>}
            </View>
        </View>
    )
    }
    const styles = StyleSheet.create({
        content: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 10,
            paddingHorizontal: 20,
        },
        left: {
            flexDirection: "row",
            alignItems: "center",
        },
        image: {
            width: 25,
            height: 25,
            marginRight: 10,
        },
        text: {
            fontSize: 18,
            fontWeight: "700",
            color:"#231F20",
        },
        right: {
            flexDirection: "row",
            alignItems: "center",
        },
        border: {
            borderWidth: 1,
            borderColor: "#489620",
            borderRadius: 7,
            width: 100,
            paddingVertical: 7,
            paddingHorizontal: 10,
            alignItems: "center",
        }
    })
