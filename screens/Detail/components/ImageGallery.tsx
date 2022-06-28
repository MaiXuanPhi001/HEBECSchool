import { observer } from "mobx-react"
import React, { useEffect, useState } from "react"
import { useRef } from "react"
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { BASE_URL } from "../../../config"
import { colors } from "../../../styles/themes"
import { width } from "../../../utils/dimensions"

export const ImageGallery = observer(({ data } : any) => {
   
  const flatListRef = useRef(null);   
    const [isSelect, setIsSelect] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex ,
    });
  }, [currentIndex]);



    return (
        <View style = {styles.container}>
            <View style = {styles.containerMain}>
                <FlatList
                    data = {data}
                    renderItem = {({ item } : any) => (
                        <View style = {styles.main}>
                            <Image
                                source = {item.default?item.thumbnail:{ uri: BASE_URL+ item.thumbnail }}
                                style = {item.default?styles.imageMainDefault:styles.imageMain}
                            />
                        </View>
                    )}
                    keyExtractor = {(item, index) => index.toString()}
                    showsHorizontalScrollIndicator = {false}
                    horizontal = {true}
                    pagingEnabled = {true}
                    ref = {flatListRef}
                    onScroll = {(event) => {
                        if( isSelect == false ){
                            setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
                        }
                       
                    }}
                />
            </View>
            <View style = {styles.containerThumnail}>
                <FlatList
                    data = {data}
                    renderItem = {({ item } : any) => (
                        <TouchableOpacity 
                        onPress={() => {
                            setIsSelect(true);
                            setCurrentIndex(data.indexOf(item));
                            setTimeout(() => {
                                setIsSelect(false);
                            }, 500);
                        }}
                        style = {currentIndex == data.indexOf(item)?styles.thumbnailCurent :styles.thumbnail}>
                            <Image
                                source =  {item.default?item.thumbnail:{ uri: BASE_URL+ item.thumbnail }}
                                style = {item.default?styles.imageThumbnailDefault:styles.imageThumnail}
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor = {(item, index) => index.toString()}
                    showsHorizontalScrollIndicator = {false}
                    horizontal = {true}
                />
            </View>
        </View>
    )
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    containerMain: {
        flex: 1,
    },
    containerThumnail: {
        flex: 1,
        marginTop: 20,
        marginRight: 10,
    },
    main: {
        flex: 1,
        alignItems: "center",
        width: width,
        height: 350,
    },

    imageMain: {
        width: width,
        height: 350,
        resizeMode: "contain",
    },
    imageThumnail: {
        width: 60,
        height: 60,
        resizeMode: "contain",

    },
    imageMainDefault: {
        width: width-40,
        height: 350,
        resizeMode: "contain",
    },
    imageThumbnailDefault: {
        width: 50,
        height: 60,
        resizeMode: "contain",
    },
    thumbnail: {
        width:60,
        height:60,
        borderRadius:10,
        borderWidth:1,
        borderColor:"#C9C2C0",
        alignItems:"center",
        overflow:"hidden",
       marginLeft:10,
    },
    thumbnailCurent: {
        width:60,
        height:60,
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.darkGrey,
        alignItems:"center",
        overflow:"hidden",
        marginLeft:10,
    },

   
})