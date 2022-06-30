import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, sizes } from "../../../styles/themes";
import { width } from "../../../utils/dimensions";
export const SuccessScreen = ({navigation}: any) => {
    const onBackPress = () => {
        return true;
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
    }, [])
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.content}>
                <View>
                <Image style = {{alignSelf: "center", marginLeft:10,width: 150, height:150}} source={require("../../../assets/DatSachSuccess.png")} />
               <Text style={styles.text}>
                     Đặt đơn thành công
                </Text>
                <Text style={styles.desc}>
                 Hệ thống đã lưu đơn của bạn.{"\n"}
                 Cảm ơn bạn đã sử dụng dịch vụ của HEBEC. {"\n"}
                 Để theo dõi trạng thái đơn, bạn có thể xem tại trang lịch sử mua hàng.
                </Text>
                </View>
                <View>
                    <TouchableOpacity style = {styles.buttonHome} onPress={() => navigation.navigate("Dashboard")}>
                        <Text style={styles.buttonHomeText}>
                            Về trang chủ
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonHistory} onPress={() => navigation.navigate("History")}>
                        <Text style={styles.buttonHistoryText}>
                            Xem lịch sử mua hàng
                        </Text>
                    </TouchableOpacity>

                </View>
           </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: width-40,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 200,
    },
    text: {
        alignSelf: 'center',
        fontSize: sizes.size18,
        fontWeight: 'bold',
        color: colors.darkGrey,
        marginTop: 25,
    },
    desc: {
        fontSize: sizes.size16,
        color: colors.darkGrey,
        marginTop: 20,
        textAlign: 'center',
        lineHeight: 24,
    },
    buttonHome: {
        width: width-40,
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    buttonHomeText: {
        color: colors.primary,
        fontSize: sizes.size16,
        fontWeight: 'bold',
    },
    buttonHistory: {
        width: width-40,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonHistoryText: {
        color: colors.white,
        fontSize: sizes.size16,
        fontWeight: 'bold',
    }


});
