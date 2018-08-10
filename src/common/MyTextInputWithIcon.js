/**
 * Created by lam
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TextInput,
    Dimensions, Image
} from 'react-native';

import {cusColors} from "../utils/cusColors";

const {width, height} = Dimensions.get('window');
import PropTypes from 'prop-types';
import {zdp, zsp} from "../utils/ScreenUtil";

export default class MyTextInputWithIcon extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        keyboardType: 'default',
        style: {},
        textInputStyle: {},
        value: null,
        placeholder: '请输入内容',
        iconName: 'phone',
        iconSize: zdp(30),
        iconColor: '#999999',
        placeholderTextColor: cusColors.text_placeHold,
        maxLength: 19,
        secureTextEntry: false,
        defaultValue: ''
    };


    render() {
        var param = this.props;
        return (
            <View style={[{
                marginTop: zdp(20),
                width: width / 1.3,
                height: zdp(50),
                flexDirection: 'row',
                backgroundColor: cusColors.inputBackgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: zdp(5),

            }, param.style]}

            >

                {/*<Image style={{width:zdp(30),height:zdp(30)}} source={require('../../resource/image/qianbao.png')}/>*/}


                <Image source={{uri: param.iconName}}
                       resizeMode={'contain'}
                       style={{
                           marginLeft: zdp(10),
                           marginRight: zdp(10),
                           width: zdp(20),
                           height: zdp(20),
                           backgroundColor: 'transparent'
                       }}/>

                <TextInput
                    // password={true}
                    backgroundColor={'rgba(255, 255, 255, 0.4)'}
                    color={'#ffffff'}
                    secureTextEntry={param.secureTextEntry}
                    editable={param.editable ? param.editable : true}
                    keyboardType={param.keyboardType}
                    autoCapitalize={'none'}
                    underlineColorAndroid={'transparent'}
                    style={[styles.textInputStyle_01, param.textInputStyle]}
                    placeholder={param.placeholder}
                    placeholderTextColor={param.placeholderTextColor}
                    maxLength={param.maxLength}
                    defaultValue={param.defaultValue}
                    onChangeText={(text) => {
                        param.onChangeText(text)
                    }}
                    value={param.value}/>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    textInputStyle_01: {
        flex: 1,
        fontSize: zsp(16),
        fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
        color: cusColors.inputTextColor,
        height: zdp(50),
        backgroundColor: 'transparent',
        textAlign: 'left',
    }
})


MyTextInputWithIcon.propTypes = {
    style: PropTypes.object,
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    placeholderTextColor: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    textInputStyle: PropTypes.object,
    iconName: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    defaultValue: PropTypes.string
};
