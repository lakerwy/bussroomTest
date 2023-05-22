import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下

export const indexRouter = {
    path: '/index',
    name: 'index',
    meta: {
        title: '登录 - 我的商务室 '
    },
    component: () => import('@/views/index.vue')
};


export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/index',
    component: Main,
    children: [
        { path: 'homepage', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/homepage/index.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'change-pass', title: '密码管理', name: 'change_pass', component: () => import('@/views/change-pass/change-pass.vue') },
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/my-message/message.vue') },
        { path: '/homepage', title: '首页', name: 'homepage', component: () => import('@/views/homepage/index.vue') },

        { path: '/mySubscript/addSub', title: '新建订阅', name: 'addSub', component: () => import('@/views/mySubscript/subscripManage/addSub.vue') },
        { path: '/mySubscript/editSub', title: '修改订阅', name: 'editSub', component: () => import('@/views/mySubscript/subscripManage/editSub.vue') },
        // { path: '/myAttention/myBidding', title: '我的中标', name: 'myBidding', component: () => import('@/views/myAttention/myBidding/index.vue') },
        // { path: '/myAttention/findProject', title: '找商机项目', name: 'findProject', component: () => import('@/views/myAttention/myBrowse/index.vue') },
        // { path: '/myAttention/myBrowse', title: '历史浏览记录', name: 'myBrowse', component: () => import('@/views/myAttention/myBrowse/historyBrowse.vue') },
        // { path: '/myAttention/myProject', title: '我的项目', name: 'myProject', component: () => import('@/views/myAttention/myProject/index.vue') },
        // { path: '/myAttention/myExport', title: '我的导出', name: 'myExport', component: () => import('@/views/myAttention/myExport/index.vue') },
        // { path: '/myAttention/myCollection', title: '我的收藏', name: 'myCollection', component: () => import('@/views/myAttention/myCollection/index.vue') },
        // { path: '/myAttention/myShare', title: '我的分享', name: 'myShare', component: () => import('@/views/myAttention/myShare/index.vue') },

        { path: '/sys/user-manage', title: '角色权限管理', name: 'user-manage', component: () => import('@/views/sys/user-manage/userManage.vue') },

        // { path: '/supplier/platform', title: '供应商工作台-供应商工作台', name: 'platform',  component: () => import('@/views/supplier/platform/index.vue')},
        // { path: '/supplier/myclue', title: '供应商工作台-我的线索', name: 'myclue',  component: () => import('@/views/supplier/myclue/index.vue')},
        // { path: '/supplier/myenter', title: '供应商工作台-我的报名', name: 'myenter',  component: () => import('@/views/supplier/myenter/index.vue')},
        // { path: '/supplier/myinterest', title: '供应商工作台-我的关注', name: 'myinterest',  component: () => import('@/views/supplier/myinterest/index.vue')},
        // { path: '/supplier/recclue', title: '供应商工作台-线索推荐', name: 'recclue',  component: () => import('@/views/supplier/recclue/index.vue')},
        { path: 'myApplication/markDetail', title: '数据超市详情', name: 'markDetail',  component: () => import('@/views/myApplication/dateMark/components/markDetail.vue')},
        { path: 'myApplication/creditTest', title: '数据超市详情', name: 'test',  component: () => import('@/views/myApplication/creditRating/test.vue')},
    ]
};

export const appRouter = [];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    // secondInfo,
    indexRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
];
