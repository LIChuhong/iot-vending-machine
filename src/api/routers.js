import axios from '@/libs/api.request'

export const getRouterReq = (access) => {
  return axios.request({
    url: 'get_router',
    params: {
      access
    },
    method: 'get'
  })
}

export const getMenuList = () => {
  return axios.request({
    url: '/api2.0/getMenuList',
    method: 'get'
  })
}

