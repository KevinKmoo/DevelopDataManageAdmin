import request from '@/utils/request'

export function getAllProject(){
    return request({
        url: "project/list",
        method: "post",
    })
}

export function getList(params) {
    return request({
      url: 'project/list',
      method: 'post',
      params
    })
  }