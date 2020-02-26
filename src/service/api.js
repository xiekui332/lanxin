
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
// 查询任务是否可以修改
export const searchProDetail = cab => get('/tasks/getTaskPid' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 修改任务状态完成
export const changeDone = cab => get('/tasks/getTaskContent' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 我的项目（含项目搜索）
export const getMyProject = cab => get('/projects/getProjectListUser' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 用户所属的企业
export const getMyEid = cab => get('/enterprise/getEnterpriseByUid' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 项目详情
export const getProjectDetail = cab => get('/projects/getUserByPid' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 文档（所有的/我创建的）
export const getFiles = cab => get('/myModel/getMyFile' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 查询当前用户在企业下的角色
export const getEidRole = cab => get('/enterprisePermission/queryEnterprisePermission' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 项目看板
export const getBoardList = cab => get('/task/findTaskByGroupId' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 查询任务分组id
export const getTaskGroupId = cab => get('/tasks/findGroupTask' + ';JSESSIONID=' + getSession('sessionId'), cab)
// 查询任务分组id
export const getUserRole = cab => get('/projectPermission/queryProjectPermission' + ';JSESSIONID=' + getSession('sessionId'), cab)