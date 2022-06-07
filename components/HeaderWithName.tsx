import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HeaderName = ({ name, navigation, icon, nonback }: any) => {
    return (
        <View style={styles.header}>
            {!nonback ?<TouchableOpacity
            onPress={() => {navigation.goBack() }}>
                <Image style = {styles.back}  source={require("../assets/icons/icBack.png")}/>
            </TouchableOpacity>:null}
           
            <View style = {{flex: 1, alignItems: 'center'}}>
                <Text style = {!nonback? styles.nameBack: styles.nameNonBack}>{name}</Text>
            </View>
            {icon? <TouchableOpacity>
            <Image style={styles.filter} source={require("../assets/icons/CartIcon.png")}/>
           </TouchableOpacity>: null}
            
        </View>
)
}
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
    marginLeft: 30,
},
back: {
    marginLeft: 20,
},
filter: {
        alignSelf: "center",
        width: 24,
        height: 24,
        marginRight: 20,
    }  
})