import axios from '@/libs/api.request'

//添加广告
export const addAdvertisement = (advertisement) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/api2.0/addAdvertisement',
		data:advertisement,
  	method: 'post'
  })
}

//更新广告
export const updateAdvertisement = (advertisement) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/api2.0/updateAdvertisement',
		data:advertisement,
  	method: 'post'
  })
}

//获取广告信息
export const getAdvertisement = (id) => {
	return axios.request({
		url: '/api2.0/getAdvertisement',
		params: {
			'id':id
		},
		method: 'get'
	})
}

//获取广告列表
export const getAdvertisementList = (adName,maxId,pageSize) => {
	return axios.request({
		url: '/api2.0/getAdvertisementList',
		params:{
			'adName':adName,
			'maxId':maxId,
			'pageSize':pageSize
		},
		method: 'get'
	})
}