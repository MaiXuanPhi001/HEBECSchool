import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const ControlQuantity = ({ quantity, onChangeQuantity }: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity  onPress={() => quantity > 0? onChangeQuantity(quantity - 1): null}>
                <Image source={require("../assets/icons/MinusCircle.png")} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.text}>{quantity}</Text>
            <TouchableOpacity onPress={() => onChangeQuantity(quantity + 1)}>
                <Image source={require("../assets/icons/PlusCircle.png")} style={styles.image} />
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: '#231F20',
        width: 30,
        marginHorizontal: 5,
        textAlign: 'center',
    },
    image: {
        width: 20,
        height: 20,
    },
}
)