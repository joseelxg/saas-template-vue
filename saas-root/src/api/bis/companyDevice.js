import request from '@/utils/request'

// 查询公司设备列表
export function listCompanyDevice(query) {
  return request({
    url: '/bis/companyDevice/list',
    method: 'get',
    params: query
  })
}

// 查询公司设备详细
export function getCompanyDevice(id) {
  return request({
    url: '/bis/companyDevice/' + id,
    method: 'get'
  })
}

// 新增公司设备
export function addCompanyDevice(data) {
  return request({
    url: '/bis/companyDevice',
    method: 'post',
    data: data
  })
}

// 修改公司设备
export function updateCompanyDevice(data) {
  return request({
    url: '/bis/companyDevice',
    method: 'put',
    data: data
  })
}

// 删除公司设备
export function delCompanyDevice(id) {
  return request({
    url: '/bis/companyDevice/' + id,
    method: 'delete'
  })
}
