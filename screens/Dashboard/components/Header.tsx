import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { SearchBar } from "../../../components/SearchBar"

export const Header = () => {
    return (
        <View style={styles.header}>
           <SearchBar style = {styles.searchBar}/>
           <Image style={styles.cart} source={require("../../../assets/icons/CartIcon.png")}/>
           <Image style={styles.dot} source={require("../../../assets/Dot.png")}/>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
    },
    cart: {
        alignSelf: "center",
        width: 24,
        height: 24,
        marginLeft: 20,
    },
    dot: {
        width: 12,
        height: 12,
        top: 7,
        right: 7,
    },
})