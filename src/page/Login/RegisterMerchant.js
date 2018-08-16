import React, {Component} from 'react';
import {
    Platform,
    View,
    Image,
    Dimensions,
    BackHandler, SafeAreaView
} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {isIphoneX, zAppBarHeight, zdp, zStatusBarHeight} from "../../utils/ScreenUtil";
import MyTextInputWithIcon from "../../common/MyTextInputWithIcon";
import MyButtonView from "../../common/MyButtonView";
import ToastUtil from "../../utils/ToastUtil";
import MyTabView from "../../common/MyTabView";

const {width, height} = Dimensions.get('window');

export default class RegisterMerchant extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordSure: '',
            recommend: ''
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };


    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center'
            }}>

                <KeyboardAwareScrollView
                    style={{
                        flex: 1, backgroundColor: 'white',
                        marginTop: Platform.OS === 'ios' ? -zStatusBarHeight : 0
                    }}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps={'always'}>

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
                        style={{marginTop: zdp(160)}}
                        placeholder={'邀请码,可不填'}
                        iconName={'login_invite'}
                        onChangeText={(text) => {
                            this.setState({
                                recommend: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        placeholder={'用户名'}
                        iconName={'login_user'}
                        onChangeText={(text) => {
                            this.setState({
                                username: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'密码'}
                        iconName={'login_psw'}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />

                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'确认密码'}
                        iconName={'login_psw'}
                        onChangeText={(text) => {
                            this.setState({
                                passwordSure: text
                            })
                        }}
                    />
                    <View style={{
                        width,
                        height: zdp(119.5),
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <MyButtonView modal={1} style={{width: width / 1.3, marginTop: zdp(30)}}
                                      title={'下一步'}
                                      onPress={this.pressNext}/>
                    </View>
                    <MyTabView linear_style={{position: 'absolute'}} title={'注册用户'}
                               isTransparent={true} barStyle={'light-content'}
                               backgroundColor={'transparent'}
                               globalTitleColor={'white'} navigation={this.props.navigation}/>
                </KeyboardAwareScrollView>

            </SafeAreaView>

        );


    }

    pressNext = () => {
        if (this.state.password.length >= 6) {

            if (this.state.password === this.state.passwordSure) {

                this.props.navigation.navigate('RegisterMerchantNext', {
                    registerInfo: {
                        recommend: this.state.recommend,
                        username: this.state.username,
                        password: this.state.password
                    }
                });
            } else {
                ToastUtil.showShort('两次输入密码不统一');
            }
        } else {
            ToastUtil.showShort('密码至少为六位数');
        }

    }
}


