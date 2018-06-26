import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {THEME, THEME_BACKGROUND, THEME_TEXT} from '../../assets/css/color';
import {getStackOptions} from '../../common/navigatorOpts';
import CButton from '../../common/button';

// 清空导航记录，跳转到首页
// const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [
//         NavigationActions.navigate({routeName: 'Login'})
//     ]
// });

export class FindAccountPage extends Component {
    static navigationOptions = getStackOptions('找回密码');
    mobile = '';
    code = '';
    password = '';
    password2 = '';
    timer;

    constructor(props) {
        super(props);
        this.state = {message: '', sendFlag: false, second: 30};
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    getCode() {
        if (!this.mobile) {
            this.updateState('message', '请输入手机号码');
            return;
        }
        if (this.state.sendFlag) {
            this.updateState('message', '操作过于频繁');
            return;
        }
        // 倒计时30s
        this.updateState('sendFlag', true);
        this.timer = setInterval(
            () => {
                if (this.state.second <= 0) {
                    this.updateState('second', 0);
                    this.updateState('sendFlag', false);
                    this.timer && clearInterval(this.timer);
                } else {
                    this.updateState('second', this.state.second - 1);
                }
            },
            1000
        );

    }

    updateState(key, val) {
        let state = this.state;
        state[key] = val;
        this.setState(state);
    }

    doSubmit() {
        if (!this.mobile) {
            this.updateState('message', '请输入手机号码');
            return;
        }
        if (!this.code) {
            this.updateState('message', '请输入手机验证码');
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
        this.goBack();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        let codeBtnText = this.state && this.state.sendFlag && this.state.second ? '已发送' + this.state.second + 's' : '获取验证码';
        let codeBtnStyle = this.state && this.state.sendFlag ? styles.codeBtnDisabled : styles.codeBtn;
        return (

            <View style={styles.regPage}>
                <TextInput style={styles.regInput} placeholder='手机号码' keyboardType={'numeric'}
                           autoCapitalize={'none'} maxLength={11}
                           onChangeText={(text) => this.mobile = text}/>
                <View style={[styles.codeRow, styles.regInput]}>
                    <TextInput style={{flex: 1}} placeholder='手机验证码' keyboardType={'numeric'}
                               autoCapitalize={'none'} maxLength={6}
                               onChangeText={(text) => this.code = text}/>
                    <CButton disabled={this.state.sendFlag}
                             style={codeBtnStyle} title={codeBtnText}
                             onPress={() => this.getCode()}/>
                </View>
                <TextInput style={styles.regInput} placeholder='密码' secureTextEntry={true}
                           autoCapitalize={'none'} maxLength={20}
                           onChangeText={(text) => this.password = text}/>
                <TextInput style={styles.regInput} placeholder='确认密码' secureTextEntry={true}
                           autoCapitalize={'none'} maxLength={20}
                           onChangeText={(text) => this.password2 = text}/>
                <CButton style={styles.regInput} title={'找回密码'} onPress={() => this.doSubmit()}/>
                <Text style={styles.message}>{message}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    regPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 100,
        backgroundColor: THEME_BACKGROUND
    },
    regInput: {
        marginBottom: 8
    },
    codeRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeBtn: {flexBasis: 120},
    codeBtnDisabled: {flexBasis: 120, backgroundColor: THEME_TEXT},
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    }
});
