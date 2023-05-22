import axios from 'axios';
import { getDictData } from '@/api/index';

import { postAxios } from '@/libs/axios';

let dictUtil = {

};

// 获取常用的数据字典保存至vuex
dictUtil.initDictData = function (vm) {
    // axios.get(getDictData + "sex").then(res => {
    //     if(res.success){
    //         vm.$store.commit("setSex", res.result);
    //     }
    // });
    // axios.get(getDictData + "message_type").then(res => {
    //     if(res.success){
    //         vm.$store.commit("setMessageType", res.result);
    //     }
    // });
    // axios.get(getDictData + "priority").then(res => {
    //     if(res.success){
    //         vm.$store.commit("setPriority", res.result);
    //     }
    // });
    // axios.get(getDictData + "leave_type").then(res => {
    //     if(res.success){
    //         vm.$store.commit("setLeaveType", res.result);
    //     }
    // });

    postAxios('sws_get_dict_data',{
        type: 'sex'
    }).then(res => {
        if(res.success){
            vm.$store.commit("setSex", res.result);
        }
    });
    postAxios('sws_get_dict_data',{
        type: 'message_type'
    }).then(res => {
        if(res.success){
            vm.$store.commit("setMessageType", res.result);
        }
    });
    postAxios('sws_get_dict_data',{
        type: 'priority'
    }).then(res => {
        if(res.success){
            vm.$store.commit("setPriority", res.result);
        }
    });
    postAxios('sws_get_dict_data',{
        type: 'leave_type'
    }).then(res => {
        if(res.success){
            vm.$store.commit("setLeaveType", res.result);
        }
    });
};

export default dictUtil;
