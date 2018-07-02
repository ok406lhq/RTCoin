import React from 'react';
import {View} from "react-native";

import {THEME} from '../assets/css/color';

export function getStackOptions(title) {
    return {
        title: title || '',
        headerTintColor: 'white',
        headerStyle: {
            height:54,
            backgroundColor: THEME
        },
        headerTitleStyle: {
            alignSelf:"auto",
            fontSize:17
        },
    }
}
