/**
 * Created by lam Date: 2018/8/11 Time: 下午2:14
 */
import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler
} from 'react-native';

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {
    isIphoneX,
    zAppBarHeight,
    zdp,
    zsp,
} from "../../utils/ScreenUtil";

import CountdownUtil from "../../utils/CountdownUtil";
import MyTextInputWithIcon from "../../common/MyTextInputWithIcon";
import {cusColors} from "../../utils/cusColors";
import {pressVerify} from "../../utils/smsVerifyUtil";
import ZText from "../../common/ZText";
import MyButtonView from "../../common/MyButtonView";
import MyTabView from "../../common/MyTabView";
import {checkMobile} from "../../utils/CheckUitls";
import {fetchRequest} from "../../utils/FetchUtil";
import ToastUtil from "../../utils/ToastUtil";

const {width, height} = Dimensions.get('window');

export default class ForgetPsw extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            verifyCode: '',
            passwordNew: '',
            passwordSure: '',
            isSentVerify: true,
            timerTitle: '获取验证码',
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        CountdownUtil.stop();
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };


    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>

                <KeyboardAwareScrollView
                    style={{flex: 1, backgroundColor: 'transparent'}}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps={'always'}
                >

                    <Image source={{uri: isIphoneX() ? 'login_bg_x' : 'login_bg'}}
                           resizeMode={'cover'}
                           style={{
                               width,
                               height: height,
                               position: 'absolute',
                           }}/>


                    <Image source={require('../../img/logo2.png')}
                           style={{
                               width: zdp(140),
                               height: zdp(80),
                               marginTop: zAppBarHeight + zdp(40)
                           }}
                           resizeMode={'contain'}/>

                    <MyTextInputWithIcon
                        style={{marginTop: zdp(140)}}

                        placeholder={'请输入手机号'}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            this.setState({
                                phone: text
                            })
                        }} iconName={'login_phone'}/>


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


                    <MyTextInputWithIcon
                        placeholder={'请输入新密码'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                passwordNew: text
                            })
                        }} iconName={'login_psw'}/>

                    <MyTextInputWithIcon
                        placeholder={'确认密码'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                passwordSure: text
                            })
                        }} iconName={'login_psw'}/>


                    <View style={{
                        flex: 1,
                        width: width,
                        height: zdp(138.5),
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <MyButtonView
                            modal={1}
                            style={{width: width / 1.3, marginTop: zdp(30)}}
                            title={'确认修改'}
                            onPress={this.pressSureChange}/>
                    </View>

                    <MyTabView linear_style={{position: 'absolute'}}
                               isTransparent={true} title={'忘记密码'} barStyle={'light-content'}
                               backgroundColor={'transparent'}
                               globalTitleColor={'white'} navigation={this.props.navigation}/>

                </KeyboardAwareScrollView>
            </View>
        );
    }

    /**
     * 确认修改
     */
    pressSureChange = () => {

        if (!checkMobile(this.state.phone)) {
            return;
        }

        console.log('确认修改');
        let formData = new FormData();
        formData.append('phone', this.state.phone);
        formData.append('password', this.state.passwordNew);
        formData.append('code', this.state.verifyCode);

        fetchRequest('Reset', 'POST', formData)
            .then(res => {
                console.log(res);
                if (res.respCode === 200) {
                    CountdownUtil.stop();
                    this.props.navigation.navigate('RegisterSuccess', {type: 0});
                } else {
                    ToastUtil.showShort(res.respMsg)
                }
            }).then(err => {
            console.log(err);
            // ToastUtil.showShort(err)

        });

    }
}