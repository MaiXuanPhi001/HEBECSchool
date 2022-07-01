import { observer } from "mobx-react"
import React, { useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { colors, sizes } from "../../../styles/themes"
import Modal from "react-native-modal";
import { height, width } from "../../../utils/dimensions";
import { SortPrice } from "./SortPrice";
import bookStore from "../../../store/bookStore";
export const ModalSort = observer(({visible, onClose}:any) => {
    const [showDropdown, setshowDropdown] = useState(false);
    const [selected, setselected] = useState(bookStore.sort);
    const onCloseDropdown = () => {
        setshowDropdown(false);
    };
    const onSelected = (item:any) => {
        setselected(item);
    }
    return(
        <Modal
            isVisible={visible}
            style={styles.modal}
            backdropOpacity={0.5}
            animationInTiming={500}
            animationOutTiming={500}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            onBackdropPress={() => onClose()}
        >
        <View style = {styles.component}>
            <View style = {styles.header}>
                <Text style = {styles.textHeader}>BỘ LỌC</Text>
                <TouchableOpacity style = {styles.buttonClose} onPress={() => onClose()}>
                    <Image style = {{width: 20, height: 20}} source={require("../../../assets/icons/Path.png")}/>
                </TouchableOpacity>
            </View>
            <View style = {{width: '100%', height: 1, backgroundColor: colors.primary}}/>
            <View style = {{flexDirection: 'column', justifyContent:"space-between", flex:1}}>
            <View style = {styles.content}>
                <Text style = {styles.text}>Giá</Text>
                <TouchableOpacity onPress={() => {
                    setshowDropdown(true);
                }}>
                <TextInput
                    style = {styles.input}
                    value = {selected ==''?'Tất cả':selected == 'ASC'?'Từ thấp đến cao':'Từ cao đến thấp'}
                    placeholder = {'Tất cả'}
                    placeholderTextColor = {colors.grey}
                    underlineColorAndroid = "transparent"
                    editable = {false}
                />
                 <Image style = {styles.icon} source={require("../../../assets/icons/arrowBottom.png")}/>
                </TouchableOpacity>
                {showDropdown && <SortPrice callback ={onSelected} modalVisible = {showDropdown} onClose={onCloseDropdown}/>}
            </View>
            <View style = {styles.footer}>
                <TouchableOpacity style = {styles.buttonWhite} onPress={() => {
                    setselected("");
                    bookStore.setSort("");
                    onClose();
                }}>
                    <Text style = {styles.textButtonWhite}>Xoá</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.buttonGreen} onPress={() => {
                    bookStore.setSort(selected);
                    onClose();
                }}>
                    <Text style = {styles.textButtonGreen}>Áp dụng</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    )
})
const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignItems: "center",
    },
    component: {
        marginLeft: 100,
        width: width-100,
        height: height,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingVertical: 20,
        height: 70,
    },
    textHeader: {
        fontSize: 16,
        fontFamily: 'text-bold',
        color: colors.primary,
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: sizes.size16,
        color: colors.darkGrey,
    },
    input: {
        marginLeft:40,
        height: 50,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: width-200,
        color: colors.darkGrey,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 22,
        height: 8,
        width: 14,
    },
    buttonWhite: {
        backgroundColor: colors.white,
        borderRadius: 7,
        borderColor: colors.primary,
        borderWidth: 1,
        width: (width-160)/2,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    buttonGreen: {
        backgroundColor: colors.primary,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        width: (width-160)/2,
        height: 50,
    },
    textButtonWhite: {
        fontSize: sizes.size16,
        fontFamily: 'text-bold',
        color: colors.primary,
    },
    textButtonGreen: {
        fontFamily: 'text-bold',
        fontSize: sizes.size16,
        color: colors.white,
    },
    buttonClose : {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }

})

