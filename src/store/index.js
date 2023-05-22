import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import dict from './modules/dict';
import {getStore} from '@/libs/storage.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 团队用户列表
        teamUserName: [],
        showFreeMerber: false,
    },
    getters: {
        // 除自己外团队用户列表
        teamUserOther: state => {
            let temp = [];
            if (!state.teamUserName.length) return []
            state.teamUserName.forEach(item=>{
                if (item.id != JSON.parse(getStore("userInfo")).id){
                    temp.push({
                        id: item.id,
                        label: item.nickName
                    })
                }
            })
            return temp
        }
    },
    mutations: {
        // 改变方法
        setTeamUserName(state,value){
            state.teamUserName = value;
        },
        setShowFreeMerber(state, value){
            state.showFreeMerber = value;
        }
    },
    actions: {

    },
    modules: {
        app,
        user,
        dict
    }
});

export default store;
