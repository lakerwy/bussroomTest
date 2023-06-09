export default {
  reg: {
    // /[`!@$%^?:{}\\|;＠……＝＋｛｝｜？：｀]/
    particular: /[`!@$%^?:{}\\|;＠……＝＋｛｝｜，？：｀]+/, // 特殊字符
    name: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 名称，中文数字字母
    money: /^[0-9]+$/, // 金额
    chinese: /^[\u4e00-\u9fa5]+$/, // 全中文
    english: /^[a-zA-Z]+$/, // 全英文
    telphone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    email: /^[\w\*]+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, // 邮箱
    // code: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/, // 组织编码
    code: /^[0-9a-zA-Z]*$/, // 组织编码
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, // 身份證
    chinesenum: /^[0-9\u4e00-\u9fa5]+$/,
    fixtel: /^(0\d{2,3}-?|\(0\d{2,3}\))[1-9]\d{6,7}$/,
    price: /^((0)|([1-9][0-9]*)|(([0]\.\d+|[1-9][0-9]*\.\d+)))$/,   // 金额，可以是小数
  },
};
