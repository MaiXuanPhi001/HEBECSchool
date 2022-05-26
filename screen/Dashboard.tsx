import { StyleSheet} from 'react-native';
import React from 'react';
import { CategoriesRender } from '../component/Category';
import Categories from '../types/Categories';
import { CarouselCard } from '../component/CarouselCard';
import Banner from '../types/Banner';

export const Dashboard = () => {
    return (
        <><CarouselCard banner={Banner} />
        <CategoriesRender data={Categories} /></>
    )
}
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Dashboard;