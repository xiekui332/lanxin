import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/index',
    redirect: '/recentList',
    name: 'index',
    component: () => import(/* webpackChunkName: */ '../views/Index.vue'),
    meta:{
      title: '近期的事'
    },
    children:[
      {
        path: '/recentList',
        name: 'recent',
        component: () => import(/* webpackChunkName: */ '../views/Recent/RecentList.vue'),
        meta:{
          title: '近期的事'
        }
      },
      {
        path: '/myProjectList',
        name: 'myProject',
        component: () => import(/* webpackChunkName: */ '../views/MyProject/MyProjectList.vue'),
        meta:{
          title: '我的项目'
        }
      },
      {
        path: '/personalInfo',
        name: 'personal',
        component: () => import(/* webpackChunkName: */ '../views/Personal/PersonalInfo.vue'),
        meta:{
          title: '个人中心'
        }
      }
    ]
  },
  {
    path:'/projectDetail',
    name:'projectDetail',
    component: () => import('../views/MyProject/ProjectDetails.vue'),
    meta:{
      title:'项目详情'
    }
  },
  {
    path:'/board',
    name:'board',
    component: () => import('../views/MyProject/Board.vue'),
    meta:{
      title:'看板'
    }
  },
  {
    path:'/taskDetail',
    name:'taskDetail',
    component: () => import('../views/MyProject/TaskDetails.vue'),
    meta:{
      title:'任务详情'
    }
  },
  {
    path:'/childTaskDetail',
    name:'childTaskDetail',
    component: () => import('../views/MyProject/TaskDetails.vue'),
    meta:{
      title:'子任务详情'
    }
  },
  {
    path:'/tagDetail',
    name:'tagDetail',
    component: () => import('../views/MyProject/TagDetails.vue'),
    meta:{
      title:'标签详情'
    }
  },
  {
    path:'/playerDetail',
    name:'playerDetail',
    component: () => import('../views/MyProject/PlayerDetails.vue'),
    meta:{
      title:'参与人详情'
    }
  },
  {
    path:'/chargeDetail',
    name:'chargeDetail',
    component: () => import('../views/MyProject/ChargeDetails.vue'),
    meta:{
      title:'负责人详情'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
