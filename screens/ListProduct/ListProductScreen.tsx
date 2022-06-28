import React, { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ListProduct } from "./components/ListProduct";
import bookStore from "../../store/bookStore";
import { observer } from "mobx-react";
import { HeaderName } from "../../components/HeaderWithName";
import { colors } from "../../styles/themes";

export const ListProductScreen = observer( ({ navigation, route }: any) => {
    const { id } = route.params;
    useEffect(() => {
       bookStore.setBooks(id);
    }, [])


    return (
        <View style = {{flex:1,backgroundColor: colors.white,}}>
            <HeaderName isSearch = {true} style = {styles.titlebar} icon = {true}  navigation = {navigation} />
            <Text style = {{fontSize: 16, color: colors.darkGrey, marginLeft: 20, marginTop: 20}}>Có <Text style = {{color: colors.primary, fontWeight:'700'}}>{bookStore.booksCount}</Text> kết quả phù hợp</Text>
            <ListProduct style = {styles.container} cateId = {id} navigation = {navigation}/>
        </View>
    )

})
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titlebar: {
        height: 100,
    },
});
