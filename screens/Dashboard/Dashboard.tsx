import { RefreshControl, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CarouselCard } from './components/CarouselBannerCard';
import { CategoriesRender } from './components/ListCategory';
import { CategoryHighlight } from './components/CategoryHighlight';
import bookStore from '../../store/bookStore';
import { bannerApi } from '../../api/banner';
import { observer } from 'mobx-react';
import { HeaderName } from '../../components/HeaderWithName';
import { width } from '../../utils/dimensions';
import cartStore from '../../store/cartStore';
import notiStore from '../../store/NotificationStore';
import { NotificationService } from '../../plugins/notificationService';
import userStore from '../../store/userStore';
import { colors } from '../../styles/themes';
import {switchNotification} from '../../plugins/notification';


export const Dashboard = observer(({navigation} : any) => {
    const [banner, setBanner] = useState([]);
    useEffect(() => {
        bookStore.setCategories([]);
        bannerApi.getBanner().then(res => {
            setBanner(res.data.data);
        });
        bookStore.setCategoryHightlight([]);
        cartStore.getCartFromStore();
        notiStore.setNotiList();
        checkNotificationPermission();

        const notifyService = new NotificationService();
       
        notifyService.onNotification(handleNotification)
        notifyService.onNotificationClick(handleNotification)
        notifyService.onNotificationBackground(handleNotification)
        notifyService.onNotificationLocalClick(handleNotification)
        return () => {
            notifyService.unSubscribe();
        }

    }, [])

    const handleNotification = useCallback((data, trigger) => {
        switchNotification(data, trigger);
      }, []);
    
      const checkNotificationPermission = useCallback(async () => {
        await NotificationService.checkPermission();
        await NotificationService.onRegister();
        await userStore.getInfo();
      }, []);
    return (
        <View style={styles.container}>
            <StatusBar  backgroundColor = {colors.primary} />
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
                        cartStore.getCartFromStore();
                        notiStore.setNotiList();
                    }
                    }
                    colors={[colors.primary]}
                    progressBackgroundColor={colors.white}
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
        backgroundColor: colors.white,
        flex:1
    },
    bgBanner: {
        width: width,
        height:100,
        backgroundColor: colors.primary,
        position: 'absolute',
        top: 0,
        zIndex: -1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    }
});
export default Dashboard;