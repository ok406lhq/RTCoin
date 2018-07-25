## React native框架做的一个小项目，目前正在更新中....
目前做的是一个界面框架，是由底部导航的五个部分组成，分别是“挖矿”首页、任务、好友、交易和主页“我”组成，导航的实现用到了react-navigation来控制；还实现了注册登录模块的功能，用到了管理状态state的利器React-thunk和React-redux，简单实现了页面和跳转。
##### 该项目是本人第一次学RN做的项目，边学边做，遇到不懂的就查，实在不懂就问。知识点很多很杂，能做到逐个勉强击破(加个"勉强"免得被喷:sweat_smile::sweat_smile:),
##### 对于我来说，RN要学的东西很多，是一个全新的技术领域，这对于一个前端小白来讲更是具有挑战性，前辈说要坚持，学多点总归是好的，何况知识很多时候是互通的。
#### 学无止境，Fighting！:punch::punch::punch:
<div align="center">
  <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/1.jpg"/>
  <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/2.jpg"/>
  <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/3.png"/>
 </div>
 
 <div align="center">
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/4.png"/>
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/5.png"/>
  </div>


--- 

* 6.29更新
###### 实现了ListView的九宫格效果，，并给每个item都添加了点击事件，效果如下：（左）
* 7.01更新
###### 用StatusBar实现了沉浸式状态栏的效果，并添加了物理返回键的监听，效果如下：（右）
<div align="center">
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/6.jpg"/>
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/8.png"/>
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/16.png"/>
  </div>

###### 参照 [如何让你的 React Native 应用在键盘弹出时优雅地响应](https://github.com/rccoder/blog/issues/25),用KeyboardAvoidingView解决了:点击文本输入框时，键盘会弹出并且遮盖住输入框的问题：

<div align="center">
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/7.gif"/>
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/10.png"/>
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/11.png"/>
  </div>

* 7.03更新
###### 嵌入自己封装的react-native-vedio视频播放器(上图中)，参照[react-native-vedio中文文档](https://www.jianshu.com/p/2db4e3e2c343)，这是自己根据github上的文档翻译的，国内找不到中文文档:sob::sob::sob:

* 7.05更新
###### 解决了ListView中item点击后跳转到指定页面的问题，就是需要在调用组件的页面中声明“this.props.navigation.navigate=navigate”，这样在组件中就可以进行对页面的跳转。
###### 并添加了新闻阅读(即使用第三方提供的api接口请求提供网络数据)，并利用FlatList来显示拿到的数据(上图右)，nice！:raised_hands::raised_hands::raised_hands:
[顶部](#readme)

* 7.06更新
###### 重新设计了登录界面，使得更加美观好看，并附有动画效果~这是参照一哥们写的项目[react-native-login-screen](https://github.com/dwicao/react-native-login-screen)效果如下图右→
<div align="center">
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/12.jpg"/>
    <img width="280" height="497" src="https://raw.githubusercontent.com/dwicao/react-native-login-screen/master/demo.gif"/>
  </div>
  
* 7.12更新 
###### 更新了闪屏页，获取联系人等。用到了跟原生代码做交互的依赖库react-native-splash-screen

<div align="center"> 
   <img width="280" height="497" src="https://github.com/ok406lhq/RTCoin/blob/c2934ac94fa37e45dfaf6d19e1bb373e4b1fe0d6/screenshots/splash.gif"/>
  <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/15.jpg"/>
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/13.jpg"/>
</div>

* 7.15更新
######  解决Listview中数据源为json时，获取不了本地资源的问题，json数据中提供的url不能为本地资源的路径，否则会找不到资源解析，如果要获取本地资源，可以在js文件中export一个data对象，在data中存储本地资源的数据源，具体参考ListViewComponent.js
* 7.20更新
######  重新设计了“我的”界面，以至于不再那么土了:laughing::laughing::laughing:然后就是继续优化UI界面~（上面的第二三张截图）

<div align="center">
     <img width="750" height="700" src="https://raw.githubusercontent.com/wuxudong/react-native-charts-wrapper/master/screenshot/Android%20ScreenShot.png"/>
  </div>
  
* 7.24更新
######  交易界面中应用了[react-native-charts-wrapper](https://github.com/wuxudong/react-native-charts-wrapper)这个图表库（如上图），这个第三方图形库图形很全面，功能很强大，可以实现缩放，还有一些有趣的动画效果~下面是自定义的图形，用作显示增长趋势。
<div align="center">
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/14.jpg"/>
    <img width="280" height="497" src="https://raw.githubusercontent.com/ok406lhq/RTCoin/master/screenshots/screen_video.gif"/>
</div>
