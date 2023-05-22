import {getRequest, postRequest,postDownFile, postPayloadRequest} from '@/libs/axios';

// 定制化行为报告
export const getBehaviorReport = (params) => {
    return getRequest('/behaviorReport/sedBehaviorReport', params)
}

// 申请报告
export const applyReport = (params) => {
    return getRequest('/behaviorReport/type', params)
}

// 下载报告
export const downReport = (params) => {
    return getRequest('/behaviorReport/down', params)
}