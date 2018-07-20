import React, {Component} from 'react';
import {
    Text,
    Image,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import SwiperComponent from "../../common/SwiperComponent";
import ListViewComponent from "../../common/listViewComponent";
import ListViewComponent2 from "../../common/listViewComponent2";

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
            <ScrollView style={styles.container}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <SwiperComponent/>
                <Text style={styles.textStyle}>基础任务</Text>
                <ListViewComponent/>
                <Text style={styles.textStyle}>独家任务</Text>
                <ListViewComponent2 navigate={this.props.navigation.navigate}/>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    textStyle: {
        fontWeight:'bold',
        fontSize: 15,
        color: '#000',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10.
    },
    viewItem: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10
    },
    tabBarIcon: {
        width: 17,
        height: 17,
    }
});
