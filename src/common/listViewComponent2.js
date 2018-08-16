import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Text,
    Alert,
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
        icon: require('../img/icon3.png'),
        title: '播放视频',
        "btn": "+10算力"
    },
    {
        icon: require('../img/icon4.png'),
        title: '阅读新闻',
        "btn": "+10算力"
    },
    {
        icon: require('../img/icon5.png'),
        title: '通讯录',
        "btn": "+10算力"
    },
    {
        icon: require('../img/icon56.png'),
        title: '支付',
        "btn": "+10算力"
    },
    // {
    //     icon: require('../img/icon6.png'),
    //     title: '转入',
    //     "btn": "+10算力"
    // },
    // {
    //     icon: require('../img/icon7.png'),
    //     title: '转出',
    //     "btn": "+10算力"
    // },
    // {
    //     icon: require('../img/icon8.png'),
    //     title: '买入',
    //     "btn": "+10算力"
    // },
    // {
    //     icon: require('../img/icon9.png'),
    //     title: '卖出',
    //     "btn": "+10算力"
    // },
];

export default class listViewComponent2 extends Component {
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
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                this._onPress(rowData.title)
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
                        }}
                        underlayColor='#4169e1'>
                    </RadiusButton>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress(e) {
        if (e === '播放视频') {
            this.props.navigate('Video');
        } else if (e === '阅读新闻') {
            // this.props.navigate('Movie');
            this.props.navigate('News');
        } else if (e === '通讯录') {
            this.props.navigate('Contact');
        } else if (e === '支付') {
            this.props.navigate('Pay');
        }
        else {
            alert(">>>点击 " + e);
        }
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

