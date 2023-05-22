import {
    getRequest,
    postRequest,
    postDownFile
} from '@/libs/axios';
import {
    baseURL
} from '@/api/baseURL'

//获取当前登录用户接口
export const getSwsuserInfo = (params) => {
    return getRequest('/swsuser/info', params)
}
//获取账号概览
export const getAccountInfo = (params) => {
    return postRequest('/swsuser/accountOverview', params)
}

//获取团队用户昵称
export const getTeamUserName = (params) => {
    return postRequest('/swsuser/getTeamUserName', params)
}

//获取子账号权限配置
export const getUserRights = (params) => {
    return postRequest('/swsuser/getUserRights', params)
}

//审核通过--驳回
export const updateApplyLog = (params) => {
    return postRequest('/swsuser/updateApplyLog', params)
}

//历史操作记录
export const getHistoryOperList = (params) => {
    return getRequest('/swsuser/getLogList', params)
}

//发送验证码
export const sendVerifyCode = (params) => {
    return postRequest('/swsuser/sendVerifyCode', params)
}

//编辑子账号信息
export const editUserInfo = (params) => {
    return postRequest('/swsuser/editUser', params)
}

//更新用户信息
export const updateUserInfo = (params) => {
    return postRequest('/swsuser/updateUser', params)
}

//重置密码
export const setRestPwd = (params) => {
    return postRequest('/swsuser/restPwd', params)
}

//配额申请
export const addApplyLog = (params) => {
    return postRequest('/swsuser/addApplyLog', params)
}

//操作日志列表
