import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';
//导入数据
import RadiusButton from "./RadiusButton";
//获取屏幕宽度
let Dimensions = require("Dimensions");
let {width} = Dimensions.get('window');
//常量设置
let cols = 3;
let cellWH = 100;
let vMargin = (width - cellWH * cols) / (cols + 1);
let hMargin = 20;


export const data = [
    {
        icon: require('../img/icon1.png'),
        title: '每日登陆，+10算力',
        "btn": "已完成",
        "underlayColor": "#98999B"
    },
    {
        icon: require('../img/icon2.jpg'),
        title: '邀请10名好友',
        "btn": "+11算力",
        "underlayColor": "#1E82D2"
    }
];

export default class listViewComponent extends Component {
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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                contentContainerStyle={styles.listViewStyle}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                thiz._onPress(rowData.title)
            }}>
                <View style={styles.innerViewStyle}>
                    <Image source={rowData.icon} style={styles.iconStyle}/>
                    <Text style={styles.textStyle}>{rowData.title}</Text>
                    <RadiusButton
                        btnName={rowData.btn}
                        textStyle={{
                            fontSize: 10,
                            color: '#ffffff',
                        }}
                        btnStyle={{
                            marginTop: 5,
                            width: 70,
                            height: 18,
                            borderRadius: 25,
                            backgroundColor: rowData.underlayColor
                        }}
                        underlayColor={rowData.underlayColor}>
                    </RadiusButton>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress(e) {
        alert(">>>点击 " + e);
    }
}


const styles = StyleSheet.create({
    listViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    iconStyle: {
        margin: 6,
        width: 32,
        height: 32,
    },
    innerViewStyle: {
        width: cellWH,
        height: cellWH,
        marginLeft: vMargin,
        marginTop: hMargin,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 8,
        color: 'gray'
    }
});

