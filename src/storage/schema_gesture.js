/**
 * Created by zerowolf Date: 2018/5/3 Time: 上午11:28
 */

import Realm from 'realm';
import realm from "./realm";

export class GestureSchema extends Realm.Object {

}

GestureSchema.schema = {
    name: 'Gesture',
    properties: {
        merCode: 'string',         //用户唯一ID
        gesturePsw: 'string',   //手势密码
        gestureStatus: {type: 'bool', default: false}
    }
};

const isGestureLogin = () => {

    let objects = realm.objects('Gesture');

    if (objects.length > 0) {
        return objects[0].gestureStatus;
    } else {
        return false;
    }
};

const deleteGestureLogin = () => {
    realm.write(() => {
        let objects = realm.objects('Gesture');
        realm.delete(objects);
    })
};

const getGesturePsw = () => {
    let objects = realm.objects('Gesture');
    if (objects.length > 0) {
        return objects[0].gesturePsw;
    }
};

const writeGesturePsw = (merCode, gesturePsw) => {
    realm.write(() => {
        let objects = realm.objects('Gesture');
        realm.delete(objects);

        realm.create('Gesture', {
            merCode: merCode,         //用户唯一ID
            gesturePsw: gesturePsw,   //手势密码
            gestureStatus: true
        })

        let objects1 = realm.objects('Gesture');
        console.log(objects1[0]);

    })
};
const getGestureData = () => {
    let objects = realm.objects('Gesture');
    // realm.delete(objects);
    if (objects.length > 0) {
        console.log(objects[0]);
        return objects[0];
    }

};


export {
    getGestureData,
    isGestureLogin,
    deleteGestureLogin,
    getGesturePsw,
    writeGesturePsw
};
