import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './reducers/configureStore';
import App from './app';
import SplashScreen from "react-native-splash-screen";
import JPushModule from "jpush-react-native";

const store = configureStore();
store.subscribe(() => {
    //监听state变化
    console.log(store.getState());
});
export default class Root extends Component {
    componentDidMount() {
        SplashScreen.hide(); // 隐藏启动屏
        // 新版本必需写回调函数
        // JPushModule.notifyJSDidLoad();
        JPushModule.notifyJSDidLoad((resultCode) => {
            if (resultCode === 0) {
            }
        });

        // 接收自定义消息
        JPushModule.addReceiveCustomMsgListener((message) => {
            this.setState({pushMsg: message});
        });
        // 接收推送通知
        JPushModule.addReceiveNotificationListener((message) => {
            console.log("receive notification: " + message);
        });
        // 打开通知
        JPushModule.addReceiveOpenNotificationListener((map) => {
            console.log("Opening notification!");
            console.log("map.extra: " + map.extras);
            // 可执行跳转操作，也可跳转原生页面
            // this.props.navigation.navigate("SecondActivity");
        });
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
    }

    render() {
        return (
            // 实现app和store的关联，等于整个系统的组件都被包含住了
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}
