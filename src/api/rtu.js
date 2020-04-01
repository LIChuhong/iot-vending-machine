import axios from '@/libs/api.request'

//添加机器
export const addVMRtu = (vmRtu) => {
  return axios.request({
    url: '/api2.0/addVMRtu',
		data:vmRtu,
    method: 'post'
  })
}

//复制机器
export const copyVMRtu = (rtuNumber,copyCount) => {
	const data = new URLSearchParams()
	data.append('rtuNumber', rtuNumber)
	data.append('copyCount', copyCount)
  return axios.request({
    url: '/api2.0/copyVMRtu',
		data,
    method: 'post'
  })
}

//获取机器信息
export const getVMRtu = (rtuNumber) => {
  return axios.request({
    url: '/api2.0/getVMRtu',
		params:{
			'rtuNumber': rtuNumber
		},
    method: 'get'
  })
}

//更新机器
export const updateVMRtu = (vmRtu) => {
  return axios.request({
    url: '/api2.0/updateVMRtu',
		data:vmRtu,
    method: 'post'
  })
}

//获取机器列表
export const getVMRtuList = (keyField,searchKey,maxId,pageSize) => {
  return axios.request({
    url: '/api2.0/getVMRtuList',
		params:{
			'keyField': keyField,
			'searchKey': searchKey,
			'maxId': maxId,
			'pageSize': pageSize
		},
    method: 'get'
  })
}

//查询机器实时数据
export const getVMRtuData = (rtuNumber) => {
  return axios.request({
    url: '/api2.0/getVMRtuData',
		params:{
			'rtuNumber': rtuNumber
		},
		method: 'get'
  })
}

//出货
export const setVMRtuData = (rtuData) => {
  return axios.request({
    url: '/api2.0/setVMRtuData',
		data:rtuData,
    method: 'post'
  })
}

//获取机器调试信息
export const debugVMRtu = (rtuNumber) => {
  return axios.request({
    url: '/api2.0/debugVMRtu',
  	params:{
  		'rtuNumber': rtuNumber
  	},
  	method: 'get'
  })
}

//清除机器调试信息
export const clearVMRtuLogs = (rtuNumber) => {
	const data = new URLSearchParams()
	data.append('rtuNumber', rtuNumber)
  return axios.request({
    url: '/api2.0/clearVMRtuLogs',
		data,
    method: 'post'
  })
}

//更改货道或补货
export const updateCargosData = (cargosData) => {
  return axios.request({
    url: '/api2.0/updateCargosData',
		data:cargosData,
    method: 'post'
  })
}

//复制机器货道/获取机器货道
export const getCargosData = (rtuNumber) => {
  return axios.request({
    url: '/api2.0/getCargosData',
  	params:{
  		'rtuNumber': rtuNumber
  	},
  	method: 'get'
  })
}

//补货记录
export const stockHistoryDetailsList = (rtuNumber,startDate,endDate) => {
  return axios.request({
    url: '/api2.0/stockHistoryDetailsList',
  	params:{
  		'rtuNumber': rtuNumber,
			'startDate': startDate,
			'endDate': endDate
  	},
  	method: 'get'
  })
}

//更改机器分成
export const updateRtuProportions = (rtuProportions) => {
  return axios.request({
    url: '/api2.0/updateRtuProportions',
		data:rtuProportions,
    method: 'post'
  })
}

//获取分账列表
export const getProportionsList = (rtuNumber) => {
  return axios.request({
    url: '/api2.0/getProportionsList',
  	params:{
  		'rtuNumber': rtuNumber
  	},
  	method: 'get'
  })
}

//获取机器类型列表
export const getAllRtuTypeList = () => {
  return axios.request({
    url: '/api2.0/getAllRtuTypeList',
  	method: 'get'
  })
}

//禁用机器
export const closeShop = (rtuNumber,enable) => {
	//console.log(vmOrg)
	const data = new URLSearchParams()
	data.append('rtuNumber', rtuNumber)
	data.append('enable', enable)
  return axios.request({
  	url: '/api2.0/closeShop',
		data,
  	method: 'post'
  })
}

//获取机器二维码
export const getVMRtuQRCode = (rtuNumber) => {
  return axios.request({
    url: '/api2.0/getVMRtuQRCode',
  	params:{
  		'rtuNumber': rtuNumber
  	},
  	method: 'get'
  })
}

