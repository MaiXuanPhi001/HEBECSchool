import { ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CarouselCard } from './components/CarouselBannerCard';
import { CategoriesRender } from './components/ListCategory';
import { ListNews } from '../../components/ListNews';
import { Header } from './components/Header';
import { Title } from './components/Title';
import { NewsContext } from '../../types/Context';
import bookStore from '../../store/bookStore';
import { bannerApi } from '../../api/banner';
import { Loading } from '../../components/Loading';
import { observer } from 'mobx-react';


export const Dashboard = observer(({navigation} : any) => {
    const [banner, setBanner] = useState([]);
    const [news] = useContext(NewsContext)
    useEffect(() => {
        bookStore.setCategories([]);
        bannerApi.getBanner().then(res => {
            setBanner(res.data.data);
        })  
    }, [])
    if(bookStore.isLoadingCategories == false)
    {
    return (
            <ScrollView style = {styles.container}>
                <StatusBar  backgroundColor = "#489620" />
                <Header/>
                <CarouselCard banner={banner} />
                <View style = {styles.bgBanner}/>
                <CategoriesRender data={bookStore.categories} navigation = {navigation}/>
                <Title title = "Tiêu điểm nổi bật" icon = {require('../../assets/icons/NewsIconGreen.png')} subTitle ="Xem thêm"/>
                <ListNews data={news} navigation = {navigation} vertical = {true} />
            </ScrollView>
    )
    }
    else{
        return(
            <Loading/>
        )
    }
}
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1
    },
    bgBanner: {
        width: '100%',
        height: 140,
        backgroundColor: '#489620',
        position: 'absolute',
        top: 0,
        zIndex: -1,
    }
});
export default Dashboard;