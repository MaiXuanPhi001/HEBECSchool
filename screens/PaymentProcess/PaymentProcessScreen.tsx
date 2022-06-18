import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { HeaderName } from "../../components/HeaderWithName";
import paymentStore from "../../store/paymentStore";
import { DeliveryAddress } from "./component/DeliveryAddress";
import { StepHeader } from "./component/StepHeader";
import { Delivery } from "./component/Delivery";
import { observer } from "mobx-react";
import { Loading } from "../../components/Loading";
import { PayMentMethod } from "./component/PaymentMethod";

export const PaymentProcessScreen = observer(({navigation}:any) => {
    return (
        <View style = {{flex:1, backgroundColor: "#fff"}}>
            <HeaderName name = "Thanh toán" navigation = {navigation}/>
           <ScrollView style = {styles.container}>
            <StepHeader step = {paymentStore.step} />
            {
                paymentStore.step == 1 ? <DeliveryAddress /> : (
                    paymentStore.step == 2 ? <Delivery/>:<PayMentMethod navigation = {navigation}/>
                )
            }
              </ScrollView>
           
            {paymentStore.isLoadingPromo? <Loading style = {styles.loading}  large = {true}  />: null}
            {paymentStore.isLoadingOrder? <Loading style = {styles.loading}  large = {true}  />: null}
           
        </View>
    );
}
)

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.1)",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
    }
}
)