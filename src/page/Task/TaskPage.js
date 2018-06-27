import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import SwiperComponent from "../../common/SwiperComponent";

export default class TaskPage extends Component {
    static navigationOptions = {
        tabBarLabel: '任务',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/task_sel.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/task_nor.png')}/>
            );
        },
    };

    render() {
        return (
            <SwiperComponent/>
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


