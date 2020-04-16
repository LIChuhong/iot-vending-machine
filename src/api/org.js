import axios from '@/libs/api.request'


//添加合作
export const addVMOrg = (vmOrg) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/api2.0/addVMOrg',
		data:vmOrg,
  	method: 'post'
  })
}

//3.更新合作信息
export const updateVMOrg = (vmOrg) => {
	//console.log(vmOrg)
  return axios.request({
  	url: '/api2.0/updateVMOrg',
		data:vmOrg,
  	method: 'post'
  })
}

//获取合作信息
export const getVMOrg = (id) => {
	return axios.request({
		url: '/api2.0/getVMOrg',
		params: {
			'id':id
		},
		method: 'get'
	})
}

//获取合作列表
export const getVMOrgList = (orgName,maxId,pageSize) => {
	return axios.request({
		url: '/api2.0/getVMOrgList',
		params:{
			'orgName':orgName,
			'maxId':maxId,
			'pageSize':pageSize
		},
		method: 'get'
	})
}

//获取子合作列表
export const getOrgChildrenList = () => {
	return axios.request({
		url: '/api2.0/getOrgChildrenList',
		method: 'get'
	})
}

//获取子合作代理
export const getVMOrgChildrenList = (orgTypeId) => {
	return axios.request({
		url: '/api2.0/getVMOrgChildrenList',
		params: {
			'orgTypeId':orgTypeId
		},
		method: 'get'
	})
}

//获取合作类型列表
export const getAllOrgTypeList = () => {
	return axios.request({
		url: '/api2.0/getAllOrgTypeList',
		method: 'get'
	})
}

//启禁用组织
export const isEnableVMOrg = (id,isEnable) => {
	//console.log(vmOrg)
	const data = new URLSearchParams()
	data.append('id', id)
	data.append('isEnable', isEnable)
  return axios.request({
  	url: '/api2.0/isEnableVMOrg',
		data,
  	method: 'post'
  })
}

