/**
 * Created by lam on 2018/7/5.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view";

const activeTabColor = '#1E82D2';
const defaultTabColor = '#949494';

const Dimensions = require('Dimensions');
const ScreenWidth = Dimensions.get('window').width;

const api = {
    web: 'http://www.qiandu.com/#/login',
};

export default class TabTopView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <ScrollableTabView
                    scrollWithoutAnimation={false}
                    locked={false}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar style={styles.border}/>}
                    tabBarUnderlineStyle={styles.underline}
                    tabBarInactiveTextColor={defaultTabColor}
                    tabBarActiveTextColor={activeTabColor}>

                    <Text style={styles.textStyle} tabLabel='关注' onPress={() => {
                        this._onPress();
                    }}>跳转到Web</Text>
                    <Text style={styles.textStyle} tabLabel='粉丝'>粉丝</Text>
                    <Text style={styles.textStyle} tabLabel='推荐'>推荐</Text>
                </ScrollableTabView>
            </View>
        );
    }

    _onPress = (url = api.web) => {
        // console.log(StatusBar.currentHeight);
        this.props.navigate('Web', {
            url: url
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    lineStyle: {
        width: ScreenWidth / 4,
        height: 2,
        backgroundColor: '#1E82D2',
    },
    textStyle: {
        flex: 1,
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    underline: {
        height: 3,
        backgroundColor: '#1E82D2',
        alignItems: 'center',
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#fcfcfc',
        backgroundColor: 'white',
        marginBottom: -0.5,
    },

});
