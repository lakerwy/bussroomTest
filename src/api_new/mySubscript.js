// 统一请求路径前缀在libs/axios.js中修改
import { postAxios } from '@/libs/axios';

/*----------------------我的订阅---------------------------*/
//获取订阅器概览
export const getMySubscribe = (params) => {
    return postAxios('sws_get_my_subscribe', params)
}
//获取我的订阅
export const getMySub = (params) => {
    return postAxios('sws_get_my_sub', params)
}
//更新订阅器条件
export const putGroup = (params) => {
    return postAxios('sws_update_group', params)
}

//保存订阅器条件
export const saveSearch = (params) => {
    return postAxios('sws_save_subscribe', params)
}
//招标订阅智能预览
export const getZbPreview = (params) => {
    return postAxios('sws_get_zb_preview', params)
}
//拟在建项目智能预览
export const getNzjPreview = (params) => {
    return postAxios('sws_get_nzj_preview', params)
}
//删除订阅器
export const removeGroup = (params) => {
    return postAxios('sws_remove_subscribe', params)
}
//获取同行关键词
export const getPeerKeyWord = (params) => {
    return postAxios('sws_get_peer_keyword', params)
}
