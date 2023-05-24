// 统一请求路径前缀在libs/axios.js中修改
import { postAxios } from '@/libs/axios';

//获取绑定公众号微信二维码
export const toBindWechat = (params) => {
    return postAxios('sws_to_bind_wechat', params)
}

//获取用户信息
export const getSwsuserInfo = (params) => {
    return postAxios('sws_get_user_info', params)
}
//获取用户菜单
export const getMenuList = (params) => {
    return postAxios('sws_get_menu_list', params)
}

//获取团队用户昵称
export const getTeamUserName = (params) => {
    return postAxios('sws_get_team_user_name', params)
}

//分页获取消息推送数据
export const getMessageSendData = (params) => {
    return postAxios('sws_get_message_send_data', params)
}

/*----------------首页管理员部分接口--------------------*/
//首页-获取项目情况
export const getProjectStatus = (params) => {
    return postAxios('sws_get_project_status', params)
}
//首页-获取项目数据统计
export const getProjectData = (params) => {
    return postAxios('sws_get_project_data', params)
}
//首页-获取管理平台成员管理列表
export const getAccountUsage = (params) => {
    return postAxios('sws_get_account_usage', params)
}
//首页-获取管理平台待审核列表
export const getApplyList = (params) => {
    return postAxios('sws_get_apply_list', params)
}
//首页-获取团队项目数据统计
export const getTeamProjectData = (params) => {
    return postAxios('sws_get_team_project_data', params)
}

/*-----------------------我的应用-定制行为报告------------------------------*/
// 是否可以申请报告
export const applyReport = (params) => {
    return postAxios('sws_can_applay_report', params)
}
// 申请定制化行为报告
export const getBehaviorReport = (params) => {
    return postAxios('sws_applay_report', params)
}
// 下载报告
export const downReport = (params) => {
    return postAxios('sws_down_report', params)
}
