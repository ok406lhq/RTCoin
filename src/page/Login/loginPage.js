import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput,StatusBar} from 'react-native';
import {connect} from 'react-redux'; // 引入connect函数
import * as loginAction from './loginAction';// 导入action方法
import {NavigationActions, StackActions} from 'react-navigation';
import {THEME_BACKGROUND, THEME_LABEL, THEME_TEXT} from '../../assets/css/color';
import CButton from '../../common/button';

// 清空导航记录，跳转到首页
const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Main'})
    ]
});

class LoginPage extends Component {
    static navigationOptions = {
        header: null
    };


    mobile = '13510005217';
    password = '123456';

    constructor(props) {
        super(props);
        this.state = {message: ''};
    }

    componentWillMount() {
        this.checkHasLogin();
    }

    checkHasLogin() {
        storage.load({key: 'user', autoSync: false,}).then(ret => {
            if (ret && ret.name) {
                this.props.navigation.dispatch(resetAction);
            }
        }).catch((err => {
            console.warn((err.message));
        }))
    }

    // 状态更新，判断是否登录并作出处理
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成,切成功登录
        if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
            // this.props.navigation.dispatch(resetAction);
            // this.checkHasLogin();
            return false;
        }
        return true;
    }

    updateState(key, val) {
        let state = this.state;
        state[key] = val;
        this.setState(state);
    }

    doLogin() {
        const {login} = this.props;
        if (!this.mobile) {
            this.updateState('message', '请输入手机号码');
            return;
        }
        if (!this.password) {
            this.updateState('message', '请输入密码');
            return;
        }
        login(this.mobile, this.password);
        this.props.navigation.navigate('Main');
    }

    doReg() {
        this.props.navigation.navigate('Reg');
    }

    findAccount() {
        this.props.navigation.navigate('FindAccount');
    }

    render() {
        const {login} = this.props;
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={styles.loginPage}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <View style={styles.loginSection}>
                    <Text style={styles.loginTitle}>招财猫 1.0</Text>
                    <TextInput style={styles.loginInput} placeholder='手机号码' keyboardType={'numeric'}
                               defaultValue={this.mobile} autoCapitalize={'none'} maxLength={11}
                               onChangeText={(text) => this.mobile = text}/>
                    <TextInput style={styles.loginInput} placeholder='password'
                               secureTextEntry={true}
                               defaultValue={this.password} autoCapitalize={'none'} maxLength={20}
                               onChangeText={(text) => this.password = text}/>
                    <CButton style={styles.loginInput} title={'登录'} onPress={() => this.doLogin()}/>
                    <View style={styles.subButton}>
                        <Text style={styles.subButtonText} onPress={() => this.doReg()}>免费注册</Text>
                        <Text style={styles.subButtonText}
                              onPress={() => this.findAccount()}>找回密码</Text>
                    </View>
                    <Text style={styles.message}>{message}</Text>
                    <Text style={{marginTop: 16, fontSize: 12}}>状态: {this.props.status}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    },
    loginSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    loginTitle: {
        fontSize: 28,
        fontWeight: '500',
        color: THEME_LABEL,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32
    },
    subButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    subButtonText: {
        color: THEME_TEXT,
        fontSize: 14
    },
    loginInput: {
        marginBottom: 8
    },
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    }
});

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user,
    }),
    (dispatch) => ({
        login: (m, p) => dispatch(loginAction.login(m, p)),
    })
)(LoginPage)
