/**
 * @author lam
 * @date 2018/7/19 10:36
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    StatusBar
} from 'react-native';

// const currentHeight = StatusBar.currentHeight;

export default class QuickEntry extends Component {
    render() {
        return (
            <View style={styles.quickEntry}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#1E82D2"}
                    barStyle={"light-content"}
                />
                <View style={styles.quickEntryItem}>
                    <Image style={styles.quickEntryItemIcon} source={require('../assets/images/iconfont-scan.png')}/>
                    <Text style={styles.quickEntryItemText}>扫一扫</Text>
                </View>
                <View style={styles.quickEntryItem}>
                    <Image style={styles.quickEntryItemIcon} source={require('../assets/images/iconfont-paycode.png')}/>
                    <Text style={styles.quickEntryItemText}>付款</Text>
                </View>
                <View style={styles.quickEntryItem}>
                    <Image style={styles.quickEntryItemIcon}
                           source={require('../assets/images/iconfont-discount.png')}/>
                    <Text style={styles.quickEntryItemText}>卡券</Text>
                </View>
                <View style={styles.quickEntryItem}>
                    <Image style={styles.quickEntryItemIcon}
                           source={require('../assets/images/iconfont-dangmianfu-yellow.png')}/>
                    <Text style={styles.quickEntryItemTextYellow}>咻一咻</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    quickEntry: {
        flexDirection: 'row',
        backgroundColor: '#1E82D2',
        height: 100,
        paddingTop: 0,
    },
    quickEntryItem: {
        padding: 10,
        flex: 1,
        alignItems: 'center'
    },
    quickEntryItemIcon: {
        width: 40,
        height: 40
    },
    quickEntryItemText: {
        marginTop: 8,
        color: '#fff',
        fontSize: 13
    },
    quickEntryItemTextYellow: {
        marginTop: 8,
        color: '#FFC700',
        fontSize: 13
    },

});