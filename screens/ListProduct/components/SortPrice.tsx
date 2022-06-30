import React from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import bookStore from "../../../store/bookStore";
import { colors, sizes } from "../../../styles/themes";
import { width, height } from "../../../utils/dimensions";
export const SortPrice = ({modalVisible, onClose, callback}:any) => {
    const onPress = (sort:string) => {
        callback(sort);
        onClose();
    }
    return (
            <Modal
                isVisible={modalVisible}
                onBackdropPress={onClose}
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
                <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => onPress("")}>
                            <Text style={styles.modalItemText}>Tất cả</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress("ASC")}>
                            <Text style={styles.modalItemText}>Từ thấp đến cao</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress("DESC")}>
                            <Text style={styles.modalItemText}>Từ cao đến thấp</Text>
                        </TouchableOpacity>
                </View>
            </Modal>
        )
    }
    const styles = StyleSheet.create({
        modal: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: colors.white,
            width: width - 50,
            borderRadius: 5,
            marginTop: 25,
            maxHeight: height - 50,
            padding: 10,
        },
        modalItemText: {
            fontSize: sizes.size16,
            lineHeight: 20,
            color: colors.darkGrey,
            padding: 10,
        }
    })
    
    