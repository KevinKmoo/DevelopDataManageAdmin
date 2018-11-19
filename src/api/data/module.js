import request from '@/utils/request'

/**
 * 通过项目id查找模块
 * @param {*} projectId 
 */
export function getModuleList(projectId){
    return request({
        url: "module/list",
        method: "post",
        data:{
            projectId:projectId
        }
    })
}

/**
 * 创建模块
 * @param {*} name 
 * @param {*} description 
 * @param {*} projectId 
 * @param {*} versionId 
 */
export function createModule(name , description, projectId , versionId){
    return request({
        url: "module/create",
        method: "post",
        data:{
            name: name,
            description: description,
            projectId: projectId,
            versionId: versionId
        }
    })
}

/**
 * 更新模块
 * @param {*} id 
 * @param {*} name 
 * @param {*} description 
 */
export function updateModule(id , name , description){
    return request({
        url: "module/update",
        method: "post",
        data: {
            id: id,
            name: name,
            description: description
        }
    })
}
