import request from '@/utils/request'

// 查询公司配置列表
export function listCompany(query) {
  return request({
    url: '/bis/company/list',
    method: 'get',
    params: query
  })
}

// 查询公司配置详细
export function getCompany(id) {
  return request({
    url: '/bis/company/' + id,
    method: 'get'
  })
}

// 新增公司配置
export function addCompany(data) {
  return request({
    url: '/bis/company',
    method: 'post',
    data: data
  })
}

// 修改公司配置
export function updateCompany(data) {
  return request({
    url: '/bis/company',
    method: 'put',
    data: data
  })
}

// 删除公司配置
export function delCompany(id) {
  return request({
    url: '/bis/company/' + id,
    method: 'delete'
  })
}
