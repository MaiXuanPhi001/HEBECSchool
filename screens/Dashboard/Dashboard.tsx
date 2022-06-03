import { ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CarouselCard } from './components/CarouselBannerCard';
import { CategoriesRender } from './components/ListCategory';
import axios from 'axios';
import { ListNews } from './components/ListNews';
import { Header } from './components/Header';
import { Title } from './components/Title';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../types/Context';

var apiKey = '79dd627c667e46498c7d8f019f302797';
var query = 'vietnam';
var from = new Date().getDate();
var url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&domains=vnexpress.net&apiKey=${apiKey}`

export const Dashboard = ({navigation} : any) => {
    const [news, setnews] = useState('');
    const [banner, setbanner] = useState([]);
    const [categories, setcategories] = useState([])
    const [auth] = useContext(AuthContext);
    useEffect(() => {
        fecht(url);
        fetchCategories();
        fechtBanner();
    }, [])

    async function fecht(url :string) {
        try {
            const res = await axios.get(url);
           setnews(res.data.articles);
        } catch (err) {
            console.log(err);
        }
    }
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
                <Title title = "Tin tức mới nhất" icon = {require('../../assets/icons/NewsIconGreen.png')} subTitle ="Xem thêm"/>
                <ListNews data={news} navigation = {navigation} />
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