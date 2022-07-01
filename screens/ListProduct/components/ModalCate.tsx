import { observer } from "mobx-react";
import React from "react"
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Text } from "react-native-paper";
import bookStore from "../../../store/bookStore";
import { colors, sizes } from "../../../styles/themes";
import { height, width } from "../../../utils/dimensions";


const itemHeader = ({item, onClose}:any) => {
    
    return (
        <View style={{flexDirection: 'row'}}>
            {item.id ==0? null:
            <Image  style={styles.image} source={require("../../../assets/icons/ArrowIcon.png")} />}
            <TouchableOpacity onPress={() => { bookStore.setCurrentCategory(item.id, item.level); onClose(); } }>
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
        </View>
    )
}
const itemContent = ({item, onClose}:any) => {
    return (
   
                    <View style={styles.itemContent}>
                    <TouchableOpacity onPress={() => 
                        {bookStore.setCurrentCategory(item.id,item.level)
                        onClose();}}>
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                    </View>
    )
}
export const ModalCate = observer(({visible, onClose}:any) => {
    return (
        <Modal
            isVisible={visible}
            style={styles.modal}
            backdropOpacity={0}
            animationInTiming={1}
            animationIn="zoomIn"
            animationOut="zoomOut"
            onBackdropPress={() => onClose()}
        >
        <View style = {styles.component}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}>
                <View style={styles.header}>
                  {bookStore.cate.map((item:any) => 
                    
                        itemHeader({item, onClose})
                    
                )}
                </View>
            </ScrollView>
            <View style = {{width: '100%', height: 1, backgroundColor: colors.primary}}/>
            {bookStore.cate[bookStore.level].children1.length >0?
            <ScrollView
            showsVerticalScrollIndicator = {false}>
                    {bookStore.cate[bookStore.level].children1.length >0? bookStore.cate[bookStore.level].children1.map((item:any) => itemContent({item, onClose})):null }
            </ScrollView>:null}
            
        </View>
        
        </Modal>
    )
})
const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    text: {
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        color: colors.darkGrey,
    },
    image: {
        marginHorizontal: 10,
        visibility: 'visible',
        width: 20,
        height: 20,
    },
    imageHiden: {
        marginHorizontal: 10,
        visibility: 'hidden',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        height:50,
        paddingHorizontal: 20,

    },
    itemContent: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    component: {
        backgroundColor: colors.white,
        position: 'absolute',
        top: 112,
        width: width,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: colors.darkGrey,
        shadowOffset: {
            width: 0,
            height:3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 6,
        maxHeight: 250,

    }

})