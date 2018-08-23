/**
 * Created by zjqian on 2018/8/15.
 */
import React, {
    Component
} from 'react';

import CryptoJS from 'crypto-js/crypto-js';


export function md5(str) {

    return String(CryptoJS.MD5(str)).toUpperCase()
}


export function sign(data) {
    var strs=[];
    var sortStr=''
    for(let i in data){
        strs.push(i+'='+data[i]);
    }
    strs.sort();  // 数组排序
    for (let i=0;i<strs.length;i++) {
        let str = strs[i]
        sortStr += str.split('=')[1]
    }
    let string = sortStr+'KrEmeCxtY59VoeuvrZpM2kQpbY6wGWsZWZEyzeJJxgNS3ipMP30aRoLYpf3vTAoXN1bwqrjpCjhzZ9'
    return md5(string)
}
