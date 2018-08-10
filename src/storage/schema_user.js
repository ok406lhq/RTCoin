/**
 *
 * Created by zerowolf on 2017/11/14.
 */
import Realm from 'realm';
import realm from './realm';
import ToastUtil from "../utils/ToastUtil";

export class UserSchema extends Realm.Object {

    // _username;
    // _IDCard;
    // _phone;
    //
    //
    // constructor(username, IDCard, phone) {
    //     super();
    //     this._username = username;
    //     this._IDCard = IDCard;
    //     this._phone = phone;
    // }
    // toString(){
    //     return '卡号'+this._IDCard +'用户名'+ this._username +'手机号'+ this._phone
    // }
}

UserSchema.schema = {
    name: 'User',
    properties: {
        merCode: 'int',                 //用户姓名
        username: 'string',                 //用户姓名
        IDCard: 'string',  // 身份证号
        phone: 'string',   //预留手机号
    }
};



export {

};

