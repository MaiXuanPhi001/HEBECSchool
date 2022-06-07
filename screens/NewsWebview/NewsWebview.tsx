import React from 'react';
import {StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export const News = ({ route } : any) => {
    const { url } = route.params;
    console.log(url);
    return (
        <View style = {styles.container}>
            <WebView
                source={{ uri: url }}
                style={styles.webView}
            />
        </View>
      
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    webView: {
        width: '100%',
        height: '100%',
        flex: 1,
    },

});