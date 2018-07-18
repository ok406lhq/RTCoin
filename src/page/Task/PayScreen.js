/**
 * Created by lam on 2018/7/18.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text, ListView,
    TouchableOpacity, Image
} from 'react-native';

//获取屏幕宽度
let Dimensions = require("Dimensions");
let {width} = Dimensions.get('window');
//常量设置
let cols = 4;
let cellWH = 80;
let vMargin = (width - cellWH * cols) / (cols + 1);
let hMargin = 15

// 九宫格配置对象
export const data = [
    {
        title: '转账',
        image: require('../../assets/images/iconfont-zhuanzhang.png'),
    },
    {
        title: '手机充值',
        image: require('../../assets/images/iconfont-shoujichongzhi.png'),
    },
    {
        title: '口碑外卖',
        image: require('../../assets/images/iconfont-koubeilogo.png'),
    },
    {
        title: '芝麻信用',
        image: require('../../assets/images/iconfont-zhimaxinyong.png'),
    },
    {
        title: '淘宝',
        image: require('../../assets/images/iconfont-taobao.png'),
    },
    {
        title: '滴滴出行',
        image: require('../../assets/images/iconfont-chuxing.png'),
    },
    {
        title: '淘宝电影',
        image: require('../../assets/images/iconfont-taobaodianying.png'),
    },
    {
        title: '蚂蚁聚宝',
        image: require('../../assets/images/iconfont-mayijubao-copy.png'),
    },
    {
        title: '蚂蚁花呗',
        image: require('../../assets/images/iconfont-huabei.png'),
    },
    {
        title: '服务窗',
        image: require('../../assets/images/iconfont-fuwuchuang.png'),
    },

    {
        title: '股票',
        image: require('../../assets/images/iconfont-gupiao.png'),
    },
    {
        title: '世界那么大',
        image: require('../../assets/images/iconfont-chanpinfenleishijie.png'),
    },
    {
        title: '天猫',
        image: require('../../assets/images/iconfont-tianmao.png'),
    },
    {
        title: '余额宝',
        image: require('../../assets/images/iconfont-yuebao.png'),
    },
    {
        title: '我的快递',
        image: require('../../assets/images/iconfont-kuaidi.png'),

    },
    {
        title: '机票火车票',
        image: require('../../assets/images/iconfont-jipiao.png'),
    },
    {
        title: '爱心捐赠',
        image: require('../../assets/images/iconfont-juanzeng.png'),
    },
    {
        title: '彩票',
        image: require('../../assets/images/iconfont-caipiao.png'),
    },
    {
        title: '理财小工具',
        image: require('../../assets/images/iconfont-licaixiaogongju.png'),
    },
];
export default class PayScreen extends Component {
    constructor(props) {
        super(props);
        //1.设置数据源
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //2.设置返回数据
        this.state = {dataSource: ds.cloneWithRows(data)};
        thiz = this;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    contentContainerStyle={styles.listViewStyle}/>
            </ScrollView>
        );
    }


    _renderRow = (rowData, sectionID, rowID, highlightRow) => {
        {
            return (
                <View style={styles.innerViewStyle}>
                    <Image source={rowData.image} style={styles.iconStyle}/>
                    <Text style={styles.textStyle}>{rowData.title}</Text>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F5F5F9',
        },
        // ‘支付宝’ 首页九宫格
        scrollContainerApp: {
            backgroundColor: '#F5F5F9',
            paddingBottom: 15,
            marginTop: -20,
        },
        listViewStyle: {
            flexDirection: 'row',
            flexWrap: 'wrap',
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
            borderColor: '#000',
            fontSize: 12,
            color: 'gray'
        }
    }
);
