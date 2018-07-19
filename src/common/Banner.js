/**
 * @author lam
 * @date 2018/7/19 14:24
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';

export default class Banner extends Component {
    render() {
        return (
            <View style={styles.banner}>
                <Image source={require('../assets/images/banner.png')} style={styles.bannerImage}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E6E6E6',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    bannerImage: {
        flex: 1,
        height: 70,
    }
});