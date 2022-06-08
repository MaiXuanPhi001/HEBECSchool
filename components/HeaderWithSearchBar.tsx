import React from "react"
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { SearchBar } from "./SearchBar"

export const HeaderSearchBar = ({navigation, style}: any) => {
    return (
        <View style = {style}>
        <View style={styles.header}>
            <TouchableOpacity
            onPress={() => {navigation.goBack() }}
            >
                <Image style = {styles.back}  source={require("../assets/icons/icBack.png")}/>
            </TouchableOpacity>
           <SearchBar style = {styles.searchBar}/>
           <TouchableOpacity>
            <Image style={styles.filter} source={require("../assets/icons/FilterWhite.png")}/>
           </TouchableOpacity>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor: '#489620',
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        marginHorizontal: 20,
    },
    filter: {
        alignSelf: "center",
        width: 24,
        height: 24,
        marginRight: 20,
    },
    back: {
        marginLeft: 20,
    }  
})