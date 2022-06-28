import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ControlQuantity } from "../../components/ControlQuantity";
import { HeaderName } from "../../components/HeaderWithName"
import { ListProductHorizontal } from "../../components/ListProductHorizontal";
import { PriceText } from "../../components/Price";
import bookStore from "../../store/bookStore";
import cartStore from "../../store/cartStore";
import paymentStore from "../../store/paymentStore";
import { colors, sizes } from "../../styles/themes";
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
    const showToast = () => {
        settoast(true);
        setTimeout(() => {
            settoast(false);
        }, 2000);
       
    }
    const promotionCalculate = () => {
        let promotion = (data.originPrice-data.finalPrice)/data.originPrice*100;
        promotion = Math.round(promotion);
        return promotion;
    }

    return (
        <View style={styles.container}>
              <HeaderName name="Thông tin sách" navigation={navigation} icon = {true}/>
        <ScrollView style = {styles.container}
        // refreshControl={
        //     <RefreshControl
        //         refreshing={bookStore.isLoadingBooks}
        //         onRefresh={() => {
        //             bookStore.setBooks
        //             bookStore.setBookRelations(data.id);
        //         }
        //         }
        //         colors={[colors.primary]}
        //         progressBackgroundColor={colors.white}
        //     />
        // }
        >
            {promotionCalculate()!=0?
                <View style = {styles.promotion}>
                    <Text style = {styles.promotionText}>{promotionCalculate()+"%"}</Text>
                </View>:null}
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
                    <TouchableOpacity
                    onPress={() => {
                        paymentStore.setStep(1);
                        cartStore.buyNow(params, quantity);
                        navigation.navigate("PaymentProcess")
                    }}
                    style = {styles.btn}>
                        <Text style = {styles.btnText}>Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {toast? <Toast/>: null}
        </View>
    )
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 20,
        fontFamily: "text-medium",
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 20,
        color: colors.darkGrey,
        lineHeight: 30,
    },
    price: {
        fontSize: 30,
        fontFamily: "text-medium",
        marginBottom: 10,
       marginHorizontal: 20,
        color: colors.error,
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
        marginLeft: 10,
        height: 50,
    },
    btn: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    btnAdd: {
        backgroundColor: colors.white,
        paddingVertical: 9,
        borderColor: colors.primary,
        borderWidth: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        fontSize: sizes.size16,
        fontFamily: "text-bold",
        color: colors.white,
        textAlign: "center",
    },
    btnTextAdd: {
        fontSize: sizes.size16,
        fontFamily: "text-bold",
        color: colors.primary,
        textAlign: "center",
    },
    titleIcon: {
        width: 20,
        height: 20,
    },
    titleText: {
        fontSize: sizes.size16,
        fontFamily: "text-bold",
        color: colors.primary,
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
        fontSize: sizes.size16,
        fontFamily: "text-medium",
        color: colors.darkGrey,
        lineHeight: 30,
    },
    infoTitle: {
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        color: colors.darkGrey,
        width: 120,
    },
    description: {
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        color: colors.darkGrey,
        marginHorizontal: 20,
        lineHeight: 24,
        marginTop: 10,
    },
    readMore: {
         fontSize: sizes.size14,
        fontFamily: "text-italic",
        color: colors.primary,
        marginHorizontal: 20,
        
    },
    toast: {
        width: 250,
        position: "absolute",
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        bottom: 100,
        left: (width - 250) / 2,
        borderColor: colors.primary,
        borderWidth: 1,
        shadowColor: colors.darkGrey,
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
        fontSize: sizes.size16,
        fontFamily: "text-medium",
        color: colors.primary,
        textAlign: "center",
    },
    toastIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    promotion: {
        position: "absolute",
        transform: [{ rotate: "45deg" }],
        top: (width)/20,
        zIndex: 1.2,
        right: -(width)/10,
        width: Math.sqrt(((width)/5)*((width)/5)*2),
        height: 22,
        backgroundColor: colors.error,
        paddingHorizontal: 50,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    promotionText: {
        color: colors.white,
         fontSize: sizes.size14,
        fontFamily: "text-bold",
        position: "absolute",
        zIndex: 1.3,
        width: Math.sqrt(((width)/5)*((width)/5)*2),
        right: -(width)/10+7,
    },

})
