import React, {Component} from 'react';
import {
    View,
    StatusBar,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet, Text,
} from 'react-native';
import CandleStickChartScreen from "../../common/CandleStickChartScreen";
import LineChartScreen from "../../common/LineChartGradientScreen";

const {width} = Dimensions.get('window');
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
            <ScrollView style={styles.container}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <View style={styles.sBar} backgroundColor={'#1E82D2'}>
                    <Text style={styles.textStyle}>剩余金额：0.000</Text>
                </View>
                <CandleStickChartScreen/>
                <Text style={styles.text}>深度图</Text>
                <LineChartScreen/>
                <View backgroundColor={'#fff'} style={{height: 300, width: width}}>
                    <Text style={styles.textStyle2}>暂无数据</Text>
                    <Image
                        style={styles.imgStyle}
                        source={require('../../img/unnotes.png')}/>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgStyle: {
        alignSelf: 'center',
        width: 150,
        height: 150,
    },
    text: {
        padding: 8,
        fontSize: 15,
        backgroundColor: '#F5FCFF',
        color: '#1E82D2'
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff',
        paddingTop: 27,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    textStyle2: {
        fontSize: 12,
        color: 'grey',
        marginTop: 80,
        alignSelf: 'center'
    },
    sBar: {
        height: StatusBar.currentHeight * 2,
        width: width
    },
    tabBarIcon: {
        width: 19,
        height: 19,
    }
});


