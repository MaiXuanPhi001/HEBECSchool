import { useRoute } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react"; 
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Keyboard } from "react-native";
import bookStore from "../store/bookStore";
import { colors } from "../styles/themes";

export const SearchBar = observer(({style, navigation}:any) => {
    const router = useRoute();
    const Search = () => {
        if(bookStore.key != "") {
            Keyboard.dismiss();
            bookStore.setBooks(0);
            if (router.name == "Trang chủ") {
                navigation.navigate("ListProduct", {id: 0});
            }
        }
    }

    return (
        <View style = {style}>
            <TextInput
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
            <TouchableOpacity
            onPress={() => {
              Search();
            }}
            style={styles.icon}>
            <Image source={require("../assets/Vector.png")}/>
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
    },
    icon: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 20,
        top: 15,
    },
});
