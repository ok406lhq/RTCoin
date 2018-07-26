/**
 * @author lam
 * @date 2018/7/26 14:37
 */

import React, {Component} from 'react';
import {
    WebView,
    Button,
    View,
    StatusBar,
    BackHandler
} from 'react-native';

export default class DetailListScreen extends Component {


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


    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.name,
        headerRight: (
            <Button title="电影"
                    onPress={() => {
                        navigation.navigate('Movie')
                    }}/>
        )
    });


    constructor(props) {
        super(props);
        const {navigate, goBack, state} = this.props.navigation;
        this.state = {
            url: state.params.url
        }
        // alert(state.params.url)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={false}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <WebView source={{uri: this.state.url}}/>
            </View>

        )
    }
}