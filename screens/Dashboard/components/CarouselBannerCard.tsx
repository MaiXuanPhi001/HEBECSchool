import React from "react";
import { View } from "react-native";
import  Carousel, {Pagination} from "react-native-snap-carousel";
import CarouselItem, {ITEM_WIDTH, SLIDER_WIDTH} from "./CarouselBannerItem";

export const CarouselCard = ({ banner} : any) => {
    const ref = React.useRef(null);
    const [index, setIndex] = React.useState(0)
    return (
        <View>
           <Carousel
            ref = {ref}
            autoplay = {true}
            loop = {true}
            autoplayInterval = {3000}
            data={banner}
            renderItem={CarouselItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
           />
           <Pagination
            dotsLength={banner.length}
            containerStyle={{paddingTop: 3, paddingBottom: 30}}
            activeDotIndex={index}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 3,
                borderColor: '#C9C2C0',
                borderStyle: 'solid',
                borderWidth: 1,
            }}
            dotColor={'#489620'}
            inactiveDotColor={'#fff'}
            inactiveDotOpacity={0.5}
            inactiveDotScale = {1}
            tappableDots={true}
            carouselRef={ref}
            />

        </View>
    )
}
