import {zdp, zsp, zWidth} from "../utils/ScreenUtil";

const {width, height} = Dimensions.get('window')
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from "react-native-linear-gradient";
import {cusColors} from "../utils/cusColors";
import ZText from "./ZText";

export default class MyButtonView extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '点击',
        style: {},
        onPress: null,
        modal: 0,     //null为普通界面风格  1 为登录界面风格
        fontSize: zsp(18),
        color1: cusColors.linear_default,
        color2: cusColors.linear_light
    };

    render() {
        var params = this.props;
        return (
            <TouchableOpacity
                style={{padding: zdp(6)}}
                activeOpacity={0.7}
                onPress={() => {
                    params.onPress()
                }}>
                <LinearGradient
                    style={[{
                        marginTop: zdp(40),
                        width: zWidth - zdp(60),
                        height: zdp(50),
                        borderRadius: zdp(25),
                        justifyContent: 'center',
                        elevation: zdp(3),
                        shadowOffset: {width: zdp(1), height: zdp(5)},
                        shadowColor: cusColors.shadowColor,
                        shadowOpacity: 0.6,
                        shadowRadius: zdp(2),
                        alignItems: 'center',
                    }, params.style]}
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 0.0, y: 1.0}}
                    locations={[0, 1]}
                    // colors={params.modal ? [cusColors.button_light, cusColors.button_default] : [cusColors.linear_default, cusColors.linear_light]}
                    colors={[params.color1, params.color2]}>


                    <ZText content={this.props.title} fontSize={params.fontSize} color={'white'}/>
                </LinearGradient>
            </TouchableOpacity>
        );


    }
}

MyButtonView.propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    modal: PropTypes.number,
    fontSize: PropTypes.number,
}
