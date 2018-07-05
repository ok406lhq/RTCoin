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
import ShareData from "../assets/shareData2.json";
//获取屏幕宽度
let Dimensions = require("Dimensions");
let {width} = Dimensions.get('window');
//常量设置
let cols = 3;
let cellWH = 100;
let vMargin = (width - cellWH * cols) / (cols + 1);
let hMargin = 20;

export default class listViewComponent2 extends Component {
    constructor(props) {
        super(props);
        //1.设置数据源
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //2.设置返回数据
        this.state = {dataSource: ds.cloneWithRows(ShareData.data)};
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
                    <Image source={{uri: rowData.icon}} style={styles.iconStyle}/>
                    <Text>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress(e) {
        if (e === '播放视频') {
            this.props.navigate('Video');
        } else if (e === '阅读新闻') {
            this.props.navigate('Movie');
        }
        // alert(">>>点击 " + e);
    }

}


const styles = StyleSheet.create({
    listViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    iconStyle: {
        width: 80,
        height: 80,
    },
    innerViewStyle: {
        width: cellWH,
        height: cellWH,
        marginLeft: vMargin,
        marginTop: hMargin,
        alignItems: 'center',
    }
});

