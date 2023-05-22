// 统一请求路径前缀在libs/axios.js中修改
import {getRequest, postRequest,} from '@/libs/axios';
import {baseURL} from '@/api/baseURL'

/**
 *  首页--我的
 */

//获取项目情况
export const getProjectStatus = (params) => {
    return getRequest('/swsuser/getProjectStatus', params)
}

//获取项目数据统计
export const getProjectData = (params) => {
    return getRequest('/swsuser/getProjectData', params)
}

//获取管理平台成员管理列表
export const getAccountUsage = (params) => {
    return getRequest('/swsuser/getAccountUsage', params)
}

//获取管理平台待审核列表
export const getApplyList = (params) => {
    return getRequest('/swsuser/getApplyList', params)
}

//多条件分页获取用户列表
export const getByCondition = (params) => {
    return getRequest('/swsuser/getByCondition', params)
}

/**
 *  首页--我的团队
 */
//获取团队项目数据统计
export const getTeamProjectData = (params) => {
    return getRequest('/swsuser/getTeamProjectData', params)
}

/**
 *  首页--非管理员
 */
//我的浏览
export const getMyVisit = (params) => {
    return getRequest('/MySee/myVisit', params)
}

//我的收藏
export const getMyCollect = (params) => {
    return getRequest('/mycollect/myCollect', params)
}

//我的订阅
export const getMySub = (params) => {
    return getRequest('/MySubscribe/mySub', params)
}

//我的分享
export const getMyShare = (params) => {
    return getRequest('/myshare/myShare', params)
}

//我的导出
export const getMyExport = (params) => {
    return getRequest('/myexport/myExport', params)
}

//获取账号余量
export const getAccountBalance = (params) => {
    return postRequest('/swsuser/getAccountBalance', params)
}

/**
 *  首页--免费用户
 */
// 热门信息推荐
export const getPvInfo = (params) => {
    return postRequest('/swsinfo/getPvInfo', params)
}

// 免费&项目信息推荐
export const getMaindata = (params) => {
    return postRequest('/swsinfo/maindata', params)
}

// 招标公告推荐
export const getRecommendBidding = (params) => {
    return postRequest('/swsinfo/recommendBidding', params)
}





