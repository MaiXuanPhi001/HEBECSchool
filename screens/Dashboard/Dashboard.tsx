import { ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CarouselCard } from './components/CarouselBannerCard';
import { CategoriesRender } from './components/ListCategory';
import axios from 'axios';
import { ListNews } from '../../components/ListNews';
import { Header } from './components/Header';
import { Title } from './components/Title';
import { AuthContext, NewsContext } from '../../types/Context';


export const Dashboard = ({navigation} : any) => {
    const [banner, setbanner] = useState([]);
    const [categories, setcategories] = useState([])
    const [auth] = useContext(AuthContext);
    const [news] = useContext(NewsContext)
    useEffect(() => {
        fetchCategories();
        fechtBanner();
    }, [])

    async function fetchCategories() {
        axios('https://163clone.bmdapp.store:4164/v1/customer/category?limit=12', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token: auth,
            },
        })
        .then((response) => {setcategories(response.data.data.categories);})
        .catch(() => {
            console.log('error');
        });
    }
    async function fechtBanner() {
        axios('https://163clone.bmdapp.store:4164/v1/customer/banner', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token: auth,
            },
        })
        .then((response) => {setbanner(response.data.data.data);})
        .catch(() => {
            console.log('error');
        });
    }
    
    return (
            <ScrollView style = {styles.container}>
                <StatusBar  backgroundColor = "#489620" />
                <Header/>
                <CarouselCard banner={banner} />
                <View style = {styles.bgBanner}/>
                <CategoriesRender data={categories} navigation = {navigation}/>
                <Title title = "Tiêu điểm nổi bật" icon = {require('../../assets/icons/NewsIconGreen.png')} subTitle ="Xem thêm"/>
                <ListNews data={news} navigation = {navigation} vertical = {true} />
            </ScrollView>
    )
}

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