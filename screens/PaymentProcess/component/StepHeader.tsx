import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { colors, sizes } from "../../../styles/themes"
import { width } from "../../../utils/dimensions"

const Tracker = ({ step, active, done }:any) => {
    return (
        <View style={[styles.tracker, active ? styles.active : styles.inActive]}>
            {done ? <Image source={require("../../../assets/icons/Check.png")}/> :
            <Text style={[styles.trackerText, active ? styles.active : styles.inActive]}>{step}</Text>}
        </View>
    )
}

const Line = ({ active }:any) => {
    return (
        <View style={[styles.line, active ? styles.active : styles.inActive]} />
    )
}

export const StepHeader = ({step }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{step == 1? "Địa chỉ giao hàng": (step ==2? "Vận chuyển": "Phương thức thanh toán")}</Text>
            <View style={styles.progressBar}>
                <Tracker step={1} active={step >=1} done = {step > 1} />
                <Line active={step > 1} />
                <Tracker step={2} active={step >= 2} done = {step > 2}/>
                <Line active={step > 2} />
                <Tracker step={3} active={step >= 3} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.white,
        marginTop: 20,
    },
    title: {
        fontSize: sizes.size16,
        fontWeight: "bold",
        color: colors.darkGrey,
    },
    progressBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 10,
    },
    tracker: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    trackerText: {
        fontSize: sizes.size18,
        fontWeight: "bold",
    },
    
    line: {
        width: (width-290)/2,
        height: 2,
    },
    active: {
        backgroundColor: colors.primary,
        color: colors.white,
    },
    inActive: {
        backgroundColor: colors.grey,
        color: colors.mediumGrey,
    }

})
