import React from 'react';

import {THEME} from '../assets/css/color';

export function getStackOptions(title) {
    return {
        title: title || '',
        headerTintColor: 'white',
        headerStyle: {
            height: 54,
            backgroundColor: THEME
        },
        headerTitleStyle: {
            paddingTop: 8,
            fontSize: 17
        }
    }
}
