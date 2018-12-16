import request from '@/utils/request'

/**
 * 获取所有的版本
 */
export function getAllVersion(){
    return request({
        url: "version/list",
        method: "post",
    })
}

/**
 * 通过项目id查找版本列表
 * @param {*} projectId 
 */
export function getVersionList(projectId){
    return request({
        url: "version/getListByProjectId",
        method: "post",
        data: {
            projectId: projectId
        }
    })
}

/**
 * 更新版本信息
 * @param {*} id 
 * @param {*} name 
 * @param {*} description 
 */
export function updateVersion(id , name , description){
    return request({
        url: "version/update",
        method: "post",
        data: {
            id : id,
            name : name,
            description : description
        }
    })
}

/**
 * 创建版本信息
 * @param {*} name 
 * @param {*} description 
 * @param {*} publishTime 
 */
export function createVersion(name, description, projectId, publishTime){
    return request({
        url: "version/create",
        method: "post",
        data: {
            name: name,
            description: description,
            projectId: projectId,
            publishTime: publishTime
        }
    })
}