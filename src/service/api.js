
import { get, post } from './http'
import { getSession } from '@/service/utils'

export const handleLogin = cab => post('/userInfo/login', cab)

// 近期的事
export const recentList = cab => get('/myModel/recentMove' + ';JSESSIONID=' + getSession('sessionId'), cab)
export const recentDoneList = cab => get('/myModel/myTaskMove' + ';JSESSIONID=' + getSession('sessionId'), cab)

// 登录用户的信息
export const getPersonalInfo = cab => get('/userInfo/getMyInfo' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 查看项目详情
export const getProDetail = cab => get('/tasks/getOneTask' + ';JSESSIONID=' + getSession('sessionId'), cab)