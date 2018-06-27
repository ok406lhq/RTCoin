/**
 * Created by mymac on 2017/3/31.
 * 创建tabbar，子试图是Navigator
 */

import React from 'react';
import {TabNavigator} from 'react-navigation';


import HomePage from './page/Home/HomePage';
import FriendPage from './page/Friend/FriendPage';
import TaskPage from './page/Task/TaskPage';
import MinePage from './page/Mine/MinePage';
import DealPage from './page/Deal/DealPage';


/*
* 1.animated bool   进行设置当状态栏的状态发生变化的时候是否需要加入动画。当前该动画支持backgroundColor,barStyle和hidden属性
 2.hidden  bool  进行设置状态栏是否隐藏
 3.backgroundColor   color类型，仅支持Android设备，设置状态栏的背景颜色
 4.translucent bool类型，仅支持Android设备, 进行设置状态栏是否为透明。当状态栏的值为true的时候，应用将会在状态栏下面进行绘制显示。这样在Android平台上面就是沉浸式的效果，可以达到Android和iOS应用一致性效果。该值常常配置半透明效果的状态栏颜色一起使用
 5.barStyle  enum('default','light-content')  枚举类型，仅支持iOS设备。进行设置状态栏文字的颜色
 6.networkActivityIndicatorVisible   bool类型，仅支持iOS设备。设置状态栏上面的网络进度加载器是否进行显示
 7.showHideTransition   enum('fade','slide') 枚举类型，仅支持iOS设备。进行设置当隐藏或者显示状态栏的时候的动画效果。默认值为'fade'
* */

export const TabNav = TabNavigator(
    {
        Home: {
            screen: HomePage,
        },
        Task: {
            screen: TaskPage,
        },
        Friend: {
            screen: FriendPage,
        },
        Deal: {
            screen: DealPage,
        },
        Mine: {
            screen: MinePage,
        }
    },
    {
        tabBarOptions: {
            activeTintColor: '#4BC1D2',
            inactiveTintColor: '#000',
            showIcon: true,
            showLabel: true,
            upperCaseLabel: false,
            pressColor: '#788493',
            pressOpacity: 0.8,
            style: {
                backgroundColor: '#fff',
                paddingBottom: 1,
                borderTopWidth: 0.2,
                paddingTop:1,
                borderTopColor: '#ccc',
            },
            labelStyle: {
                fontSize: 11,
                margin: 1
            },
            indicatorStyle: {height: 0},
        },
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: false,
        lazy: true,
        backBehavior: 'none',
    });
