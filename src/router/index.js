import Vue from 'vue'

import login from '@/views/login'
import wode from '@/views/wode'

import kehu from '@/views/kehu'
import kehu_pinglun from '@/views/kehu_pinglun'

import zongjingli_home from '@/views/zongjingli/home'
import zongjingli_mendian from '@/views/zongjingli/mendian'
import zongjingban_mendian from '@/views/zongjingli/zongjingban_mendian'

import dianzhang_home from '@/views/dianzhang/home'
import dianzhang_home_view from '@/views/dianzhang/home_view'
import dianzhang_kehu from '@/views/dianzhang/kehu'
import dianzhang_sheji from '@/views/dianzhang/shejibu'
import dianzhang_shichang from '@/views/dianzhang/shichang'
import dianzhang_sheji_view from '@/views/dianzhang/shejibu_view'
import dianzhang_shichang_view from '@/views/dianzhang/shichang_view'

import yewuyuan_shejishi_home from '@/views/yewuyuan_shejishi/home'
import yewuyuan_shejishi_home_view from '@/views/yewuyuan_shejishi/home_view'

import shichangbujingli_home from '@/views/shichangbujingli/home'
import shichangbujingli_home_view from '@/views/shichangbujingli/home_view'
import shichangbujingli_yewuyuan from '@/views/shichangbujingli/yewuyuan'

export default [
    {
        path: '/', 
        redirect: '/login' 
    },
	{
        path: '/login',
        name: 'login',
        component: login
    },{
        path: '/wode',
        name: 'wode',
        component: wode
    },{
        path: '/dianzhang_home_view',
        name: 'dianzhang_home_view',
        component: dianzhang_home_view
    },{
        path: '/yewuyuan_shejishi_home_view',
        name: 'yewuyuan_shejishi_home_view',
        component: yewuyuan_shejishi_home_view
    },{
        path: '/shichangbujingli_home_view',
        name: 'shichangbujingli_home_view',
        component: shichangbujingli_home_view
    },{
        path: '/zongjingli_home',
        name: 'zongjingli_home',
        component: zongjingli_home
    },{
        path: '/zongjingli_mendian',
        name: 'zongjingli_mendian',
        component: zongjingli_mendian
    },{
        path: '/zongjingban_mendian',
        name: 'zongjingban_mendian',
        component: zongjingban_mendian
    },{
        path: '/dianzhang_home',
        name: 'dianzhang_home',
        component: dianzhang_home
    },{
        path: '/dianzhang_sheji',
        name: 'dianzhang_sheji',
        component: dianzhang_sheji
    },{
        path: '/dianzhang_shichang',
        name: 'dianzhang_shichang',
        component: dianzhang_shichang
    },{
        path: '/dianzhang_sheji_view',
        name: 'dianzhang_sheji_view',
        component: dianzhang_sheji_view
    },{
        path: '/dianzhang_shichang_view',
        name: 'dianzhang_shichang_view',
        component: dianzhang_shichang_view
    },{
        path: '/yewuyuan_shejishi_home',
        name: 'yewuyuan_shejishi_home',
        component: yewuyuan_shejishi_home
    },{
        path: '/kehu',
        name: 'kehu',
        component: kehu
    },{
        path: '/kehu_pinglun',
        name: 'kehu_pinglun',
        component: kehu_pinglun
    },{
        path: '/shichangbujingli_home',
        name: 'shichangbujingli_home',
        component: shichangbujingli_home
    },{
        path: '/shichangbujingli_yewuyuan',
        name: 'shichangbujingli_yewuyuan',
        component: shichangbujingli_yewuyuan
    },{
        path: '/dianzhang_kehu',
        name: 'dianzhang_kehu',
        component: dianzhang_kehu
    },
]



