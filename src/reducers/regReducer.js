'use strict';
import * as types from '../constants/regTypes';

const initialState = {
    status: '点击注册',
    isSuccess: false
};

export default function reg(state = initialState, action) {
    switch (action.type) {
        case types.REG_DOING:
            return {
                ...state,
                status: '正在注册',
                isSuccess: false,
                user: null,
            };
            break;
        case types.REG_DONE:
            return {
                ...state,
                status: '注册成功',
                isSuccess: true,
                user: action.user,
            };
            break;
        case types.REG_ERROR:
            return {
                ...state,
                status: '注册出错',
                isSuccess: true,
                user: null,
            };
            break;
        default:
            console.log(state);
            return state;
    }
}