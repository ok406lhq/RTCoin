import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    RefreshControl,
    StatusBar,
    PixelRatio,
    TouchableOpacity,
} from 'react-native';
import px2dp from "../../utils/px2dp";
import Item from "../../common/Item";
import NavBar from "../../common/NavBar";

import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from "react-native-image-picker";

let {width, height} = Dimensions.get('window');
const sHeight = StatusBar.currentHeight;

export default class MinePage extends Component {
    static navigationOptions = {
        tabBarLabel: '我',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/car_sel.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/car_nor.png')}/>
            );
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            avatarSource: null
        };
        this.config = [
            {icon: "ios-person", name: "账户信息", onPress: this.goProfile.bind(this)},
            {icon: "ios-pin", name: "提币地址"},
            // {icon: "ios-heart", name: "我的收藏", color: "#fc7b53"},
            {icon: "ios-pie", name: "货币管理", color: "#fc7b53"},
            {icon: "logo-usd", name: "推荐有奖", subName: "10点算力", color: "#fc7b53"},
            // {icon: "ios-cart", name: "积分商城", subName: "0元好物在这里", color: "#94d94a"},
            // {icon: "ios-medal", name: "银行卡", subName: "未绑定", color: "#ffc636"},
            {icon: "md-flower", name: "支付设置"},
            {icon: "ios-outlet", name: "欢迎评分", color: "#ffc636"},
            {icon: "md-contacts", name: "关于我们"},
        ]
    }

    rightPress() {
        this.props.navigation.navigate('Setting');
    }

    goProfile() {
        this.props.navigation.navigate('UserProfile');
    }

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 1500)
    }

    _renderListItem() {
        return this.config.map((item, i) => {
            if (i % 3 === 0) {
                item.first = true
            }
            return (<Item key={i} {...item}/>)
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <StatusBar
                    translucent={true}
                    animated={true}
                />
                <View style={styles.sBar} backgroundColor={'#1E82D2'}/>
                <NavBar
                    title="我的"
                    // leftIcon="ios-notifications-outline"
                    // leftPress={this.leftPress.bind(this)}
                    rightIcon="ios-settings-outline"
                    rightPress={this.rightPress.bind(this)}
                />
                <View
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#fff"
                            colors={['#ddd', '#0398ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }>

                    <View style={{
                        minHeight: height - 64 - px2dp(46),
                        paddingBottom: 60,
                        backgroundColor: "#f3f3f3"
                    }}>
                        <View style={styles.userHead}>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <TouchableOpacity onPress={this._onPress.bind(this)}>
                                    <View
                                        style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                                        {this.state.avatarSource === null ?
                                            <Image style={styles.avatar}
                                                   source={require('../../img/i_user.png')}/> :
                                            <Image style={styles.avatar}
                                                   source={this.state.avatarSource}/>
                                        }
                                    </View>
                                </TouchableOpacity>

                                <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                    <Text style={{
                                        color: "#fff",
                                        fontSize: px2dp(18)
                                    }}>RuiTong</Text>
                                    <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                                        <Icon name="ios-phone-portrait-outline" size={px2dp(14)}
                                              color="#fff"/>
                                        <Text style={{
                                            color: "#fff",
                                            fontSize: 13,
                                            paddingLeft: 5
                                        }}>135****0418</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View>
                            {this._renderListItem()}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    _onPress() {
        const options = {
            title: "选择图片",
            cancelButtonTitle: "取消",
            chooseFromLibraryButtonTitle: "从相册中选择",
            takePhotoButtonTitle: "拍照",
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    logout() {
        this.props.navigation.navigate('Login');
    }
}
const styles = StyleSheet.create({
    scrollView: {
        marginBottom: px2dp(5),
        backgroundColor: "#1E82D2"
    },
    sBar: {
        height: sHeight,
        width: width
    },
    userHead: {
        paddingBottom: 5,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#1E82D2"
    },
    numbers: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 74
    },
    numItem: {
        flex: 1,
        height: 74,
        justifyContent: "center",
        alignItems: "center"
    },
    tabBarIcon: {
        width: 19,
        height: 19
    },
    quitContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    avatarContainer: {
        borderColor: '#1E82D2',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 60,
        height: 60
    }
});
