import React from 'react';
import {StackNavigator} from 'react-navigation';
import {TabNav} from "./RootPage";
import VideoScreen from "./page/Task/VideoScreen";
import PayScreen from "./page/Task/PayScreen";
import ContactScreen from "./page/Task/ContactScreen";
import MovieListScreen from "./page/Task/MovieListScreen";

import LoginScreen from "./page/Login/LoginScreen";
import UserProfile from "./page/Mine/UserProfile";
import SettingScreen from "./page/Mine/SettingScreen";
import NewsListScreen from "./page/Task/NewsListScreen";
import DetailListScreen from "./page/Task/DetailListScreen";
import LoginByVerify from "./page/Login/LoginByVerify";
import ForgetPsw from "./page/Login/ForgetPsw";
import RegisterMerchant from "./page/Login/RegisterMerchant";
import RegisterMerchantNext from "./page/Login/RegisterMerchantNext";
import RegisterSuccess from "./page/Login/RegisterSuccess";
import ShareScreen from "./page/Task/ShareScreen";

const App = StackNavigator({
        // Web: {screen: WebScreen},
        Setting: {screen: SettingScreen},
        UserProfile: {screen: UserProfile},
        Movie: {screen: MovieListScreen},
        Detail: {screen: DetailListScreen},
        News: {screen: NewsListScreen},
        Video: {screen: VideoScreen},
        Contact: {screen: ContactScreen},
        Share: {screen: ShareScreen},
        Pay: {screen: PayScreen},
        Share: {screen: ShareScreen},
        Login: {screen: LoginScreen}, // 登录页
        LoginByVerify: {screen: LoginByVerify}, // 短信登录
        ForgetPsw: {screen: ForgetPsw}, // 忘记密码
        RegisterMerchant: {screen: RegisterMerchant}, // 注册页
        RegisterMerchantNext: {screen: RegisterMerchantNext}, // 注册下一页
        RegisterSuccess: {screen: RegisterSuccess}, // 注册成功
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
