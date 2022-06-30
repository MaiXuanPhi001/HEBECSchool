import { observer } from "mobx-react";
import React, {  } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg from "react-native-svg";
import cartStore from "../store/cartStore";
import { colors, sizes } from "../styles/themes";
import { SearchBar } from "./SearchBar";
import Typo from "./Typo";
import {Cart} from "../assets/icons/Cart";
import {Back} from "../assets/icons/icBack";

export const HeaderName = observer(({ isSearch,name, navigation, icon, nonback }: any) => {

    return (
        <View style={styles.header}>
            
            {!nonback ?<TouchableOpacity
            style={styles.backArea}
            onPress={() => {navigation.goBack() }}>
               <Back/>
            </TouchableOpacity>:null}
            {
                isSearch ? <SearchBar style = {!nonback ?styles.searchBar:styles.searchBarNonback} navigation ={navigation}/> :  
                <View style = {{flex: 1, alignItems: 'center'}}>
                <Typo style = {!nonback? styles.nameBack: styles.nameNonBack}>{name}</Typo>
            </View>
            
            }
          
            {icon? <TouchableOpacity
            onPress={
                () => {
                    navigation.navigate('Cart')
            }}>
            <View style = {styles.icon}>
                <Cart/>
            </View>   
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
    backgroundColor: colors.primary,
    alignItems: 'center',
},
nameBack: {
    fontSize: sizes.size18,
    fontFamily: "text-bold",
    color: colors.white,
    marginLeft: -50,
},
nameNonBack: {
    fontSize: sizes.size18,
    fontFamily: "text-bold",
    color: colors.white,
},
icon: {
        alignSelf: "center",
        width: 24,
        height: 24,
        marginRight: 20,
    },
searchBar: {
        flex: 1,
        marginRight: 20,
},
searchBarNonback: {
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
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
},
textBadge: {
    fontSize: 7,
    color: colors.white,
    fontFamily: "text-bold",
},
backArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width:60
}, 
})