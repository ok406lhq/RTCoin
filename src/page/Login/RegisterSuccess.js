/**
 * Created by lam Date: 2018/8/11 Time: 下午3:07
 */
import ZText from "../../common/ZText";

const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import {
    View,
    Image,
    Dimensions,
    StatusBar, BackHandler
} from 'react-native';
import MyButtonView from "../../common/MyButtonView";
import {isIphoneX, zdp, zsp} from "../../utils/ScreenUtil";
import {cusColors} from "../../utils/cusColors";
import {fetchRequest} from "../../utils/FetchUtil";
import ToastUtil from "../../utils/ToastUtil";


export default class RegisterSuccess extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //type:0 //忘记密码  1 // 注册成功
        this.params = this.props.navigation.state.params;
        // this.params = {type: 1};
        console.log(this.params.type);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        return true;
    };


    render() {
        return (

            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                <Image source={{uri: isIphoneX() ? 'bg_success' : 'bg_success'}}
                       resizeMode={'cover'}
                       style={{
                           width,
                           height: height,
                           position: 'absolute'
                       }}/>

                <StatusBar
                    hidden={false}
                    translucent={true}
                    barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                    backgroundColor={'#fff6fd00'}
                    networkActivityIndicatorVisible={false}
                />


                <ZText content={`${this.params.type === 0 ? '密码修改成功' : '注册成功'}`}
                       parentStyle={{
                           width: width,
                           marginTop: zdp(80),
                           backgroundColor: 'transparent',
                           justifyContent: 'center',
                           alignItems: 'center'
                       }}
                       fontSize={zsp(30)}
                       color={cusColors.text_secondary}/>

                <View style={{flex: 1}}/>

                <MyButtonView modal={1} style={{marginBottom: zdp(70)}} title={'完 成'}
                              onPress={this.pressSuccess}/>

            </View>


        )
    }

    pressSuccess = () => {
        if (this.params.type === 0) {
            this.props.navigation.navigate('Login');
        } else {
            let formData = new FormData();
            formData.append('phone', this.params.phone);
            formData.append('password', this.params.password);
            fetchRequest('Login', 'POST', formData)
                .then(res => {
                    if (res.respCode === 200) {
                        this.props.navigation.navigate('Home');
                    } else {
                        ToastUtil.showShort(res.respCode)
                    }
                }).catch(err => {
                // ToastUtil.showShort(err);
            })

        }
    }
}


