import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class HomePage extends Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/home_sel.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/home_nor.png')}/>
            );
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>这是首页</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        width: 24,
        height: 24,
    }
});
