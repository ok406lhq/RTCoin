/**
 * @author lam
 * @date 2018/7/26 14:37
 */

import React, {Component} from 'react';
import {
    WebView,
    Button
} from 'react-native';

export default class DetailListScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.name,
        headerRight: (
            <Button title="电影"
                    onPress={() => {
                        navigation.navigate('Movie')
                    }}/>
        )
    });


    constructor(props) {
        super(props);
        const {navigate, goBack, state} = this.props.navigation;
        this.state = {
            url: state.params.url
        }
        // alert(state.params.url)
    }

    render() {
        return (
            <WebView source={{uri: this.state.url}}/>
        )
    }
}