/**
 * @Author: 付柏磊
 * @Date: 2022-12-13 16:56:14
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-12-13 16:58:03
 * @Description: desc
 */

/**
 * 对象深拷贝
 * @param data
 * @returns {{}|*}
 */
export const deepClone = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}
/**
 * 判断数据类型
 * @param obj
 * @returns {string|*}
 */
export const getObjType = obj => {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}
/**
 * 一般用于字典回显，已知value展示label
 * @param {*} value 需要筛选的数据值
 * @param {*} props 对象，{labelkey: '', valueKey: ''},当前数据对应的可以 value
 * @param {*} data 原始数据,数组
 */
export function filterDict(value, data, props = {labelKey: 'label', valueKey: 'value'}) {
    if (!data) return value
    let arr = data.filter(item => item[props.valueKey] == value);
    let res = arr.length > 0 ? arr[0][props.labelKey] : '';
    return res;
}

/**
 * 用于字典回显1,3,5,6样式的列表，
 * @param value 参数之间用逗号隔开的字符串
 * @param list  字典数据
 * @param props 对象，{labelkey: '', valueKey: ''},对应的值
 * @returns {string} 返回一些label用空格隔开的字符串
 */
export function filterDictList(value, list, props = {labelKey: 'label', valueKey: 'value'}){
    let temp = "";
    let arr = value.split(",");
    list.forEach(item => {
        if (arr.includes(item[props.valueKey]+'')){
            temp = temp + " " + item[props.labelKey];
        }
        temp = temp.trim();
    })
    return temp;
}

/**
 * 日期格式化
 * @param date 传入的date对象
 * @param format 格式化的形式
 * @returns {string}
 */
export function dateFormat(date, format = 'yyyy-MM-dd hh:mm:ss') {
    // let format = 'yyyy-MM-dd hh:mm:ss'
    if (date) {
        if (date instanceof Date) {
            var o = {
                'M+': date.getMonth() + 1, // month
                'd+': date.getDate(), // day
                'h+': date.getHours(), // hour
                'm+': date.getMinutes(), // minute
                's+': date.getSeconds(), // second
                'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
                'S': date.getMilliseconds() // millisecond
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1,
                        RegExp.$1.length === 1 ? o[k]
                            : ('00' + o[k]).substr(('' + o[k]).length))
                }
            }
            return format
        } else {
            return date || ''
        }
    }
}

/**
 * 获取数组里的ids
 * @param id
 * @param arr
 * @returns {string}
 */
export function getArrayIds(id, arr){
    let ids = "";
    arr.forEach((item,index)=>{
        ids = !index? item[id] : ids + ',' + item[id];
    })
    return ids
}

/**
 * 将一个对象里相同key的值赋给空值的模板对象
 * @param tempForm 模板对象
 * @param valueForm 有值的对象
 * @returns {*}
 */
export function setAssignObj(tempForm, valueForm){
    let obj = {
        ...tempForm
    }
    for (let key in tempForm){
        obj[key] = valueForm[key]
    }
    return obj
}

// 通过table_name等来判断栏目类型
export function setProjectType(item){
    if (item.classbId || item.tableName || item.tableName2){
        item.table_name = item.tableName;
        item.table_name2 = item.tableName2;
        item.classb_id = item.classbId || "";
    }
    let type;
    let num;
    if (
        item.table_name == "ZBXX" &&
        item.table_name2 == "ZBGG" &&
        item.classb_id.indexOf("001") > -1
    ) {
        type = "工程招标";
        num = 1;
    } else if (
        item.table_name == "ZBXX" &&
        item.table_name2 == "ZBGG" &&
        item.classb_id.indexOf("002") > -1
    ) {
        type = "货物招标";
        num = 2;
    } else if (
        item.table_name == "ZBXX" &&
        item.table_name2 == "ZBGG" &&
        item.classb_id.indexOf("003") > -1
    ) {
        type = "服务招标";
        num = 3;
    } else if (
        item.table_name == "ZBXX" &&
        item.table_name2 == "ZBGS"
    ) {
        type = "中标公示";
        num = 4;
    } else if (
        item.table_name == "ZBXX" &&
        item.table_name2 == "ZBYG"
    ) {
        type = "招标预告";
        num = 5;
    } else if (
        item.table_name == "CGXX" &&
        item.table_name2 == "ZFCG"
    ) {
        type = "政府采购";
        num = 6;
    } else if (
        item.table_name == "CGXX" &&
        item.table_name2 == "QYCG"
    ) {
        type = "企业采购";
        num = 7;
    } else if (
        item.table_name == "XMXX" &&
        item.table_name2 == "VIPXM"
    ) {
        type = "VIP项目";
        num = 3030;
    } else if (
        item.table_name == "XMXX" &&
        item.table_name2 == "BAHZ"
    ) {
        type = "项目核准批复";
        num = 3020;
    } else if (
        item.table_name == "XMXX" &&
        item.table_name2 == "XMDT"
    ) {
        type = "项目动态";
        num = 3050;
    } else if (
        item.table_name == "XMXX" &&
        item.table_name2 == "XMGZ"
    ) {
        type = "项目跟踪";
        num = 3070;
    } else if (
        item.table_name == "XMXX" &&
        item.table_name2 == "XMGS"
    ) {
        type = "项目公示";
        num = 3110;
    } else if (
        item.table_name == "XMXX" &&
        item.table_name2 == "XMYG"
    ) {
        type = "项目预告";
        num = 3120;
    } else {
        type = "工程招标";
        num = 1;
    }
    return {type, num};
}

/**
 * 设置付费权限弹窗
 */
export function setFreeMask(type){
    const guideWords = {
        default: "尊敬的客户，你所查看的内容属于付费客户专项，请垂询",
        feature: "尊敬的客户，你所查看的内容属于付费客户权限，详情请垂询",
    }
    let guideText = guideWords.default;
    if (type){
        guideText = guideWords[type];
    }
    var freeMask = document.createElement("div");
    freeMask.id = "freeMask";
    freeMask.innerHTML =
        `<div class="freeMaskBox"><div id="freeMaskClose"></div>${guideText}<br><sapn class="freeMaskPhone">400-006-6655</sapn></div>`
    document.body.appendChild(freeMask);
    document.querySelector("#freeMaskClose").onclick = function () {
        document.body.removeChild(document.querySelector("#freeMask"));
    }
}