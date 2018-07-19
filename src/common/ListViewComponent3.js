/**
 * @author lam
 * @date 2018/7/19 11:53
 */

import React, {Component} from 'react';
import {
    ListView,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

//获取屏幕宽度
let Dimensions = require("Dimensions");
let {width} = Dimensions.get('window');
//常量设置
let cols = 4;
let cellWH = 80;
let vMargin = (width - cellWH * cols) / (cols + 1);
let hMargin = 15

export const data = [
    {
        title: '蚂蚁花呗',
        image: require('../assets/images/iconfont-huabei.png'),
    },
    {
        title: '服务窗',
        image: require('../assets/images/iconfont-fuwuchuang.png'),
    },

    {
        title: '股票',
        image: require('../assets/images/iconfont-gupiao.png'),
    },
]

export default class ListViewComponent3 extends Component {

    constructor(props) {
        super(props);
        //1.设置数据源
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //2.设置返回数据
        this.state = {dataSource: ds.cloneWithRows(data)};
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                contentContainerStyle={styles.listViewStyle}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <View style={styles.innerViewStyle}>
                <Image source={rowData.image} style={styles.iconStyle}/>
                <Text style={styles.textStyle}>{rowData.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconStyle: {
        borderColor: '#000',
        margin: 6,
        width: 35,
        height: 35,
    },
    innerViewStyle: {
        width: cellWH,
        height: cellWH,
        marginLeft: vMargin,
        marginTop: hMargin,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 12,
        color: 'gray'
    },
    listViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});