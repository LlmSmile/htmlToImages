
// 保留两位小数
function Tofixed(value) {
    // 截取当前数据到小数点后两位
    let realVal = parseFloat(value).toFixed(2)
    return realVal
}
// 保留两位小数并转化时间单位
function Tofixed_time_3600(num) {
    return num == 0 ? num : (num / 3600).toFixed(2);
}
// 转化时间格式 年月日  时分秒
function filterTime(time) {
    var date = new Date(time);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return y + "年" + m + "月" + d + "日" + " " + h + ":" + minute;
}
// 转化时间格式 年月日
function filterTime2(time) {
    var date = new Date(time);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    return y + "年" + m + "月" + d + "日";
}
// 文字/字符首字母
function Splice(str) {
    if (!str) return "";
    str = str.toString();
    return str.substr(0, 1);
}
// 根据时间段获取相差XX天xx小时xx分钟
function formatDuring(millisecond) {
    var days = parseInt(millisecond / (1000 * 60 * 60 * 24));
    var hours = parseInt(
        (millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (millisecond % (1000 * 60)) / 1000;
    return days + " 天 " + hours + " 小时 " + minutes + " 分钟 ";
}
export {
    Tofixed,
    Tofixed_time_3600,
    filterTime,
    filterTime2,
    formatDuring,
    Splice
}
