import React from "react";
import { View } from "react-native";
import  Carousel, {Pagination} from "react-native-snap-carousel";
import CarouselItem, {ITEM_WIDTH, SLIDER_WIDTH} from "./CarouselItem";

export const CarouselCard = ({ banner}) => {
    const ref = React.useRef(null);
    const [index, setIndex] = React.useState(0)
    return (
        <View>
           <Carousel
            ref = {ref}
            data={banner}
            renderItem={CarouselItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
           />
           <Pagination
            dotsLength={banner.length}
            activeDotIndex={index}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale = {0.6}
            />

        </View>
    )
}
