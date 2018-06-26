'use strict';

import * as types from '../../constants/regTypes';

export function reg(mobile, password) {
    console.log('注册方法');
    return dispatch => {
        dispatch(isReging());
        // 模拟用户注册
        if (true) {
            dispatch(regSuccess(true));
        } else {
            dispatch(regError(false));
        }
        /*let result = fetch('https://localhost:8088/reg')
         .then((res) => {
         dispatch(regSuccess(true, user));
         }).catch((e) => {
         dispatch(regError(false));
         })*/
    }
}

function isReging() {
    return {
        type: types.REG_DOING
    }
}

function regSuccess(isSuccess, user) {
    console.warn('success');
    return {
        type: types.REG_DONE,
        user: user,
    }
}

function regError(isSuccess) {
    console.log('error');
    return {
        type: types.REG_ERROR,
    }
}
