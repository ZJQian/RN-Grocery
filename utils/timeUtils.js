/**
 * Created by zjqian on 2018/8/22.
 */


//将秒数转换成 mm: ss的格式
export default function duration2mmss(duration) {
    let m = duration/60
    let s = duration%60
    var mStr = ""
    var sStr = ""
    mStr = parseInt(m) < 10 ? "0"+String(parseInt(m)) : String(parseInt(m))
    sStr = s < 10 ? "0"+String(s) : String(s)
    return mStr+"'"+sStr+"\""
}