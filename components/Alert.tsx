import React from "react"
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal";
import { colors } from "../styles/themes";
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

                    style={{ fontSize: 18, fontWeight: "bold", color: colors.darkGrey, marginBottom: 10 }}
                    >
                        {title}
                    </Typo>
                    <Text style={{ fontSize: 16, fontWeight: "400", color: colors.darkGrey, marginBottom: 10 }}>{message}</Text>
                    <View style={cancelText ? styles.modalButton2 : styles.modalButton1}>
                        {cancelText &&
                            <TouchableOpacity onPress={() => {
                                callback(false);
                            } }>
                                <Text style={{ fontSize: 16, fontWeight: "400", color: "#F44336", marginRight: 10 }}>{cancelText}</Text>
                            </TouchableOpacity>}
                        <TouchableOpacity onPress={() => {
                            callback(true);
                        } }>
                            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.primary }}>{confirmText}</Text>
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