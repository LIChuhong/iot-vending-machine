import axios from '@/libs/api.request'
//添加商品
export const addCommodity = (commodity) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/api2.0/addCommodity',
		data: commodity,
		method: 'post'
	})
}

//更新商品
export const updateCommodity = (commodity) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/api2.0/updateCommodity',
		data: commodity,
		method: 'post'
	})
}

//获取商品信息
export const getCommodity = (id) => {
	return axios.request({
		url: '/api2.0/getCommodity',
		params: {
			'id': id
		},
		method: 'get'
	})
}

//获取商品列表
export const getCommodityList = (commodityName,maxId,pageSize) => {
	return axios.request({
		url: '/api2.0/getCommodityList',
		params: {
			'commodityName': commodityName,
			'maxId': maxId,
			'pageSize': pageSize
		},
		method: 'get'
	})
}

//添加商品类型
export const addCommodityType = (commodityType) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/api2.0/addCommodityType',
		data: commodityType,
		method: 'post'
	})
}

//更新商品类型
export const updateCommodityType = (commodityType) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/api2.0/updateCommodityType',
		data: commodityType,
		method: 'post'
	})
}

//获取商品类型列表
export const getCommodityTypeList = () => {
	return axios.request({
		url: '/api2.0/getCommodityTypeList',
		method: 'get'
	})
}

