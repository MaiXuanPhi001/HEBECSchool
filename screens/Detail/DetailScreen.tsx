import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ControlQuantity } from "../../components/ControlQuantity";
import { HeaderName } from "../../components/HeaderWithName"
import { ListProductHorizontal } from "../../components/ListProductHorizontal";
import { PriceText } from "../../components/Price";
import bookStore from "../../store/bookStore";
import cartStore from "../../store/cartStore";
import { width } from "../../utils/dimensions";
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

const Toast = () => {
    return (
        <View style={styles.toast}>
            <Image source={require("../../assets/icons/AddToCart.png")} style={styles.toastIcon} />
            <Text style={styles.toastText}>Đã thêm vào giỏ hàng</Text>
        </View>
    )
}

export const DetailScreen = observer(({navigation, route} : any) => {
    const { data } = route.params;
   
    const [quantity, setQuantity] = useState(1);
    const [textShown, setTextShown] = useState(false);
    const [lengthMore,setLengthMore] = useState(false);
    const [toast, settoast] = useState(false);
    const [params] = useState({
        id: data.id,
        name: data.name,
        price: data.finalPrice}
    );
    useEffect(() => {
        bookStore.setBookRelations(data.id);
    }, [])
    
    const dataDefault = [
        {
            id: 1,
            thumbnail: require("../../assets/HEBEC.png"),
            default: true,
        }
    ]
    function onChangeQuantity(quantity: number) {
        setQuantity(quantity);
    }
    const toggleNumberOfLines = () => { 
        setTextShown(!textShown);
    }
    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4);
    },[]);
    //show component in 3s toast when press button add to cart
    const showToast = () => {
        setTimeout(() => {
            settoast(true);
        }, 2000);
        settoast(false);
    }

    return (
        <View style={styles.container}>
              <HeaderName name="Thông tin sách" navigation={navigation} icon = {true}/>
        <ScrollView style = {styles.container}>
          
              
                <ImageGallery data = {data.bookGalleries.length == 0? dataDefault: data.bookGalleries}/>
                <Text style = {styles.title}>{data.name}</Text>
                <PriceText price = {data.finalPrice} style = {styles.price}/>
                <View>
                    <Title title = "Thông tin chi tiết" icon = {require("../../assets/icons/HEBECInfor.png")}/>
                    <InfoDetail title = "Danh mục" content = {/*(data.category.parent1 !=null? data.category.parent1.name +" | ":"" )+*/data.category.name}/>
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
                <View>
                    <Title title = "Sản phẩm liên quan" icon = {require("../../assets/icons/HDSDIcon.png")}/>
                    <ListProductHorizontal data = {bookStore.bookRelations} navigation = {navigation}/>
                </View>
        </ScrollView>
        <View style = {styles.cta}>
                <ControlQuantity quantity = {quantity} onChangeQuantity = {onChangeQuantity}/>
                <View style = {styles.ctaButton}>
                    <TouchableOpacity style = {styles.btnAdd}
                   onPress = {() => {
                         cartStore.addToCart(params, quantity);
                            showToast();
                   }}>
                        <Text style = {styles.btnTextAdd}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.btn}>
                        <Text style = {styles.btnText}>Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {!toast? <Toast/>: null}
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
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 20,
        color: "#231F20",
        lineHeight: 30,
    },
    price: {
        fontSize: 30,
        fontWeight: "500",
        marginBottom: 10,
       marginHorizontal: 20,
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
    cta: {
        flexDirection: "row",
        paddingHorizontal: 10,
       marginVertical: 10,
        justifyContent: "space-between",
    },
    ctaButton: {
        flexDirection: "row",
    },
    btn: {
        backgroundColor: "#489620",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnAdd: {
        backgroundColor: "#fff",
        paddingVertical: 9,
        borderColor: "#489620",
        borderWidth: 1,
        paddingHorizontal: 20,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
    },
    btnTextAdd: {
        fontSize: 16,
        fontWeight: "700",
        color: "#489620",
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
        marginTop: 10,
    },
    readMore: {
        fontSize: 14,
        fontWeight: "400",
        color: "#489620",
        marginHorizontal: 20,
        fontStyle: "italic",
    },
    toast: {
        width: 250,
        position: "absolute",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        bottom: 100,
        left: (width - 250) / 2,
        borderColor: "#489620",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    toastText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#489620",
        textAlign: "center",
    },
    toastIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    }

})
