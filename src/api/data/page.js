import request from "@/utils/request"

/**
 * 获取页面列表
 * @param {*} projectId 
 * @param {*} versionId 
 * @param {*} moduleId 
 */
export function getPageList(projectId,moduleId,versionId){
  return request({
    url: 'page/list',
    method: 'post',
    data: {
      'projectId': projectId,
      'versionId': versionId,
      'moduleId': moduleId
    }
  })
}

/**
 * 创建页面
 * @param {*} name 
 * @param {*} desc 
 * @param {*} key 
 * @param {*} versionId 
 * @param {*} moduleId 
 */
export function createPage(name , desc , key , moduleId , versionId){
    return request({
      url: 'page/create',
      method: 'post',
      data:{
        'name': name,
        'description': desc,
        'key': key,
        'versionId': versionId,
        'moduleId': moduleId
      }
    })
}