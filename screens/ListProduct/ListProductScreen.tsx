import React, { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ListProduct } from "./components/ListProduct";
import bookStore from "../../store/bookStore";
import { observer } from "mobx-react";
import { HeaderName } from "../../components/HeaderWithName";

export const ListProductScreen = observer( ({ navigation, route }: any) => {
    const { id } = route.params;
    useEffect(() => {
       bookStore.setBooks(id);
    }, [])

    return (
        <View style = {{flex:1,backgroundColor: "#fff",}}>
            <HeaderName isSearch = {true} style = {styles.titlebar} icon = {true}  navigation = {navigation}/>
            <Text style = {{fontSize: 16, color: "#231F20", marginLeft: 20, marginTop: 20}}>Có <Text style = {{color: '#489620', fontWeight:'700'}}>{bookStore.booksCount}</Text> kết quả phù hợp</Text>
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
