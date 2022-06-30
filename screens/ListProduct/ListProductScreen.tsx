import React, { useEffect } from "react"
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { ListProduct } from "./components/ListProduct";
import bookStore from "../../store/bookStore";
import { observer } from "mobx-react";
import { HeaderName } from "../../components/HeaderWithName";
import { colors } from "../../styles/themes";
import { ModalCate } from "./components/ModalCate";
import { Loading } from "../../components/Loading";
import { ModalSort } from "./components/ModalSort";

export const ListProductScreen = observer( ({ navigation, route }: any) => {

    const[showModalCategory, setShowModalCategory] = React.useState(false);
    const[showModalSort, setShowModalSort] = React.useState(false);

    useEffect(() => {
       bookStore.setBooks(bookStore.currentCategory);
    }, [])
    const onClose = () => {
        setShowModalCategory(false);
        setShowModalSort(false);
    }
    return (
        <View style = {{flex:1,backgroundColor: colors.white,}}>
            <HeaderName isSearch = {true} style = {styles.titlebar} icon = {true}  navigation = {navigation} />
            <View style = {styles.toolbar}>
                <TouchableOpacity style = {styles.button} onPress = {() => {
                    setShowModalCategory(true);
                } }>
                    <Text style = {styles.buttonText}>Danh mục</Text>
                    <Image style = {styles.buttonImage} source = {require("../../assets/icons/Books.png")}/>
                </TouchableOpacity>
                <View style = {{backgroundColor: colors.white, width: 1, height: 40}}/>
                <TouchableOpacity style = {styles.button} onPress = {() => {
                    setShowModalSort(true);
                    console.log("sort", showModalSort);
                } }>
                    <Text style = {styles.buttonText}>Lọc</Text>
                    <Image style = {styles.buttonImage} source = {require("../../assets/icons/Filter.png")}/>
                </TouchableOpacity>
            </View>
            {showModalCategory && <ModalCate visible = {showModalCategory} onClose = {onClose}/>}
            {showModalSort && <ModalSort visible = {showModalSort} onClose = {onClose}/>}
            <Text style = {{fontSize: 16, color: colors.darkGrey, marginLeft: 20, marginTop: 20}}>Có <Text style = {{color: colors.primary, fontWeight:'700'}}>{bookStore.booksCount}</Text> kết quả phù hợp</Text>
            <ListProduct style = {styles.container} cateId = {bookStore.currentCategory} navigation = {navigation}/>
            {bookStore.isLoadingBooks && <Loading large={true} style = {styles.loading}/>}
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
    toolbar: {
        flexDirection: "row",
        backgroundColor: colors.white,
        marginTop: 1,
    },
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.primary,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "text-regular",
        color: colors.white,
    },
    buttonImage: {
        width: 20,
        height: 20,
        marginLeft: 10,
        tintColor: colors.white,
    },
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    }


});
