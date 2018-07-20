import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    RefreshControl,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import px2dp from "../../utils/px2dp";
import Item from "../../common/Item";
import NavBar from "../../common/NavBar";

import Icon from 'react-native-vector-icons/Ionicons'
import CButton from "../../common/button";

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
        super(props)
        this.state = {
            isRefreshing: false
        }
        this.config = [
            {icon: "ios-pin", name: "提币地址"},
            {icon: "ios-heart", name: "我的收藏", color: "#fc7b53"},
            {icon: "ios-pie", name: "货币管理"},
            {icon: "logo-usd", name: "推荐有奖", subName: "10点算力", color: "#fc7b53"},
            {icon: "ios-cart", name: "积分商城", subName: "0元好物在这里", color: "#94d94a"},
            {icon: "ios-medal", name: "银行卡", subName: "未绑定", color: "#ffc636"},
            {icon: "md-flower", name: "支付设置"},
            {icon: "ios-outlet", name: "欢迎评分"},
            {icon: "md-contacts", name: "关于我们"},
        ]
    }

    leftPress() {

    }

    rightPress() {

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
            if (i % 3 == 0) {
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
                    leftIcon="ios-notifications-outline"
                    leftPress={this.leftPress.bind(this)}
                    rightIcon="ios-settings-outline"
                    rightPress={this.rightPress.bind(this)}
                />
                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#fff"
                            colors={['#ddd', '#0398ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                    <View style={{
                        minHeight: height - 64 - px2dp(46),
                        paddingBottom: 100,
                        backgroundColor: "#f3f3f3"
                    }}>
                        <TouchableWithoutFeedback onPress={this.goProfile.bind(this)}>
                            <View style={styles.userHead}>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Image source={require('../../img/i_user.png')} style={{
                                        width: px2dp(60),
                                        height: px2dp(60),
                                        borderRadius: px2dp(30)
                                    }}/>
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
                                <Icon name="ios-arrow-forward-outline" size={px2dp(22)}
                                      color="#fff"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.numbers}>
                            <TouchableWithoutFeedback>
                                <View style={styles.numItem}>
                                    <Text style={{
                                        color: "#f90",
                                        fontSize: 18,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}>{"1096.9(元)"}</Text>
                                    <Text style={{
                                        color: "#333",
                                        fontSize: 12,
                                        textAlign: "center",
                                        paddingTop: 5
                                    }}>{"余额"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={[styles.numItem, {
                                    borderLeftWidth: 1,
                                    borderLeftColor: "#f5f5f5",
                                    borderRightWidth: 1,
                                    borderRightColor: "#f5f5f5"
                                }]}>
                                    <Text style={{
                                        color: "#ff5f3e",
                                        fontSize: 18,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}>{"1940"}</Text>
                                    <Text style={{
                                        color: "#333",
                                        fontSize: 12,
                                        textAlign: "center",
                                        paddingTop: 5
                                    }}>{"粉丝"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={styles.numItem}>
                                    <Text style={{
                                        color: "#6ac20b",
                                        fontSize: 18,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}>{"495"}</Text>
                                    <Text style={{
                                        color: "#333",
                                        fontSize: 12,
                                        textAlign: "center",
                                        paddingTop: 5
                                    }}>{"积分"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            {this._renderListItem()}
                        </View>
                        <View margin={px2dp(15)}>
                            <CButton title={'注销'} onPress={() => this.logout()}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
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
        justifyContent: "space-between",
        alignItems: "center",
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
        width: 20,
        height: 20
    },
    quitContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});
