/**
 * Created by lam on 2018/8/13.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    Text,
    View,
    TouchableOpacity,
    Dimensions, StatusBar
} from 'react-native';

const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import {isIphoneX, zAppBarHeight, zdp, zsp} from "../utils/ScreenUtil";
import {cusColors} from "../utils/cusColors";

export default class MyTabView extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '标题',
        globalTitleColor: 'white',
        backgroundColor: 'transparent',
        style: {},
        linear_style: {},
        leftView: true,
        hasRight: false,
        rightView: null,
        rightIcon: 'md-more',
        cutLineHeight: 0.2,
        barStyle: 'light-content',
        isTransparent: false
    }

    render() {
        var params = this.props;
        return (
            <LinearGradient
                style={params.linear_style}
                start={{x: 0.0, y: 0.0}}
                end={{x: 0.0, y: 1.0}}
                locations={[0, 1]}
                colors={params.isTransparent ? ['transparent', 'transparent'] : [cusColors.linear_light, cusColors.linear_default]}>

                <View style={[{
                    width: width,
                    height: zAppBarHeight,
                    backgroundColor: params.backgroundColor,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingTop: isIphoneX() ? zdp(30) : zdp(20),
                    alignItems: 'center'
                }, params.style]}>


                    {params.leftView ? <TouchableOpacity activeOpacity={0.5}
                                                         style={{
                                                             width: width / 4,
                                                             justifyContent: 'center',
                                                             paddingLeft: zdp(15)
                                                         }}
                                                         onPress={() => {
                                                             if (params.onTabBack) {
                                                                 params.onTabBack()
                                                             }
                                                             params.navigation.goBack();
                                                         }}>
                        <Icon size={zdp(30)} name={'angle-left'}
                              style={{
                                  color: params.globalTitleColor,
                                  backgroundColor: 'transparent'
                              }}/>

                    </TouchableOpacity> : <View style={{width: width / 4}}/>}
                    <StatusBar
                        hidden={false}
                        translucent={true}
                        barStyle={params.barStyle}//'default', 'light-content', 'dark-content'
                        backgroundColor={'#fff6fd00'}
                        networkActivityIndicatorVisible={false}
                    />

                    <View style={{
                        flex: 1,
                        width: width / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Text style={{
                            fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                            fontSize: zsp(18),
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            color: params.globalTitleColor
                        }} numberOfLines={1}>{params.title}</Text>

                    </View>
                    {params.hasRight ? params.rightView ? params.rightView :
                        <TouchableOpacity activeOpacity={0.5}
                                          style={{
                                              width: width / 4,
                                              justifyContent: 'center',
                                              alignItems: 'flex-end',
                                              paddingRight: zdp(15)
                                          }}
                                          onPress={() => {
                                              // Alert.alert('更多')
                                              params.onPressRight()

                                          }}>
                            <Ionicons size={zdp(20)} name={params.rightIcon}
                                      style={{
                                          color: params.globalTitleColor,
                                          backgroundColor: 'transparent'
                                      }}/>

                        </TouchableOpacity> :
                        <View style={{width: width / 4}}/>}


                </View>
                <View style={{
                    width: width,
                    height: params.cutLineHeight,
                    backgroundColor: 'lightgrey',
                    alignSelf: 'flex-end'
                }}/>

            </LinearGradient>
        );

    }
}

MyTabView.propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    style: PropTypes.object,
    cutLineHeight: PropTypes.number,
    globalTitleColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    leftView: PropTypes.bool,
    hasRight: PropTypes.bool,
    rightView: PropTypes.object,
    rightIcon: PropTypes.string,
    barStyle: PropTypes.string,
    isTransparent: PropTypes.bool,
    linear_style: PropTypes.object,
}
