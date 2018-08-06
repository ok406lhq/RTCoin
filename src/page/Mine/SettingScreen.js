/**
 * @author lam
 * @date 2018/7/25 11:29
 */

import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StatusBar,
    Dimensions,
    StyleSheet, BackHandler
} from 'react-native';
import NavBar from "../../common/NavBar";
import Item from "../../common/Item";

const {width} = Dimensions.get('window');

export default class SettingScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <View style={styles.sBar} backgroundColor={'#1E82D2'}/>
                <NavBar
                    title="设置"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <ScrollView>
                    <Item name="账户安全" first={true} onPress={this.goProfile.bind(this)}/>
                    <Item name="通用"/>
                    <Item name="关于招财猫" first={true}/>
                    <Item.Button name="退出登录" first={true} onPress={this.logout.bind(this)}/>
                </ScrollView>
            </View>
        );
    }

    goProfile() {
        this.props.navigation.navigate("UserProfile");
    }

    back() {
        this.props.navigation.goBack();
    }

    logout() {
        this.props.navigation.navigate('Login');
    }
}

const styles = StyleSheet.create({
    sBar: {
        height: StatusBar.currentHeight,
        width: width
    }
});