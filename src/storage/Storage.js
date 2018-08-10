/**
 * Created by zerowolf on 2018/4/8.
 */
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

const SPStorage = new Storage({
    // maximum capacity, default 1000
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {}
});

// global.storage = storage1
// export default storage;

const SPSaveLoginInfo = (phone, password) => {
    // 删除单个数据
    // SPStorage.remove({
    //     key: 'loginState'
    // });
    console.log('phone: ',phone);
    console.log('password: ',password);

    SPStorage.save({
        key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
        data: {
            phone: phone,
            // password: password,
        },
        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期
        // expires: 1000 * 3600
        expires: null
    });
}

// 读取
const SPReadLoginInfo = () => {
    return new Promise((resolve, reject) => {

        SPStorage.load({
            key: 'loginState',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            resolve(ret);
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.log(err);
            reject(err);
        })
    })
}

const saveFirstLogin = () => {
    SPStorage.save({
        key: 'isFirstLogin',  // 注意:请不要在key中使用_下划线符号!
        data: {
            isFirstLogin: true,
            loginDate: new Date()
        },

        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期
        // expires: 24*60*60*1000
        // expires: 60 * 60 * 1000,      //一个小时
        expires: 7*24*60*60*1000      //一个礼拜
        // expires: 1000         //1秒
    });
};

const isFirstLogin = () => {
    return new Promise((resolve, reject)=> {
        SPStorage.load({
            key: 'isFirstLogin',
            autoSync: true,
            syncInBackground: true,
        }).then(res => {
            console.log(res);
            resolve(false);
        }).catch(err => {
            resolve(true);
            reject(err);
            console.log(err);
        })
    })
};


export {
    SPStorage,
    SPSaveLoginInfo,
    SPReadLoginInfo,
    saveFirstLogin,
    isFirstLogin
};
