import React from "react";
import { Text, View } from "react-native";
import { HeaderName } from "../../components/HeaderWithName";
import { DeliveryAddress } from "./component/DeliveryAddress";
import { StepHeader } from "./component/StepHeader";

export const PaymentProcessScreen = () => {
    return (
        <View style = {{flex:1, backgroundColor: "#fff"}}>
            <HeaderName name = "Thanh toán" />
            <StepHeader step = {1} />
            <DeliveryAddress/>
        </View>
    );
};