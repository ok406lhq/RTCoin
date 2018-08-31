/**
 * Created by zerowolf Date: 2018/4/22 Time: 上午12:04
 */
import React, {Component} from 'react';
import {
 TouchableOpacity ,Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class BackgroundPage extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <TouchableOpacity style={{
                width: width,
                height: height,
                position: 'absolute',
                backgroundColor: this.props.backgroundColor
            }}
                              onPress={this.props.onPress}/>)
    }
}
