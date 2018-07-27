/**
 * Created by lam on 2018/7/20.
 */

import {Dimensions} from 'react-native'

const deviceW = Dimensions.get('window').width

const basePx = 375

export default function px2dp(px) {
    return px * deviceW / basePx;
}
