// 统一请求路径前缀在libs/axios.js中修改
import { postAxios,postDownAxios } from '@/libs/axios';

/*----------------------我的关注-找商机项目---------------------------*/
//获取搜索条件列表
export const getMemberSearch = (params) => {
    return postAxios('sws_get_member_search', params)
}
//招标采购信息搜索
export const getZtbSearch = (params) => {
    return postAxios('sws_get_ztb_search', params)
}
//拟在建项目搜索
export const getNzjSearch = (params) => {
    return postAxios('sws_get_nzj_search', params)
}
//保存搜索条件
export const saveMemberSearch = (params) => {
    return postAxios('sws_save_member_search', params)
}
//移除搜索条件
export const removeMemberSearch = (params) => {
    return postAxios('sws_remove_member_search', params)
}
//收藏公告-单个
export const saveCollection = (params) => {
    return postAxios('sws_save_collect', params)
}
//取消收藏公告-单个
export const removeCollection = (params) => {
    return postAxios('sws_remove_collect', params)
}
//批量收藏公告-列表
export const collectMailSub = (params) => {
    return postAxios('sws_save_collect_list', params)
}
//批量取消收藏公告-列表
export const removeCollect = (params) => {
    return postAxios('sws_remove_collect_list', params)
}
//批量导出文件
export const exportAnnouncement = (params) => {
    return postAxios('sws_export_announcement', params)
}
//批量分享公告
export const setShare = (params) => {
    return postAxios('sws_set_share', params)
}

let downUrl = 'http://gys-public.oss-cn-beijing.aliyuncs.com/user_export/'
//公告下载
export const downAnnouncement = (params, title)=> {
    let url = downUrl+params.path;
    let elA = document.createElement("a");
    elA.href = url;
    elA.download = url;
    elA.click();
}

/*---------------------我的关注-我的浏览-----------------------------*/
//我的浏览记录
export const getMyVisit = (params) => {
    return postAxios('sws_get_my_visit', params)
}
/*---------------------我的关注-重要项目-------------------------*/
//重要项目跟进列表
export const getFollowList = (params) => {
    return postAxios('sws_get_my_collect', params)
}
//重要标记和移除重要标记
export const markImport = (params) => {
    return postAxios('sws_mark_import', params)
}
/*---------------------我的关注-我的导出-------------------------*/
//我的导出
export const getMyExport = (params) => {
    return postAxios('sws_get_my_export', params)
}
//我的导出明细
export const getMyExportDetail= (params) => {
    return postAxios('sws_get_my_export_detail', params)
}
/*---------------------我的关注-我的收藏-------------------------*/
//我的收藏列表
export const getCollectList= (params) => {
    return postAxios('sws_get_collect_list', params)
}
/*---------------------我的关注-我的分享-------------------------*/
//我的分享列表
export const getMyShareList= (params) => {
    return postAxios('sws_my_share_list', params)
}
//移除分享
export const removeShare= (params) => {
    return postAxios('sws_remove_share', params)
}