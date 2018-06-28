import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import SwiperComponent from "../../common/SwiperComponent";
import ListViewComponent from "../../common/listViewComponent";

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
            <View>
                <SwiperComponent/>
                <Text style={styles.textStyle}>基础任务</Text>
                <ListViewComponent/>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        color: '#000',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10.
    },
    tabBarIcon: {
        width: 19,
        height: 19,
    }
});
