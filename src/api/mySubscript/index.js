/**
 * @Author: 付柏磊
 * @Date: 2022-09-01 08:45:40
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 08:46:52
 * @Description: 我的订阅相关接口
 */
import {getRequest, postRequest,postDownFile} from '@/libs/axios';
import {baseURL} from '@/api/baseURL'

//获取账号概览
export const getMySubscribe = (params) => {
    return postRequest('/swsinfo/getMySubscribe', params)
}

//获取同行关键词
export const getPeerKeyWord = (params) => {
    return postRequest('/swsinfo/getPeerKeyWord', params)
}

//招标订阅预览
export const getZbPreview = (params) => {
    return postRequest('/swsinfo/zbPreview', params)
}

//项目信息预览
export const getNzjPreview = (params) => {
    return postRequest('/swsinfo/nzjPreview', params)
}
