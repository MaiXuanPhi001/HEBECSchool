import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal";
import { width } from "../utils/dimensions";

export const AlertCustom = ({title, message, callback, visible,cancelText, confirmText}:any) => {
    return(
        <Modal
        isVisible={visible}
        style={styles.modal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        statusBarTranslucent={true}
        >
            <View style={{ flex: 1, width: width, backgroundColor: "rgba(0,0,0,0.1)", justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "#fff", width: width-40, borderRadius: 7, padding: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#231F20", marginBottom: 10 }}>{title}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "400", color: "#231F20", marginBottom: 10 }}>{message}</Text>
                    <View style={cancelText? styles.modalButton2: styles.modalButton1}>
                        {cancelText && 
                        <TouchableOpacity onPress={() => {
                            callback(false)
                        }
                        }>
                            <Text style={{ fontSize: 16, fontWeight: "400", color: "#F44336", marginRight: 10 }}>{cancelText}</Text>
                        </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={() => {
                            callback(true)
                        }
                        }>
                            <Text style={{ fontSize: 16, fontWeight: "400", color: "#489620" }}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal> 

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