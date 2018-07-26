/**
 * @author lam
 * @date 2018/7/26 14:17
 */

import React, {Component} from 'react';

import * as jsCallNative from '../../utils/jsCallNative'

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableHighlight,
    Button,
    FlatList,
    RefreshControl, BackHandler,
} from 'react-native';

// ItemSeparatorComponent：分割线组件，
// ListFooterComponent：结尾组件
// ListHeaderComponent：头组件
// data：列表数据
// horizontal：设置为true则变为水平列表。
// numColumns：列数 组件内元素必须是等高的,无法支持瀑布流布局
// columnWrapperStyle：numColumns大于1时，设置每行的样式
// getItemLayout：如果我们知道行高可以用此方法节省动态计算行高的开销。
// refreshing：是否正在加载数据
// onRefresh：设置此属性需要一个标准的 RefreshControl 控件，刷新数据
// renderItem：渲染每个组件
// onViewableItemsChanged：当一个新的Item渲染或者隐藏 的时候调用此方法。参数：info: {viewableItems: Array, changed: Array} viewableItems：当前可见的Item，changed：渲染或者隐藏的Item。
// scrollToEnd({params?: ?{animated?: ?boolean}})：滚动到末尾，如果不设置getItemLayout属性的话，可能会比较卡。
// scrollToIndexparams: {animated?: ?boolean, index: number, viewPosition?: number}：滚动到制定的位置
// scrollToOffset(params: {animated?: ?boolean, offset: number})：滚动到指定的偏移的位置。

var ITEM_HEIGHT = 100;

export default class NewsListScreen extends Component {

    static navigationOptions = {
        header: null,
    }
    _flatList;
    // navigation;
    // self.navigationOptions = {
    //     title: 'FlatListExample',
    // }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    //控制器即将销毁的时候
    componentWillUnmount() {
        // 请注意Un"m"ount的m是小写

        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        // this.timer1 && clearTimeout(this.timer1);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            imageStyle: {}
        }
        // const {navigate} = this.props.navigation;
        // this.navigation = navigate;
    }


    refreshing = () => {
        this.setState({
            isLoading: true,
        });

        let timer = setTimeout(() => {
            clearTimeout(timer)
            this.getListData()
        }, 1000)
    }

    onload() {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            alert('加载成功')
        })
    }

    getListData() {
        jsCallNative.loading()
        fetch('https://v.juhe.cn/toutiao/index?key=1a52343f75501c9e0988e66bcb45d58e').then((response) => response.json()).then((json) => {
            let data = json.result.data;
            let dataBlob = [];
            let i = 0;
            data.map(function (item) {
                dataBlob.push({
                    key: i,
                    value: item,
                })
                i++;
            });
            this.setState({
                //复制数据源
                dataArray: dataBlob,
                isLoading: false,
            });
            data = null;
            dataBlob = null;

            console.log('111111111111111111');
            console.log(this.state.dataArray);
            jsCallNative.dismiss()
        }).catch((error) => {
            jsCallNative.dismiss();
            console.log(error);
        })
    }

    pusDetailView(obj) {
        this.props.navigation.navigate('Detail', {url: obj.url, name: obj.title});
    }

    _renderItem = (item) => {
        let obj = item.item.value;
        return (
            <TouchableHighlight underlayColor={'#dcdcdc'}
                                onPress={this.pusDetailView.bind(this, obj)}>
                <View style={styles.bgView}>
                    <Text>{obj.title}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                        <View style={{flex: 1}}>
                            <Image style={[this.state.imageStyle, styles.img_view]} source={{
                                uri: obj.thumbnail_pic_s,
                                cache: 'force-cache'
                            }}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image style={[this.state.imageStyle, styles.img_view]} source={{
                                uri: obj.thumbnail_pic_s02,
                                cache: 'force-cache'
                            }}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Image style={[this.state.imageStyle, styles.img_view]} source={{
                                uri: obj.thumbnail_pic_s03,
                                cache: 'force-cache'
                            }}/>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, textAlign: 'left'}}>{obj.author_name}</Text>
                        <Text style={{flex: 1, textAlign: 'right'}}>{obj.date}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )

    }

    // _header = () => {
    //        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
    //    }

    //    _footer = () => {
    //        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    //    }

    _separator = () => {
        return <View
            style={{height: 1, backgroundColor: '#dcdcdc', marginLeft: 15, marginRight: 15}}/>;
    }

    componentDidMount() {
        //请求数据
        this.getListData();
        var ScreenWidth = Dimensions.get('window').width;
        let imageWith = (ScreenWidth - 50) / 3;
        this.setState({
            imageStyle: {
                width: imageWith,
                height: 100
            }
        });
    }


    render() {
        return (
            <View style={{flex: 1}}>

                <View style={{flex: 1}}>
                    <FlatList
                        ref={(flatList) => this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        onRefresh={this.refreshing}
                        refreshing={this.state.isLoading}
                        // extraData={this.state}

                        // onEndReachedThreshold={0}
                        // onEndReached={
                        //     this.onload
                        // }

                        //列数 组件内元素必须是等高的,无法支持瀑布流布局
                        // numColumns ={3}

                        //numColumns大于1时，设置每行的样式
                        //columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}

                        //设置为true则变为水平列表
                        //horizontal={true}

                        //如果我们知道行高可以用此方法节省动态计算行高的开销。
                        // getItemLayout={(data,index)=>(
                        // {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT+1) * index, index}
                        // )}

                        // onEndReachedThreshold={5}
                        // onEndReached={(info)=>{
                        // console.warn(info.distanceFromEnd);
                        // }}

                        // onViewableItemsChanged={(info)=>{
                        // console.warn(info);
                        // }}
                        data={this.state.dataArray} style={{}}>
                    </FlatList>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    bgView: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    img_view: {
        // height:100,
        resizeMode: Image.resizeMode.center,
        // borderWidth:1,
        // paddingRight:5,
        // flex:1,
        backgroundColor: '#FFF',
        borderColor: '#dcdcdc'
    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});