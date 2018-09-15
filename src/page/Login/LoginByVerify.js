import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Keyboard,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler
} from 'react-native';
import CountdownUtil from "../../utils/CountdownUtil";
import {isIphoneX, zAppBarHeight, zdp, zsp} from "../../utils/ScreenUtil";
import MyTabView from "../../common/MyTabView";
import MyTextInputWithIcon from "../../common/MyTextInputWithIcon";
import {cusColors} from "../../utils/cusColors";
import {pressVerify} from "../../utils/smsVerifyUtil";
import MyButtonView from "../../common/MyButtonView";
import {checkMobile} from "../../utils/CheckUitls";
import ToastUtil from "../../utils/ToastUtil";
import {fetchRequest} from "../../utils/FetchUtil";
import ZText from "../../common/ZText";

const {width, height} = Dimensions.get('window');

// import storage from '../../storage/Storage'
export default class LoginByVerify extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);


        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '获取验证码',
            isSuccess: false
        };

        // this.props.initGlobalInfo({
        //         //     phone: '1326297',
        //         //     token: 'ajsda3812323qwsdq42'
        //         // })
    }


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        CountdownUtil.stop();
    }


    onBackPress = () => {           // return true   拦截  不让退出
        this.props.navigation.goBack();
        return true;
    };

    render() {
        // this.removeData();

        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={{uri: isIphoneX() ? 'login_bg_x' : 'login_bg'}}
                       resizeMode={'cover'}
                       style={{
                           width,
                           height,
                           position: 'absolute'
                       }}/>


                <MyTabView title={'验证码登录'} isTransparent={true} backgroundColor={'transparent'}
                           globalTitleColor={'white'} barStyle={'light-content'}
                           navigation={this.props.navigation}/>


                <View
                    style={{flex: 1, alignItems: 'center'}}>

                    <Image source={require('../../img/logo2.png')}
                           style={{
                               width: zdp(140),
                               height: zdp(100),
                               marginTop: zdp(100) - zAppBarHeight
                           }}
                           resizeMode={'contain'}/>

                    <MyTextInputWithIcon
                        style={{marginTop: zdp(140)}}
                        placeholder={'请输入手机号'}
                        iconName={'login_phone'}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            this.setState({
                                phone: text
                            })
                        }}/>

                    <View style={{
                        width: width / 1.3,
                        height: zdp(50),
                        marginTop: zdp(20),
                        borderWidth: 1,
                        borderRadius: zdp(5),
                        borderColor: 'white',
                        backgroundColor: cusColors.inputBackgroundColor,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <MyTextInputWithIcon
                            style={{flex: 1, height: zdp(50), borderWidth: 0, marginTop: 0}}
                            placeholder={'请输入验证码'}
                            keyboardType={'numeric'}
                            maxLength={6}
                            onChangeText={(text) => {
                                this.setState({
                                    verifyCode: text
                                })
                            }} iconName={'login_verify'}/>


                        <TouchableOpacity activeOpacity={this.state.isSentVerify ? 0.5 : 1}
                                          onPress={() => {
                                              pressVerify(this.state.phone, this.state.isSentVerify,
                                                  () => {
                                                      console.log('回调1');
                                                      this.setState({
                                                          isSentVerify: false,
                                                      });
                                                  }
                                                  , (time) => {
                                                      console.log(time.sec);
                                                      this.setState({
                                                          timerTitle: time.sec > 0 ? `重新获取(${time.sec}s)` : '重新获取'
                                                      }, () => {
                                                          if (this.state.timerTitle === '重新获取') {
                                                              console.log('回调2');
                                                              this.setState({
                                                                  isSentVerify: true
                                                              })
                                                          }
                                                      })
                                                  }, () => {
                                                      console.log('回调3');
                                                      this.setState({
                                                          isSentVerify: true,
                                                          timerTitle: '重新获取'
                                                      });
                                                  })
                                          }}>
                            <View style={{
                                height: zdp(50),
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingRight: zdp(20),
                            }}>
                                <ZText content={this.state.timerTitle}
                                       color={this.state.isSentVerify ? cusColors.verify_light : this.state.timerTitle.indexOf('s') > -1 ? cusColors.verify_dark : cusColors.verify_light}
                                       fontSize={zsp(16)}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <MyButtonView
                        modal={1}
                        style={{width: width / 1.3, marginTop: zdp(30)}}
                        title={'登录'}
                        onPress={this.pressLogin}/>
                </View>
            </View>
        );
    }

    pressLogin = () => {

        if (!checkMobile(this.state.phone)) {
            return;
        }

        Keyboard.dismiss();
        // this.props.navigation.navigate('TransactionRecord');
        // dismissKeyboard();
        // fetchRequest('http://localhost:8080/ThirdServlet','POST',formData)
        if (this.state.verifyCode.length < 4) {
            ToastUtil.showShort('验证码长度错误')
        } else {
            let formData = new FormData();
            // formData.append('phone', this.state.phone);
            // formData.append('code', this.state.verifyCode);
            formData.append('phone', this.state.phone);
            formData.append('code', this.state.verifyCode);
            fetchRequest('Login', 'POST', formData)
                .then(res => {
                        console.log(res);
                        console.log(res.data);
                        if (res.respCode === 200) {
                            CountdownUtil.stop();

                            this.props.navigation.navigate('Video');

                        } else {
                            ToastUtil.showShort(res.respMsg);
                        }
                    }
                ).then(err => {

                console.log(err);
            });
        }
    }
}

LoginByVerify.propTypes = {
    phone: PropTypes.string
};


