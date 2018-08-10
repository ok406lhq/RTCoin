import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    ActivityIndicator,
    View,
    StatusBar,
    Image,
    Platform,
    Keyboard,
} from 'react-native';
import {checkMobile} from "../utils/CheckUitls";
import {fetchRequest} from "../utils/FetchUtil";
import ToastUtil from "../utils/ToastUtil";
import {SPReadLoginInfo, SPSaveLoginInfo} from "../storage/Storage";
import MyTextInputWithIcon from "./MyTextInputWithIcon";
import {
    isIphoneX,
    zAppBarHeight,
    zdp,
    zHeight,
    zsp,
    zStatusBarHeight,
    zWidth
} from "../utils/ScreenUtil";
import {cusColors} from "../utils/cusColors";
import ZText from "./ZText";
import MyButtonView from "./MyButtonView";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import bgSrc from "../../android/app/src/main/res/drawable-xhdpi/login_bg.jpg";


const Dimensions = require('Dimensions');
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            phone: '',
            password: ''
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

    componentDidMount() {
        // this.pressLogin();
        // alert(zStatusBarHeight);
        SPReadLoginInfo()
            .then(res => {
                console.log(res);
                this.setState({
                    phone: res.phone,
                    // password: res.password
                })

                //todo DEV
                /*  if (InitConfig.isLoginDirect) {
                      setTimeout(()=>{
                      this.pressLogin()
                      },1000)
                  }*/
            }).catch(err => {

        })
    }

    static defaultProps = {
        onPress: null
    };

    _onPress() {
        Keyboard.dismiss();

        if (!checkMobile(this.state.phone)) {
            return;
        }

        let formData = new FormData();
        formData.append('phone', this.state.phone);
        formData.append('password', this.state.password);
        fetchRequest('Login', 'POST', formData)
            .then(res => {
                    console.log(res);
                    console.log(res.data);

                    if (res.respCode === 200 && !this.state.isLoading) {
                        console.log(res.data);
                        if (this.state.isLoading) return;

                        this.setState({isLoading: true});
                        SPSaveLoginInfo(this.state.phone, this.state.password);
                        this.props.navigate('Home');
                        Animated.timing(this.buttonAnimated, {
                            toValue: 1,
                            duration: 200,
                            easing: Easing.linear,
                        }).start();

                        setTimeout(() => {
                            this._onGrow();
                        }, 2000);

                        setTimeout(() => {
                            this.props.navigate('Home');
                            this.setState({isLoading: false});
                            this.buttonAnimated.setValue(0);
                            this.growAnimated.setValue(0);
                        }, 2300);
                    } else {
                        ToastUtil.showShort(res.respMsg);
                    }
                }
            ).catch(err => {
            console.log(err);
            ToastUtil.showShort(err);
        });
    }

    _onGrow() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN],
        });
        return (
            <KeyboardAwareScrollView style={{flex: 1, width: zWidth, backgroundColor: 'white'}}
                                     behavior="padding"
                                     resetScrollToCoords={{x: 0, y: 0}}
                                     contentContainerStyle={{
                                         justifyContent: 'flex-start',
                                         alignItems: 'center'
                                     }}
                                     scrollEnabled={false}
                                     showsVerticalScrollIndicator={false}
                                     keyboardShouldPersistTaps={'always'}>
                <View style={{
                    flex: 1,
                    marginTop: Platform.OS === 'ios' ? -zStatusBarHeight : 0,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Image source={{uri: isIphoneX() ? 'login_bg_x' : 'login_bg'}}
                           resizeMode={'cover'}
                           style={{
                               width: DEVICE_WIDTH,
                               height: zHeight,
                               position: 'absolute'
                           }}/>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                    <View
                        style={{flex: 1, alignItems: 'center'}}>

                        <StatusBar
                            hidden={false}
                            translucent={true}
                            barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                            backgroundColor={'#fff6fd00'}
                            networkActivityIndicatorVisible={false}
                        />

                        <Image source={require('../img/logo2.png')}
                               style={{
                                   width: zdp(140),
                                   height: zdp(80),
                                   marginTop: zAppBarHeight + zdp(26)
                               }}
                               resizeMode={'contain'}/>

                    </View>
                </View>
                <MyTextInputWithIcon
                    style={{marginTop: zdp(160)}}
                    maxLength={11}
                    placeholder={'请输入手机号'}
                    keyboardType={'numeric'}
                    iconName={'login_phone'}
                    defaultValue={this.state.phone}
                    onChangeText={text => {
                        this.setState({
                            phone: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    secureTextEntry={true}
                    placeholder={'密码登录'}
                    defaultValue={this.state.password}
                    // keyboardType={'email-address'}
                    iconName={'login_psw'}
                    onChangeText={text => {
                        this.setState({
                            password: text
                        })
                    }}
                />
                <Animated.View style={{width: DEVICE_WIDTH / 3, marginTop: zdp(40)}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this._onPress();
                        }}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                            <ActivityIndicator style={styles.button} size="small" color="#EF0B53"/>
                        ) : (
                            <Text style={styles.text}>登录</Text>
                        )}
                    </TouchableOpacity>
                    <Animated.View
                        style={[styles.circle, {transform: [{scale: changeScale}]}]}
                    />
                </Animated.View>
                <View style={styles.wtf}>
                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center', alignItems: 'center',
                                          padding: zdp(5)
                                      }}
                                      onPress={
                                          this.pressLoginByVerify
                                      }>
                        <Text style={styles.stext}>短信登陆</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center', alignItems: 'center',
                                          padding: zdp(10)
                                      }}
                                      onPress={
                                          this.pressForgetPsw
                                      }>
                        <Text style={styles.stext}>忘记密码</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: zdp(0),
                    marginTop: zdp(80)
                }}>
                    <ZText content={'没有账号?'} fontSize={zsp(16)}
                           color={cusColors.text_secondary}/>
                    <MyButtonView style={{width: zdp(80), height: zdp(30), marginTop: zdp(0)}}
                                  modal={1}
                                  title={'注册账号'}
                                  fontSize={zsp(16)}
                                  onPress={this.pressRegister.bind(this)}/>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    pressLoginByVerify = () => {
        this.props.navigate('LoginByVerify')
    };
    pressForgetPsw = () => {
        this.props.navigate('ForgetPsw')
    };
    pressRegister = () => {
        this.props.navigate('RegisterMerchant')
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00B0EC',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#1E82D2',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#1E82D2',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
    wtf: {
        marginTop: zdp(15),
        top: zdp(5),
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    stext: {
        fontSize: zsp(16),
        color: cusColors.text_secondary
    }
});

