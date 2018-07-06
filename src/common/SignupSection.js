import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class SignupSection extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text} onPress={() => this.doReg()}>注册新用户</Text>
                <Text style={styles.text} onPress={() => this.findAccount()}>找回密码</Text>
            </View>
        );
    }

    doReg() {
        this.props.navigate('Reg');
    }

    findAccount() {
        this.props.navigate('FindAccount');
    }

}
const Dimensions = require('Dimensions');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        top: 65,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
