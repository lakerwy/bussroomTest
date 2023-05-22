/**
 * @Author: 付柏磊
 * @Date: 2022-09-01 16:25:00
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 16:26:34
 * @Description: 我的关注相关页面接口
 */
import {getRequest, postRequest,postDownFile, postPayloadRequest} from '@/libs/axios';

/**
 *  我的关注--我的浏览
 */
//获取搜索条件列表
export const getMemberSearch = (params) => {
    return postRequest('/swsinfo/getMemberSearch', params)
}
//保存高级搜索条件
export const saveMemberSearch = (params) => {
    return postRequest('/swsinfo/saveMemberSearch', params)
}

//删除搜索条件
export const removeMemberSearch = (params) => {
    return postRequest('/swsinfo/removeMemberSearch', params)
}

// 我的浏览记录查询
export const getMyVisit = (params) => {
    return getRequest('/MySee/myVisit', params)
}

//中标搜索
export const getBidSearch = (params) => {
    return postRequest('/swsinfo/bidSearch', params)
}

//信息收藏
export const infoCollect = (params) => {
    return postRequest('/swsinfo/collect', params)
}

//重要标记
export const markImport = (params) => {
    return postRequest('/swsinfo/collectMark', params)
}

//查企业
export const getComSearch = (params) => {
    return getRequest('/swsinfo/comSearch', params)
}

//公告下载
export const downAnnouncement = (params, title) => {
    return postDownFile('/swsinfo/down', params).then((response)=>{
        const blob = new Blob([response]); //,{type: 'application/vnd.ms-excel;charset=utf-8'}
        const elink = document.createElement('a');
        elink.download = title;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
    })
}

//公告导出·
export const exportAnnouncement = (params) => {
    return postRequest('/swsinfo/export', params)
}

//项目跟进列表
export const getFollowList = (params) => {
    return getRequest('/swsinfo/myCollect', params)
}

//我的收藏列表
export const getCollectList = (params) => {
    return getRequest('/swsinfo/myCollectList', params)
}

//项目联系人
export const getProjectPerson = (params) => {
    return getRequest('/swsinfo/myContact', params)
}

//我的导出
export const getMyExport = (params) => {
    return getRequest('/swsinfo/myExport', params)
}

//我的导出明细
export const getMyExportDetail= (params) => {
    return getRequest('/swsinfo/myExportDetail', params)
}

//我的分享列表
export const getMyShareList= (params) => {
    return getRequest('/swsinfo/myShareList', params)
}

//项目高级搜索
export const getNzjSearch = (params) => {
    return postRequest('/swsinfo/nzjSearch', params)
}

//移除收藏
export const removeCollect = (params) => {
    return postRequest('/swsinfo/removeCollect', params)
}

//移除分享
export const removeShare = (params) => {
    return postRequest('/swsinfo/removeShare', params)
}

//批量分享
export const setShare = (params) => {
    return postPayloadRequest('/swsinfo/share', params)
}

//招标采购信息搜索
export const getZtbSearch = (params) => {
    return postRequest('/swsinfo/ztbSearch', params)
}

// 保存搜索设置
// POST /xboot/searchGroup/save
export const saveSearch = (params) => {
    return postRequest('/searchGroup/save', params)
}

//公告已读
export const getIsRead = (params) => {
    return postRequest('/swsinfo/isRead', params)
}

