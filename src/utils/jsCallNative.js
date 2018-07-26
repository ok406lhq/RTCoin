import {Platform, NativeModules} from 'react-native';

var HybirdController = NativeModules.HybirdController

export function loading() {
    if (Platform.OS === 'IOS') {
        HybirdController.showLoading()
    }
}

export function dismiss() {
    if (Platform.OS === 'IOS') {
        HybirdController.dismiss()
    }
}