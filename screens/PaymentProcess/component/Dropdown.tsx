import { observer } from "mobx-react";
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import paymentStore from "../../../store/paymentStore";
import { colors } from "../../../styles/themes";
import { ModalList } from "./ModalList";

export const Dropdown = observer(({type}: any) => {
  const [placeholder, setPlaceholder] = useState("");
  const [label, setLabel] = useState("");
  const [currentType, setCurrentType] = useState(type);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (type == 1) {
      setPlaceholder("Chọn tỉnh / thành phố");
      setLabel("Tỉnh / thành phố");
    }
    else if (type == 2) {
      setPlaceholder("Chọn quận / huyện");
      setLabel("Quận / huyện");
    }
    else {
      setPlaceholder("Chọn phường / xã");
      setLabel("Phường / xã");
    }
  }
  , [type])
    const openModal = () => {
      setCurrentType(type);
      setModalVisible(true);
    }

    const onSelectItem = ({item}: any) => {
     currentType == 1 ? paymentStore.setCity(item) : currentType == 2 ? paymentStore.setDistrict(item) : paymentStore.setWard(item);
     setModalVisible(false);
    }

    const onClose = () => {
     currentType == 1 ? paymentStore.setCity({}) : currentType == 2 ? paymentStore.setDistrict({}) : paymentStore.setWard({});
     setModalVisible(false);
    }

  return (
    <View style={styles.dropdown}>
            <Text style={styles.labelStyle}>{label}<Text style={{color:colors.error}}> *</Text></Text>
            <TouchableOpacity
            onPress={() => {openModal()}}
            style = {styles.dropdownItem}>
              <TextInput
                  placeholder={placeholder}
                  placeholderTextColor="#C9C2C0"
                  style={styles.inputStyle}
                   value={type == 1 ? paymentStore.city.name : type == 2 ? paymentStore.district.name : paymentStore.ward.name}
                  editable={false}
                  />
                <Image style = {styles.icon} source={require("../../../assets/icons/arrowBottom.png")}/>
            </TouchableOpacity>
            {modalVisible && <ModalList modalVisible = {modalVisible} onSelectItem = {onSelectItem} onClose = {onClose} currentType = {currentType}/>}
        </View>
    );
}
);
const styles = StyleSheet.create({
    dropdown: {
        flexDirection: 'column',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    dropdownItem: {
      flexDirection: 'column',
    },
    inputStyle: {
      color: colors.darkGrey,
      paddingLeft: 20,
      paddingRight: 50,
      paddingVertical: 15,
      fontSize: 16,
      lineHeight: 20,
      height: 50,
      borderColor: colors.mediumGrey,
      borderWidth: 1,
      borderRadius: 7,
  },
  labelStyle: {
      fontSize: 14,
      lineHeight: 16,
      marginBottom: 5,
      color: colors.darkGrey,
  },
  icon: {
      marginLeft: 10,
      position: 'absolute',
      right: 20,
      top: 20
  }
}
);


