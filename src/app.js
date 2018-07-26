import React from 'react';
import {StackNavigator} from 'react-navigation';
import {TabNav} from "./RootPage";
import RegPage from "./page/Login/regPage";
import {FindAccountPage} from "./page/Login/findAccountPage"; // 路由导航
import VideoScreen from "./page/Task/VideoScreen";
import PayScreen from "./page/Task/PayScreen";
import ContactScreen from "./page/Task/ContactScreen";
import MovieListScreen from "./page/Task/MovieListScreen";

import LoginScreen from "./page/Login/LoginScreen";
import UserProfile from "./page/Mine/UserProfile";
import SettingScreen from "./page/Mine/SettingScreen";
import NewsListScreen from "./page/Task/NewsListScreen";
import DetailListScreen from "./page/Task/DetailListScreen";
// import WebScreen from "./page/Friend/WebScreen"; // 本地存储全局对象

const App = StackNavigator({
        // Web: {screen: WebScreen},
        Setting: {screen: SettingScreen},
        UserProfile: {screen: UserProfile},
        Movie: {screen: MovieListScreen},
        Detail: {screen: DetailListScreen},
        News: {screen: NewsListScreen},
        Video: {screen: VideoScreen},
        Contact: {screen: ContactScreen},
        Pay: {screen: PayScreen},
        Login: {screen: LoginScreen}, // 登录页
        Reg: {screen: RegPage}, // 注册页
        FindAccount: {screen: FindAccountPage}, // 找回密码页
        Main: {
            screen: TabNav,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        }
    },
    {
        initialRouteName: 'Main',
        headerMode: 'screen'
    });

export default App;
