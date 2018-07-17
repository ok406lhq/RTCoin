/**
 * Created by lam on 2018/7/17.
 */

import React, {Component} from 'react';
import {
    WebView,
    StyleSheet,
    ActivityIndicator, BackHandler,
} from 'react-native';

export default class WebScreen extends Component {
    static navigationOptions = {
        header: null
    };

    //Back键监听
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    render() {
        const {navigation} = this.props;
        const {url, userAgent = "Web/"} = navigation.state.params;
        return (
            <WebView
                style={styles.webStyle}
                source={{uri: url}}
                userAgent={userAgent}
                startInLoadingState
                renderLoading={() => {
                    return this.loading()
                }}
            />
        );
    }

    loading = () => {
        return <ActivityIndicator style={styles.webStyle} size="small" color="#aa00aa"/>
    }

}

const styles = StyleSheet.create({
    webStyle: {
        marginTop: 20,
        flex: 1
    }
});
