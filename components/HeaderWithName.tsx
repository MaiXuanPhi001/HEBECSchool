import { observer } from "mobx-react";
import React, {  } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cartStore from "../store/cartStore";
import { SearchBar } from "./SearchBar";

export const HeaderName = observer(({ isSearch,name, navigation, icon, nonback }: any) => {

    return (
        <View style={styles.header}>
            {!nonback ?<TouchableOpacity
            onPress={() => {navigation.goBack() }}>
                <Image style = {styles.back}  source={require("../assets/icons/icBack.png")}/>
            </TouchableOpacity>:null}
            {
                isSearch ? <SearchBar style = {styles.searchBar}/> :  
                <View style = {{flex: 1, alignItems: 'center'}}>
                <Text style = {!nonback? styles.nameBack: styles.nameNonBack}>{name}</Text>
            </View>
            }
          
            {icon? <TouchableOpacity
            onPress={
                () => {
                    navigation.navigate('Cart')
            }}>
            <Image style={styles.icon} source={require("../assets/icons/CartIcon.png")}/>
            {cartStore.totalQuantity > 0?   <View style = {styles.badge}>
                <Text style = {styles.textBadge}>{cartStore.totalQuantity >9?"9+": cartStore.totalQuantity}</Text>
            </View>: null}
           </TouchableOpacity>: null}
            
        </View>
)
}
)
const styles = StyleSheet.create({
header: {
    height: 70,
    paddingVertical: 10,
    flexDirection: "row",
    backgroundColor: '#489620',
    alignItems: 'center',
},
nameBack: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginLeft: -30,
},
nameNonBack: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
},
back: {
    marginLeft: 20,
},
icon: {
        alignSelf: "center",
        width: 24,
        height: 24,
        marginRight: 20,
    },
searchBar: {
        flex: 1,
        marginHorizontal: 20,
},
badge: {
    position: 'absolute',
    top: -2,
    right: 15,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#F44336',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#489620',
    borderWidth: 1,
},
textBadge: {
    fontSize: 7,
    color: '#fff',
    fontWeight: '700',
} 
})