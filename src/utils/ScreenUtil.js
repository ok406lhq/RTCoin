/*
/!**
 * Created by lam Date: 2018/8/11 Time: 上午10:09
 *!/
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native'


const zWidth = Dimensions.get('window').width
const zStatusBarHeight = StatusBar.currentHeight;
const zAppBarHeight = Platform.OS === 'ios' ? 60 : 60;
const zPixelScale = PixelRatio.get();
// const zHeight = Platform.OS ==='ios'?Dimensions.get('window').height-zAppBarHeight:Dimensions.get('window').height;
const zHeight = Dimensions.get('window').height;


let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

const defaultPixel = 3.5;                           //iphone8的像素密度
//px转换成dp
// 2560 x 1440
const w2 = 1440 / defaultPixel;
const h2 = 2560 / defaultPixel;
const scale = Math.min(zHeight / h2, zWidth / w2);   //获取缩放比例
// const scale =  zWidth / w2   //获取缩放比例

/!**
 *字体尺寸
 * @param sp
 * @returns {number}
 *!/
const zsp = (sp) => {


    let newSp = Math.round((sp * scale + 0.5) * zPixelScale / fontScale);
    return newSp * 1.25 / defaultPixel;
};

/!**
 * 控件尺寸
 * @param dp
 * @returns {number}
 *!/
const zdp = (dp) => {
    let newSize = dp * 4;
    newSize = Math.round(newSize * scale + 0.5);
    return newSize / defaultPixel;

}


export {
    zWidth,
    zHeight,
    zStatusBarHeight,
    zAppBarHeight,
    zPixelScale,
    zdp,
    zsp
    // setSpText,
    // scaleSize
};

// global.ScreenUtil = ScreenUtil;
// global.zWidth = ScreenUtil.width;
// global.zHeight = ScreenUtil.height;
*/

/**
 * Created by lam Date: 2018/8/11 Time: 上午10:59
 */
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native'


const zWidth = Dimensions.get('window').width
// const zStatusBarHeight = StatusBar.currentHeight;

const zPixelScale = PixelRatio.get();
// const zHeight = Platform.OS ==='ios'?Dimensions.get('window').height-zAppBarHeight:Dimensions.get('window').height;
const zHeight = Dimensions.get('window').height;


let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

const defaultPixel = 3.5;//iphone8的像素密度

const defaultPixel1 = 2;
//px转换成dp
// 2560 x 1440
const w2 = 1440 / defaultPixel;
const h2 = 2560 / defaultPixel;
const scale = Math.min(zHeight / h2, zWidth / w2);   //获取缩放比例
// const scale =  zWidth / w2   //获取缩放比例

const zFontScale = 411 / zWidth;


const w1 = 750 / defaultPixel1;
const h1 = 1334 / defaultPixel1;
const scale1 = Math.min(zHeight / h1, zWidth / w1);   //获取缩放比例
// const scale1 = zHeight / h1;   //获取缩放比例



/**
 *字体尺寸
 * @param sp
 * @returns {number}
 */
const zsp = (sp) => {


    // let newSp = Math.round((sp * scale + 0.5) * zPixelScale / fontScale);
    // return newSp * 1.25 / defaultPixel;
    // sp = Math.round((sp * scale1 + 0.5) * zPixelScale / fontScale);
    // return sp / defaultPixel1;


    return (sp / zFontScale) / fontScale;

};




/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
/*const zsp = (size) => {
    /!* size = Math.round((size * scale + 0.5) * zPixelScale / fontScale);
     return size*1.3/ defaultPixel;*!/
    const fontSizeScaler = zPixelScale / fontScale;
    return size * fontSizeScaler/2;
};*/
/**
 * 控件尺寸
 * @param dp
 * @returns {number}
 */
const zdp = (dp) => {
    let number = dp * 3.5;

    // let number = dp * 2;
    let newSize = Math.round(number * scale + 0.5);
    return newSize / defaultPixel;

}


// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
const isIphoneX = () => {
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((zHeight === X_HEIGHT && zWidth === X_WIDTH) ||
            (zHeight === X_WIDTH && zWidth === X_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
const ifIphoneX = (iphoneXStyle, iosStyle, androidStyle)=> {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
}


// const zAppBarHeight = Platform.OS === 'ios' ? zdp(60): zdp(70);
// const zModalHeight = zHeight - zAppBarHeight;
// const zModalMarginTop = Platform.OS === 'ios' ? zAppBarHeight : zAppBarHeight - zStatusBarHeight;
const zStatusBarHeight = Platform.OS === 'ios' ? isIphoneX() ? 44 : 20 : StatusBar.currentHeight;

const zAppBarHeight = Platform.OS === 'ios' ? isIphoneX()?zdp(80):zdp(70): zdp(70);
const zModalHeight = zHeight - zdp(zAppBarHeight);
const zModalMarginTop = Platform.OS === 'ios' ? zAppBarHeight : zAppBarHeight - zStatusBarHeight;

export {
    zWidth,
    zHeight,
    zStatusBarHeight,
    zAppBarHeight,
    zPixelScale,
    zdp,
    zsp,
    zModalHeight,
    zModalMarginTop,
    isIphoneX,
    ifIphoneX
    // setSpText,
    // scaleSize
};

// global.ScreenUtil = ScreenUtil;
// global.zWidth = ScreenUtil.width;
// global.zHeight = ScreenUtil.height;
