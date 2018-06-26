import React from 'react';
import {THEME} from '../assets/css/color';
export function getStackOptions(title) {
    return {
        title: title || '',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: THEME
        }
    }
}