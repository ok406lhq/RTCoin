/**
 * Created by lam Date: 2018/8/11 Time: 下午6:10
 */

import {zsp} from "../utils/ScreenUtil";

/**
 * Created by lam Date: 2018/8/11 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView
} from 'react-native';

export default class ZText extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {

        parentStyle: {},
        parentActiveOpacity: 1,

        textStyle: {},
        content: '',
        fontSize: zsp(16),
        color: 'grey',
        textAlign: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        marginRight: 0,
        marginLeft: 0,
        fontWeight: '400',
    };

    render() {
        var params = this.props;
        let {...p} = this.props;
        return (
            <View style={[{
                justifyContent: 'center',
                alignItems: 'center',
            }, params.parentStyle]}>
                <Text style={[{
                    paddingLeft: params.paddingLeft,
                    paddingRight: params.paddingRight,
                    paddingTop: params.paddingTop,
                    paddingBottom: params.paddingBottom,
                    fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                    fontWeight: params.fontWeight,
                    fontSize: params.fontSize,
                    color: params.color,
                    textAlign: params.textAlign,
                }, params.textStyle]}>{params.content}

                    {p.children}

                </Text>

            </View>);
    }
}
ZText.propTypes = {
    parentActiveOpacity: PropTypes.number,
    parentStyle:PropTypes.object,


    textStyle:  PropTypes.oneOfType([PropTypes.object,PropTypes.array]),
    fontSize: PropTypes.number,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    color: PropTypes.string,
    textAlign: PropTypes.string,

    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginRight: PropTypes.number,
    marginLeft: PropTypes.number,
    fontWeight: PropTypes.string,
};
