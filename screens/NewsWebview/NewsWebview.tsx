import { useScrollToTop } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { BASE_URL } from '../../config';
import newsStore from '../../store/newsStore';
import { colors } from '../../styles/themes';
import { width } from '../../utils/dimensions';

export const News = observer(({ navigation, route }: any) => {
    const { id } = route.params;
    const [opacity, setOpacity] = useState(0.8);
    useEffect(() => {
        newsStore.setNews(id);
    }, [])
    return (
        <View style={styles.container}>

            <Animated.View style={[styles.back, { opacity: opacity }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/icBack.png')} style={styles.backImage} />
                </TouchableOpacity>
            </Animated.View>
            <WebView
                originWhitelist={['*']}
                source={{
                    html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title> ${newsStore.news.title}</title>
                <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                    line-height: 24px;
                    color: #231F20;
                    margin: 0;
                    padding: 0;
                    text-align: justify;
                }
                img {
                    width: 100%;
                    height: 200px;
                }
                img.banner {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                header {
                    width: 100%;
                    height: 200px;
                    background-color: #fff;
                }
                div {
                    width: 100%;
                    height: auto;
                }
                div.content {
                   width: ${width - 40}px;
                   margin: 20px;
                }
                h1.title{
                    font-size: 20px;
                    font-weight: bold;
                    color: #231F20;
                    margin: 20px;
                    padding: 0;
                    text-align: center;
                    text-transform: uppercase;
                    line-height: 30px;
                }
                </style>
                </head>
                <body>
                <header>
                <img class="banner" src="${BASE_URL}${newsStore.news.image}" onError="this.style.display='none'" />
                </header>
                <H1 class = "title">${newsStore.news.title}</H1>
                <div class="content">
                ${newsStore.news.body}
                </div>
                </body>
                </html>`
                }}
                style={styles.content}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => {
                    const { contentOffset } = event.nativeEvent;
                    const { y } = contentOffset;
                    if (y > 0) {
                        setOpacity(0.8 - y / 200);
                    }
                    else {
                        setOpacity(0.8);
                    }
                }}
            />
        </View>

    );
}
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    back: {
        position: 'absolute',
        top: 20,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: colors.primary,
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    backImage: {
        width: 15,
        height: 15,
        tintColor: colors.white,
    },

});