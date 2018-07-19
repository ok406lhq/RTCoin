/**
 * @author lam
 * @date 2018/7/19 14:47
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const statusBarH = StatusBar.currentHeight;
export default class TopNavigate extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon name={'arrow-back'} marginLeft={10} size={30} color={'#fff'} onPress={this._onPress()}/>
                <Text style={styles.textStyle}>支付</Text>
                <Icon name={'add'} marginRight={10} size={30} color={'#fff'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: statusBarH,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1E82D2'
    },
    textStyle: {
        fontSize: 20,
        color: '#fff'
    }
});