import { useRoute } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react"; 
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Keyboard } from "react-native";
import bookStore from "../store/bookStore";
import { colors, fonts } from "../styles/themes";
import {  SearchIc } from "../assets/icons/Search";

export const SearchBar = observer(({style, navigation}:any) => {
    const router = useRoute();
    const Search = () => {
            Keyboard.dismiss();
            if (router.name == "Trang chủ") {
                bookStore.setCurrentCategory(0,0);
                navigation.navigate("ListProduct");
            }
            else{
                bookStore.setBooks(bookStore.currentCategory);
            }
    }
    return (
        <View style = {style}>
             {router.name == "Trang chủ"? 
                <TouchableOpacity
                onPress={Search}
                activeOpacity={0.9}
                >
                <TextInput
                style={styles.input}
                placeholder="Bạn cần tìm sản phẩm gì?"
                placeholderTextColor="#8A8F9E"
                editable={false}
                />
                </TouchableOpacity>: <TextInput
                value={bookStore.key}
                style={styles.input}
                placeholder="Bạn cần tìm sản phẩm gì?"
                placeholderTextColor="#8A8F9E"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                    bookStore.setKey(text)
                }
                }
               onSubmitEditing={Search}
            />   
            }
            <TouchableOpacity
            onPress={() => {
              Search();
            }}
            style={styles.icon}>
            <SearchIc />
            </TouchableOpacity>
        </View>
    );
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    input: {
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 7,
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 60,
        fontFamily: "text-regular",
    },
    icon: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 20,
        top: 15,
    },
});
