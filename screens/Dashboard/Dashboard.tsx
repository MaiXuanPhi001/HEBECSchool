import { RefreshControl, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CarouselCard } from './components/CarouselBannerCard';
import { CategoriesRender } from './components/ListCategory';
import { CategoryHighlight } from './components/CategoryHighlight';
import bookStore from '../../store/bookStore';
import { bannerApi } from '../../api/banner';
import { observer } from 'mobx-react';
import { HeaderName } from '../../components/HeaderWithName';
import { width } from '../../utils/dimensions';


export const Dashboard = observer(({navigation} : any) => {
    const [banner, setBanner] = useState([]);
    useEffect(() => {
        bookStore.setCategories([]);
        bannerApi.getBanner().then(res => {
            setBanner(res.data.data);
        });
        bookStore.setCategoryHightlight([]);

    }, [])
    return (
        <View style={styles.container}>
            <StatusBar  backgroundColor = "#489620" />
                <HeaderName isSearch = {true} icon = {true} nonback={true}  navigation = {navigation}/>
            <ScrollView style = {styles.container}
            refreshControl = {
                <RefreshControl
                    refreshing={bookStore.isLoadingCategories}
                    onRefresh={() => {
                        bookStore.setCategories([]);
                        bannerApi.getBanner().then(res => {
                            setBanner(res.data.data);
                        }
                        )
                    }
                    }
                    colors={["#489620"]}
                    progressBackgroundColor="#fff"
                    />
            }
            >
                <CarouselCard banner={banner} />
                <View style = {styles.bgBanner}/>
                <CategoriesRender data={bookStore.categories} navigation = {navigation}/>
                {
                    bookStore.categoryHightlight.map((item, index) => {
                        return (
                            <CategoryHighlight data = {item} navigation = {navigation} key = {index}/>
                        )
                    }
                    )
                }
            </ScrollView>
        </View>
    )
    }
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1
    },
    bgBanner: {
        width: width,
        height:100,
        backgroundColor: '#489620',
        position: 'absolute',
        top: 0,
        zIndex: -1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});
export default Dashboard;