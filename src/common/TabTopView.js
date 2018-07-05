/**
 * Created by lam on 2018/7/5.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view";

const activeTabColor = '#1E82D2';
const defaultTabColor = '#949494';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;

export default class TabTopView extends Component {
    render() {
        return (
            <ScrollableTabView
                style={styles.container}
                scrollWithoutAnimation={false}
                locked={false}
                initialPage={0}
                renderTabBar={() => <DefaultTabBar style={styles.border}/>}
                tabBarUnderlineStyle={styles.underline}
                tabBarInactiveTextColor={defaultTabColor}
                tabBarActiveTextColor={activeTabColor}>

                <Text style={styles.textStyle} tabLabel='关注'>关注</Text>
                <Text style={styles.textStyle} tabLabel='粉丝'>粉丝</Text>
                <Text style={styles.textStyle} tabLabel='推荐'>推荐</Text>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15
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
