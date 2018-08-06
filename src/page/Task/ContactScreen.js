/**
 * Created by lam on 2018/7/11.
 */

import React, {Component} from 'react';
import {
    BackHandler,
    Text,
    StyleSheet,
    View,
    Alert,
    StatusBar,
    Dimensions, Platform
} from 'react-native';
import ContactPickerBridge from 'react-native-contacts-picker';
import NavBar from "../../common/NavBar";
import px2dp from "../../utils/px2dp";

const {width} = Dimensions.get('window');
export default class ContactScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <View style={styles.sBar} backgroundColor={'#fff'}/>
                <NavBar
                    title='通讯录'
                    titleStyle={styles.titleStyle}
                    style={styles.style}
                />
                <View style={styles.container}>
                    <Text style={styles.welcome} onPress={this.openContactPicker}>打开通讯录选择器</Text>
                    <Text style={styles.welcome} onPress={this.getAllContact}>获取全部通讯录</Text>
                    <Text style={styles.welcome}
                          onPress={this.checkContactPermissions}>是否有通讯录权限</Text>
                </View>
            </View>
        );
    }

    leftPress = () => {
        this.props.navigation.goBack();
    };

    openContactPicker = () => {
        ContactPickerBridge.openContactPicker((result) => {
            console.log('openContactPicker ---->', JSON.stringify(result));
            console.log(result.data.name + "：" + result.data.phone);
            Alert.alert('选择的联系人和电话号码', result.data.name + "：" + result.data.phone);
        });
    };

    getAllContact = () => {
        ContactPickerBridge
            .getAllContact((result) => {
                console.log('getAllContact ---->', JSON.stringify(result));
                for (let i = 0; i < result.data.length; i++) {
                    console.log('datas:', result.data[i].phoneArray[0] + ":" + result.data[i].name);
                }
                console.log(result.data.length);
            });
    };

    checkContactPermissions = () => {
        ContactPickerBridge
            .checkContactPermissions((result) => {
                console.log('getAllContact ---->', JSON.stringify(result));
            });
    };

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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    titleStyle: {
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    sBar: {
        width: width,
        height: StatusBar.currentHeight
    },
    style: {
        height: NavBar.topbarHeight,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        paddingHorizontal: px2dp(10)
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
