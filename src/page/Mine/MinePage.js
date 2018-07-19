import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import {StackActions, NavigationActions} from "react-navigation";
import CButton from '../../common/button';


const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

// 清空导航记录，跳转到登录页
const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
});

export default class MinePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rotation: new Animated.Value(0),
            scale: new Animated.Value(1),
            translateY: new Animated.Value(10),
            opacity: new Animated.Value(0),
        }
    }

    static navigationOptions = {
        tabBarLabel: '我',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/car_sel.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/cat_nor.png')}/>
            );
        },
    };
    settingData = [
        {
            leftText: '订单管理',
            rightText: '管理我的订单/交易',
            onPress() {
                alert(123)
            }
        },
        {
            leftText: '关于我们',
        },
        {
            leftText: '资产管理',
            rightText: '管理资产，方便转入准出',
        },
        {
            leftText: '绑定银行卡',
        },
        {
            leftText: '支付设置',
        },
        {
            leftText: '安全设置',
        },
        {
            leftText: '实名认证',
        },
        // {
        //     leftText: '退出登录',
        //     isShowUnderline: false,
        //     onPress(){
        //         global.storage.remove({key: 'user'});
        //         this.props.navigation.dispatch(resetAction)
        //     }
        // }
    ]

    componentDidMount() {
        //顺序执行
        Animated.sequence([
            //随着时间发展执行
            Animated.timing(
                this.state.rotation, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear,
                }
            ),
            Animated.timing(
                this.state.scale, {
                    toValue: 1.3,
                    duration: 600,
                }
            ),
            //同时执行
            Animated.parallel([
                Animated.timing(
                    this.state.scale, {
                        toValue: 1,
                        duration: 500,
                    }
                ),
                Animated.timing(
                    this.state.opacity, {
                        toValue: 1,
                        duration: 1000,
                    }
                ),
                Animated.timing(
                    this.state.translateY, {
                        toValue: 0,
                        duration: 600,
                    }
                )
            ])
        ])
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                {/* 头部 */}
                <View style={styles.headContainer}>
                    {/* 夜间/设置 */}
                    <View style={styles.headTopContainer}>
                        <TouchableOpacity style={styles.topBtnStyle} activeOpacity={0.9}
                                          onPress={() => {
                                              alert('设置')
                                          }}>
                            <Image source={require('../../img/setting.png')}
                                   style={styles.headTopImg}/>
                            <Text style={styles.headTopText}>设置</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 头像、昵称、标签 */}
                    <View style={styles.headCenterContainer}>
                        <Animated.Image style={[styles.userImg, {
                            transForm: [
                                {
                                    rotateY: this.state.rotation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']
                                    }),
                                },
                                {
                                    scale: this.state.scale
                                }
                            ]
                        }]} source={require('../../img/i_user.png')}
                                        resizeMode={'contain'}/>

                        {/*<Animated.Text style={[styles.userNickname, {*/}
                        {/*opacity: this.state.opacity, transForm: [*/}
                        {/*{*/}
                        {/*translateY: this.state.translateY*/}
                        {/*}*/}
                        {/*]*/}
                        {/*}]}>Pinuo</Animated.Text>*/}

                        <View style={styles.positionContainer}>
                            <Image style={styles.positionImg}
                                   source={require('../../img/i_bookmark.png')}/>
                            <Text style={styles.positionText}>ruitong</Text>
                        </View>
                    </View>

                    {/* 关注、资产、粉丝 */}
                    <View style={styles.headBottomContainer}>
                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1}
                                          onPress={() => {
                                              alert('关注')
                                          }}>
                            <Text style={styles.bottomNum}>2</Text>
                            <Text style={styles.bottomText}>关注</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1}
                                          onPress={() => {
                                              alert('资产')
                                          }}>
                            <Text style={styles.bottomNum}>109.96</Text>
                            <Text style={styles.bottomText}>资产(元)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1}
                                          onPress={() => {
                                              alert('粉丝')
                                          }}>
                            <Text style={styles.bottomNum}>170</Text>
                            <Text style={styles.bottomText}>粉丝</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 过渡条 */}
                <View style={styles.transitionView}/>

                {/* 设置列表 */}
                <View style={styles.settingListContainer}>
                    {
                        this.settingData.map((item, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    leftText={item.leftText}
                                    rightText={item.rightText}
                                    rightComponent={item.rightComponent}
                                    isShowArrow={item.isShowUnderline}
                                    onPress={item.onPress}
                                />
                            )
                        })
                    }
                </View>
                <View style={styles.quitContainer}>
                    <CButton title={'注销'} onPress={() => this.logout()}/>
                </View>
            </ScrollView>

        )
    }

    logout() {
        this.props.navigation.navigate('Login');
    }
}

class ListItem extends React.PureComponent {
    static defaultProps = {
        leftText: '',
        rightText: '',
        isShowUnderline: true,
        isShowArrow: true,
    }

    _renderRight = () => {
        if (!this.props.rightText && !this.props.rightComponent) {
            return <Text/>
        }

        if (this.props.rightText) {
            return (
                <Text style={styles.itemRightText}>
                    {this.props.rightText}
                </Text>
            )
        }

        if (this.props.rightComponent) {
            return (
                <this.props.rightComponent/>
            )
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9}
                              style={[styles.itemContainer, this.props.isShowUnderline && styles.itemBorderBottom]}
                              onPress={this.props.onPress}>
                <Text style={styles.itemLeftText}>{this.props.leftText}</Text>

                <View style={styles.itemRightContainer}>
                    {
                        this._renderRight()
                    }
                    {
                        !this.props.rightComponent && this.props.isShowArrow &&
                        <Image style={styles.itemRightImg}
                               source={require('../../img/i_right.png')}/>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 25,
        height: 25,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    itemBorderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },
    itemLeftText: {
        fontSize: 14,
        color: '#000',
    },
    itemRightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    itemRightText: {
        color: '#bfbfbf',
        fontSize: 12,
    },
    itemRightImg: {
        width: 20,
        height: 20,
        marginHorizontal: 7,
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    headContainer: {
        backgroundColor: '#1E82D2',
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 30,
    },
    headTopContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    topBtnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 30,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
    },
    headTopImg: {
        resizeMode: 'contain',
        width: 15,
        height: 15,
        marginRight: 5
    },
    headTopText: {
        fontSize: 12,
        color: '#fff'
    },
    headCenterContainer: {
        alignItems: 'center',
        marginBottom: 0
    },
    userImg: {
        width: 150,
        height: 150,
        borderRadius: 40
    },
    userNickname: {
        marginVertical: 5,
        fontSize: 20,
        color: '#000'
    },
    positionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    positionImg: {
        width: 15,
        height: 15,
        marginRight: 2
    },
    positionText: {
        color: '#bfbfbf',
        fontSize: 15
    },
    headBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottomBtn: {
        alignItems: 'center'
    },
    bottomNum: {
        fontSize: 20,
        color: '#fff'
    },
    bottomText: {
        color: '#fff',
        fontSize: 12
    },
    transitionView: {
        height: 5,
        backgroundColor: 'rgba(230,230,230, .5)'
    },
    settingListContainer: {
        paddingLeft: 20,
    },
    quitContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    }
});


