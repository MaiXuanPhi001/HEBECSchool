import { observer } from "mobx-react"
import React, { useEffect } from "react"
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AlertCustom } from "../../components/Alert"
import { HeaderName } from "../../components/HeaderWithName"
import { Loading } from "../../components/Loading"
import { PriceText } from "../../components/Price"
import historyOrdersStore from "../../store/HistoryStore"
import { getStatus } from "../History/components/ItemOrder"
import { ItemProduct } from "./components/ItemProduct"
import { Title } from "./components/Title"
const RowItem = ({title, value}: any) => {
    return (
        <View style = {styles.row}>
            <Text style = {styles.title}>{title}</Text>
           <PriceText price={value} style = {styles.value} />
        </View>
    )
}
const getPaymentMethod = (paymentMethod: string) => {
    switch (paymentMethod) {
        case "CASH":
            return "Tiền mặt"
        case "VNPAY":
            return "VNPAY"
            default:
                return "VNPAY"
    }
}


export const DetailOrderScreen = observer(({navigation, route}: any) => {
    const { data } = route.params;
    const [showAlert, setShowAlert] = React.useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [status, setStatus] = React.useState(getStatus(data.status));
    useEffect(() => {
        getDisabled()
    }, [])
    const onConfirm = (confirm: any) => {
        if (confirm === true) {
            setShowAlert(false)
            historyOrdersStore.cancelOrder(data.id).then(() => {
              setShowAlertSuccess(true);
              setDisabled(true);
              setStatus("Đã hủy");
            }
            )
        }
        setShowAlert(false)
    }
    const onClose = () => {
        setShowAlertSuccess(false)
    }

    const getDisabled = () => {
        if (data.status === "PENDING") {
           setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }
    
    return (
        <View style = {styles.container}>
             <View style = {{backgroundColor: "#489620",height: 20}}/>
            <HeaderName name = "Chi tiết đơn hàng" navigation = {navigation}/>
            <ScrollView style = {styles.content}>
                <Title title = {"Trạng thái đơn"} icon = {require("../../assets/icons/StatusOrder.png")}  subtitle = {status} styleSub = {status =="Đã hủy"? styles.statusCancel:styles.status}/>
                <View style = {styles.line}/>
                <Title title = {"Giao đến"} icon = {require("../../assets/icons/Location.png")} />
                <Text style = {styles.name_phone}>{data.name + " - " + data.phone}</Text>
                <Text style = {styles.address}>{data.address+", "+ data.addressWard.pathWithType}</Text>
                <View style = {styles.line}/>
                <Title title = {"Sản phẩm đã chọn"} icon = {require("../../assets/icons/Books.png")} />
                <View>
                <FlatList 
                data = {data.orderDetails}
                keyExtractor = {(item: any) => item.id}
                renderItem = {({item}: any) => (
                    <ItemProduct book = {item}/>
                )}
                style = {styles.flatList}
                />
                </View>
                <View style = {styles.line_short}/>
                <RowItem title = {"Tổng tạm tính"} value = {data.moneyTotal}/>
                <RowItem title = {"Phí vận chuyển"} value = {data.moneyDistance}/>
                <View style = {styles.line}/>
                <Title title = {"Mã khuyến mãi"} icon = {require("../../assets/icons/Promo.png")} styleSub = {styles.promotionCode} subtitle = {data.promotion?.code} />
                <RowItem title = {"Tiền được khuyến mãi"} value = {data.moneyDiscount}/>
                <View style = {styles.line}/>
                <Title title = {"Hình thức thanh toán"} icon = {require("../../assets/icons/PaymentMethod.png")} styleSub = {styles.promotionValue} subtitle = {getPaymentMethod(data.paymentType)} border = {true} />
                <View style = {styles.total}>
                    <Text style = {styles.total_title}>TỔNG CỘNG</Text>
                    <PriceText price = {data.moneyFinal} style = {styles.total_value}/>
                </View>
                 <TouchableOpacity 
                style = {disabled === true? styles.buttonDisable: styles.button} 
                disabled = {disabled} 
                onPress = {() => {
                        setShowAlert(true)
                }}>        
                    <Text style = {styles.textButton}>HUỶ ĐƠN</Text>
                </TouchableOpacity>
            </ScrollView>
            {showAlert && <AlertCustom 
            title = "Xác nhận huỷ đơn hàng" 
            message = "Bạn có chắc chắn muốn huỷ đơn hàng này?" 
            callback = {onConfirm}
            visible = {showAlert} 
            cancelText = {"Thoát"}
            confirmText = {"Huỷ đơn"}/>}
             {showAlertSuccess && <AlertCustom 
            title = "Huỷ đơn hàng thành công" 
            message = {"Đơn hàng của bạn đã được huỷ"}
            callback = {onClose}
            visible = {showAlertSuccess} 
            confirmText = {"OK"}/>}
            {historyOrdersStore.isLoadingHistoryOrders && <Loading large = {true} style = {styles.loading}/>}
        </View>
    )
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: "#C9C2C0",
        marginTop: 20,
        marginBottom: 10,
    },
    line_short: {
        borderBottomWidth: 1,
        borderBottomColor: "#C9C2C0",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    status: {
        fontSize: 16,
        color: "#489620",
        fontWeight: "500",
    },
    name_phone: {
        fontSize: 16,
        color: "#489620",
        fontWeight: "700",
        marginHorizontal: 20,
        marginBottom: 5,
    },
    address: {
        fontSize: 16,
        color: "#231F20",
        fontWeight: "400",
        marginHorizontal: 20,
        marginBottom: 10,
    },
    flatList: {
        marginHorizontal: 20,

    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        alignItems: "center",
        marginHorizontal: 20,
    },
    title: {
        fontSize: 16,
        color: "#231F20",
        fontWeight: "400",
    },
    value: {
        fontSize: 16,
        color: "#489620",
        fontWeight: "500",
    },
    promotionCode: {
        fontSize: 16,
        color: "#231F20",
        fontFamily: "Montserrat-Regular",
    },
    promotionValue: {
        fontSize: 14,
        color: "#489620",
        fontWeight: "500",
    },
    total: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        marginTop: 40,
        alignItems: "center",
    },
    total_title: {
        fontSize: 20,
        color: "#231F20",
        fontWeight: "700",
    },
    total_value: {
        fontSize: 20,
        color: "#489620",
        fontWeight: "700",
    },
    button: {
        alignItems: "center",
        padding: 10,
        margin: 20,
        backgroundColor: "#F44336",
        borderRadius: 7,
    },
   textButton: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "700",
    },
    buttonDisable: {
        alignItems: "center",
        padding: 10,
        margin: 20,
        backgroundColor: "#C9C2C0",
        borderRadius: 7,
    },
    statusCancel: {
        fontSize: 16,
        color: "#F44336",
        fontWeight: "500",
    },
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    }


})

            
