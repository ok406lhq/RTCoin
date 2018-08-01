import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    StatusBar,
    Dimensions, BackHandler
} from 'react-native';
import {THEME_BACKGROUND, THEME_TEXT} from '../../assets/css/color';
import CButton from '../../common/button';
import NavBar from "../../common/NavBar";

const {width} = Dimensions.get('window');

export class FindAccountPage extends Component {
    static navigationOptions = {
        header: null
    };
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
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        this.timer && clearInterval(this.timer);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

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
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <View style={styles.sBar} backgroundColor={'#1E82D2'}/>
                <NavBar
                    title="找回密码"
                    leftIcon="ios-arrow-back"
                    leftPress={this.leftPress.bind(this)}
                />
                <KeyboardAvoidingView
                    style={styles.regPage}
                    behavior="margin">
                    <TextInput style={styles.regInput} placeholder='手机号码' keyboardType={'numeric'}
                               autoCapitalize={'none'} maxLength={11}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => this.mobile = text}/>
                    <View style={[styles.codeRow, styles.regInput]}>
                        <TextInput style={{flex: 1}} placeholder='手机验证码' keyboardType={'numeric'}
                                   autoCapitalize={'none'} maxLength={6}
                                   underlineColorAndroid={'transparent'}
                                   onChangeText={(text) => this.code = text}/>
                        <CButton disabled={this.state.sendFlag}
                                 style={codeBtnStyle} title={codeBtnText}
                                 onPress={() => this.getCode()}/>
                    </View>
                    <TextInput style={styles.regInput} placeholder='密码' secureTextEntry={true}
                               autoCapitalize={'none'} maxLength={20}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => this.password = text}/>
                    <TextInput style={styles.regInput} placeholder='确认密码' secureTextEntry={true}
                               autoCapitalize={'none'} maxLength={20}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => this.password2 = text}/>
                    <CButton style={styles.regInput} title={'找回密码'}
                             onPress={() => this.doSubmit()}/>
                    <Text style={styles.message}>{message}</Text>
                    <View style={{height: 40}}/>
                </KeyboardAvoidingView>
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
    },
    sBar: {
        height: StatusBar.currentHeight,
        width: width
    },
});
