import React from 'react';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认30天（1000 * 3600 * 24 * 30 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24 * 30,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    sync: {

        // The name of the sync method must be the same of the data's key
        // And the passed params will be an all-in-one object.
        // You can use promise here.
        // Or plain callback function with resolve/reject, like:
        user(params) {
            let {id, resolve, reject, syncParams: {extraFetchOptions, someFlag}} = params;
            fetch('user/', {
                method: 'GET',
                body: 'id=' + id,
                ...extraFetchOptions,
            }).then(response => {
                return response.json();
            }).then(json => {
                // console.log(json);
                if (json && json.user) {
                    storage.save({
                        key: 'user',
                        id,
                        data: json.user
                    });

                    if (someFlag) {
                        // do something for this extra param
                    }

                    // Call resolve() when succeed
                    resolve && resolve(json.user);
                }
                else {
                    // Call reject() when failed
                    reject && reject(new Error('data parse error'));
                }
            }).catch(err => {
                console.warn(err);
                reject && reject(err);
            });
        }
    }
});

// 全局变量
global.storage = storage;
