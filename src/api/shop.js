import axios from '@/libs/api.request'

//添加商店类型
export const addShopType = (shopType) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/api2.0/addShopType',
		data: shopType,
		method: 'post'
	})
}

//获取商店类型
export const getShopType = (id) => {
	return axios.request({
		url: '/api2.0/getShopType',
		params: {
			'id': id
		},
		method: 'get'
	})
}

//更新商店类型
export const updateShopType = (shopType) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/api2.0/updateShopType',
		data:shopType,
  	method: 'post'
  })
}

//获取商店类型列表
export const getShopTypeList = (shopTypeName, maxId, pageSize) => {
	return axios.request({
		url: '/api2.0/getShopTypeList',
		params: {
			'shopTypeName': shopTypeName,
			'maxId': maxId,
			'pageSize': pageSize
		},
		method: 'get'
	})
}

//获取组织商店类型列表
export const getVMOrgShopTypeList = (belongOrgId) => {
	return axios.request({
		url: '/api2.0/getVMOrgShopTypeList',
		params: {
			'orgId': belongOrgId,
			
		},
		method: 'get'
	})
}

