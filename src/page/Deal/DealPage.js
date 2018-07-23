import React, {Component} from 'react';
import {
    View,
    StatusBar,
    Image,
    StyleSheet,
} from 'react-native';

export default class DealPage extends Component {
    static navigationOptions = {
        tabBarLabel: '交易',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/deal_sel.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/deal_nor.png')}/>
            );
        },

    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <Image style={{flex: 1}} resizeMode={'contain'}
                       source={require('../../img/unnotes.png')}/>
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
        width: 19,
        height: 19,
    }
});


