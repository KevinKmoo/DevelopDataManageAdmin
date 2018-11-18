import request from '@/utils/request'

export function getAllVersion(){
    return request({
        url: "version/list",
        method: "post",
    })
}

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

export function createVersion(name, description, publishTime){
    return request({
        url: "version/create",
        method: "post",
        data: {
            name: name,
            description: description,
            publishTime: publishTime
        }
    })
}