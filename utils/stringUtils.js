/**
 * Created by zjqian on 2018/8/22.
 */

export function validAccount(account) {

    var PATTERN_CHINAMOBILE = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/; //移动号
    var PATTERN_CHINAUNICOM = /^1(3[0-2]|5[56]|8[56]|4[5]|7[6])\d{8}$/; //联通号
    var PATTERN_CHINATELECOM = /^1(3[3])|(8[019])\d{8}$/; //电信号
    if (!PATTERN_CHINAUNICOM.test(account) && !PATTERN_CHINAMOBILE.test(account) && !PATTERN_CHINATELECOM.test(account)) {
        return false
    }
    return true
}
