// 统一请求路径前缀在libs/axios.js中修改
import { postAxios } from '@/libs/axios';
import {
    baseURL
} from '@/api/baseURL'

//获取用户信息
export const getSwsuserInfo = (params) => {
    return postAxios('sws_get_user_info', params)
}
//获取用户菜单
export const getMenuList = (params) => {
    return postAxios('sws_get_menu_list', params)
}

