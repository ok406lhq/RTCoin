import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, StatusBar, Dimensions, BackHandler} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux'; // 引入connect函数
import * as registerAction from './registerAction';// 导入action方法
import {THEME_BACKGROUND, THEME_TEXT} from '../../assets/css/color';
import CButton from '../../common/button';
import NavBar from "../../common/NavBar";

const {width} = Dimensions.get('window');
// 清空导航记录，跳转到首页
const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
});

class RegPage extends Component {
    static navigationOptions = {
        header: null
    };
    mobile = '';
    password = '';
    password2 = '';

    constructor(props) {
        super(props);
        this.state = {message: ''};
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

    // 状态更新
    shouldComponentUpdate(nextProps, nextState) {
        // 注册成功,切到登录
        if (nextProps.status === '注册成功' && nextProps.isSuccess) {
            this.props.navigation.dispatch(resetAction);
            return false;
        }
        log(nextState);
        return true;
    }

    updateState(key, val) {
        let state = this.state;
        state[key] = val;
        this.setState(state);
    }

    doReg() {
        const {reg} = this.props;
        if (!this.mobile) {
            this.updateState('message', '请输入手机号码');
            return;
        }
        if (!this.password) {
            this.updateState('message', '请输入登录密码');
            return;
        }
        if (!this.password2) {
            this.updateState('message', '请输入确认密码');
            return;
        }
        if (this.password !== this.password2) {
            this.updateState('message', '前后两次密码不一致');
            return;
        }
        reg(this.mobile, this.password);
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <View style={styles.sBar} backgroundColor={'#1E82D2'}/>
                <NavBar
                    title="注册"
                    leftIcon="ios-arrow-back"
                    leftPress={this.leftPress.bind(this)}
                />
                <View style={styles.regPage}>
                    <TextInput style={styles.regInput} placeholder='手机号码' keyboardType={'numeric'}
                               autoCapitalize={'none'} maxLength={20}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => this.mobile = text}/>
                    <TextInput style={styles.regInput} placeholder='密码' secureTextEntry={true}
                               autoCapitalize={'none'} maxLength={20}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => this.password = text}/>
                    <TextInput style={styles.regInput} placeholder='确认密码' secureTextEntry={true}
                               autoCapitalize={'none'} maxLength={20}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => this.password2 = text}/>
                    <CButton style={styles.regInput} title={'提交'} onPress={() => this.doReg()}/>
                    <Text style={styles.message}>{message}</Text>
                    <Text style={{marginTop: 16, fontSize: 12}}>状态: {this.props.status}</Text>
                </View>
            </View>
        )
    }

    leftPress = () => {
        this.props.navigation.goBack();
    };
}

const styles = StyleSheet.create({
    regPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    },
    regInput: {
        marginBottom: 8
    },
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    },
    sBar: {
        height: StatusBar.currentHeight,
        width: width
    },
});

export default connect(
    (state) => ({
        status: state.reg.status,
        isSuccess: state.reg.isSuccess
    }),
    (dispatch) => ({
        reg: (u, p) => dispatch(registerAction.reg(u, p)),
    })
)(RegPage)
