import { observer } from "mobx-react";
import React, { useCallback, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ControlQuantity } from "../../components/ControlQuantity";
import { HeaderName } from "../../components/HeaderWithName"
import { PriceText } from "../../components/Price";
import { ListProduct } from "../ListProduct/components/ListProduct";
import { ImageGallery } from "./components/ImageGallery";

const Title = ({ title, icon }: any) => {
    return (
        <View style={styles.secondTitle}>
            <Image source={icon} style={styles.titleIcon} />
            <Text style={styles.titleText}>{title}</Text>
            
        </View>
    )
}
const InfoDetail = ({ title, content }: any) => {
    return (
        <View style={styles.infoDetail}>
            <Text style = {styles.infoTitle}>{title}</Text>
            <Text style={styles.infoDetailText}>{content}</Text>
        </View>
    )
}


export const DetailScreen = observer(({navigation, route} : any) => {
    const { data } = route.params;
    const dataDefault = [
        {
            id: 1,
            thumbnail: require("../../assets/HEBEC.png"),
            default: true,
        }
    ]
    const [quantity, setQuantity] = useState(1);
    function onChangeQuantity(quantity: number) {
        setQuantity(quantity);
    }

    //handle showmore and showless
    const [textShown, setTextShown] = useState(false);
    const [lengthMore,setLengthMore] = useState(false);
    const toggleNumberOfLines = () => { 
        setTextShown(!textShown);
    }
    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4);
    },[]);
    return (
        <View style={styles.container}>
              <HeaderName name="Thông tin sách" navigation={navigation} icon = {true}/>
        <ScrollView style = {styles.container}>
          
              
                <ImageGallery data = {data.bookGalleries.length == 0? dataDefault: data.bookGalleries}/>
                <Text style = {styles.title}>{data.name}</Text>
                <PriceText price = {data.finalPrice} style = {styles.price}/>
                <View>
                    <Title title = "Thông tin chi tiết" icon = {require("../../assets/icons/HEBECInfor.png")}/>
                    <InfoDetail title = "Danh mục" content = {data.category.name}/>
                </View>
                <View>
                    <Title title = "Mô tả sản phẩm" icon = {require("../../assets/icons/HDSDIcon.png")}/>
                    <Text 
                        style = {styles.description}
                        onTextLayout = {onTextLayout}
                        numberOfLines = {textShown? undefined: 4} >{data.description}</Text>
                    {lengthMore? <TouchableOpacity onPress = {toggleNumberOfLines}>
                        <Text style = {styles.readMore}>{textShown? "Thu gọn": "Xem thêm"}</Text>
                    </TouchableOpacity>: null}
                </View>
                {/* <View>
                    <Title title = "Sản phẩm liên quan" icon = {require("../../assets/icons/HDSDIcon.png")}/>
                    <ListProduct data = {data.relatedProducts} navigation = {navigation}/>
                    
                </View> */}
        </ScrollView>
        <View style = {styles.cta}>
                    <View style = {styles.control}>
                        <Text style = {styles.controlText}>Số lượng Đặt</Text>
                        <ControlQuantity quantity = {quantity} onChangeQuantity = {onChangeQuantity}/>
                    </View>
                    <TouchableOpacity style = {styles.btn}>
                        <Text style = {styles.btnText}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 20,
        color: "#231F20",
        lineHeight: 30,
    },
    price: {
        fontSize: 30,
        fontWeight: "500",
        marginBottom: 10,
        marginLeft: 20,
        color: "#F44336",
        lineHeight: 35,
    },
    control: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    controlText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#231F20",
    },
    cta: {
        flexDirection: "column",
        marginBottom: 20,
    },
    btn: {
        backgroundColor: "#489620",
        padding: 10,
        borderRadius: 7,
        marginHorizontal: 20,
        marginTop: 10,
        height: 50,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
    },
    titleIcon: {
        width: 20,
        height: 20,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#489620",
        marginLeft: 10,
    },
    secondTitle: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20,
    },
    infoDetail: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 10,
        alignItems: "center",
    },
    infoDetailText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#231F20",
        lineHeight: 30,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "400",
        color: "#231F20",
        width: 120,
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        color: "#231F20",
        marginHorizontal: 20,
        lineHeight: 24,
    },
    readMore: {
        fontSize: 16,
        fontWeight: "400",
        color: "#489620",
        marginHorizontal: 20,
        fontStyle: "italic",
    }


})
