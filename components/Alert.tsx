import React from "react"
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal";
import { colors, sizes } from "../styles/themes";
import { height, width } from "../utils/dimensions";
import Typo from "./Typo";

export const AlertCustom = ({title, message, callback, visible,cancelText, confirmText}:any) => {
    return(
        <><StatusBar backgroundColor={"#244c10"} barStyle="dark-content" /><Modal
            isVisible={visible}
            style={styles.modal}
            backdropOpacity={0.5}
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            statusBarTranslucent={false}
        >

            <View style={{ flex: 1, width: width, justifyContent: "center", alignItems: "center", marginTop: -120 }}>
                <View style={{ backgroundColor: colors.white, width: width - 40, borderRadius: 7, padding: 30 }}>
                    <Typo 
                        size18
                        bold
                        style={{ color: colors.darkGrey, marginBottom: 10 }}>{title}</Typo>

                    <Typo 
                    size16
                    regular
                    style={{color: colors.darkGrey, marginBottom: 10 }}>{message}</Typo>
                    <View style={cancelText ? styles.modalButton2 : styles.modalButton1}>
                        {cancelText &&
                            <TouchableOpacity onPress={() => {
                                callback(false);
                            } }>
                                <Typo
                                size16
                                regular
                                style={{ fontSize: sizes.size16, fontFamily: "text-regular", color: colors.error, marginRight: 10 }}>{cancelText}</Typo>
                            </TouchableOpacity>}
                        <TouchableOpacity onPress={() => {
                            callback(true);
                        } }>
                            <Typo 
                            size16
                            regular
                            style={{color: colors.primary }}>{confirmText}</Typo>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal></> 
    )
}
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton1: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "flex-end",
    },
    modalButton2: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
    },

})