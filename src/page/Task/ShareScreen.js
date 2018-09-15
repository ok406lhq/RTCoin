/**
 * Created by lam Date: 2018/8/31 Time: 下午14.25
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler
} from 'react-native';

const {width, height} = Dimensions.get('window');
import BackgroundPage from '../../common/BackgroundPage';

import {
    Content,
    Icon,
    Card,
    CardItem,
    Text,
    Left,
} from "native-base";
import {StatusBar} from "react-native";
import {zdp, zsp} from "../../utils/ScreenUtil";
import NavBar from "../../common/NavBar";
import ToastUtil from "../../utils/ToastUtil";

var WeChat = require('react-native-wechat');
export default class ShareScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        WeChat.registerApp('wx86715bab7c585603');
        this.state = {
            isShowCard: false
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.returnData(2);
        goBack();
        return true;
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
                <View style={styles.sBar} backgroundColor={'#1D82E2'}/>
                <NavBar title={'邀请好友'}
                        leftIcon={"ios-arrow-back"}
                        leftPress={
                            this.leftPress
                        }
                />
                <Image source={require('../../assets/images/share.png')}
                       style={{width, height, position: 'absolute'}}/>

                <View style={{
                    width: width,
                    height: zdp(80),
                    backgroundColor: '#fffbff99',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: 0,
                    position: 'absolute'
                }}>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={this.wxShare}
                                      style={{
                                          width: width - zdp(40),
                                          height: zdp(45),
                                          justifyContent: 'center',
                                          backgroundColor: 'red',
                                          alignItems: 'center',
                                          borderRadius: zdp(20),
                                          shadowColor: 'grey',
                                          shadowOffset: {width: 0, height: 5},
                                          elevation: zdp(5)
                                      }}>
                        <Text style={{fontSize: zsp(20), color: 'white'}}>
                            立即邀请好友加入
                        </Text>
                    </TouchableOpacity>
                </View>

                {this.state.isShowCard ? <BackgroundPage
                    backgroundColor={this.state.isShowCard ? '#e4e1e177' : 'transparent'}
                    onPress={() => {
                        this.setState({
                            isShowCard: false
                        });
                    }}/> : null}

                {this.state.isShowCard ? this.getCardView() : null}
            </View>);
    }

    leftPress() {
        this.props.navigation.state.params.returnData(2);
        this.props.navigation.goBack();
    }

    wxShare = () => {
        this.setState({
            isShowCard: true
        });
    };

    getCardView = () => {
        // const card =
        return (
            <Content style={{
                width: width - zdp(60),
                marginTop: zdp(150),
                alignSelf: 'center',
                position: 'absolute'
            }} padder>
                <Card style={styles.mb}>
                    <CardItem header bordered>
                        <Text>邀请好友</Text>
                    </CardItem>
                    {this.getButtonCardItem('微信好友', 'logo-googleplus', '#DD5044', () => {
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.shareToSession({type: 'text', description: '测试微信好友分享文本'})
                                        .catch((error) => {
                                            ToastUtil.showShort(error.message);
                                        });
                                } else {
                                    ToastUtil.showShort('没有安装微信软件，请您安装微信之后再试');
                                }
                            });
                        console.log('微信分享');
                    })}

                    {this.getButtonCardItem('朋友圈', 'logo-facebook', '#3B579D', () => {
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.shareToTimeline({
                                        title: '微信朋友圈测试链接',
                                        description: '分享自:江清清的技术专栏(www.lcode.org)',
                                        thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                                        type: 'news',
                                        webpageUrl: 'http://www.lcode.org'
                                    })
                                        .catch((error) => {
                                            ToastUtil.showShort(error.message);
                                        });
                                } else {
                                    ToastUtil.showShort('没有安装微信软件，请您安装微信之后再试');
                                }
                            });
                        console.log('dianji');
                    })}
                </Card>
            </Content>);
    };

    getButtonCardItem = (title, iconName, iconColor, onPress) => {
        return (
            <CardItem button onPress={
                onPress
            }>
                <Left>
                    <Icon
                        active
                        name={iconName}
                        style={{color: iconColor}}
                    />
                    <Text>{title}</Text>
                </Left>
            </CardItem>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    text: {
        alignSelf: "center",
        marginBottom: zdp(7)
    },
    mb: {
        marginBottom: zdp(15)
    },
    sBar: {
        height: StatusBar.currentHeight,
        width: width
    },
});
