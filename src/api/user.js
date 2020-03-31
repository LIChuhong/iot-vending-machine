import axios from '@/libs/api.request'

export const login = ({
	userName,
	password
}) => {
	// const data = {
	// 	userName,
	// 	password
	// }
	//alert(userName + password)
	const data = new URLSearchParams()
	data.append('userName', userName)
	data.append('password', password)
	return axios.request({
		url: '/api2.0/mLogin',
		data,
		method: 'post'
	})
}

export const getUserInfo = (token) => {
	return axios.request({
		url: '/api2.0/get_info',
		params: {
			token
		},
		method: 'get'
	})
}

export const logout = (token) => {
	return axios.request({
		url: 'logout',
		method: 'post'
	})
}
//获取用户角色列表
export const getUserRolesList = () => {
	return axios.request({
		url: '/api2.0/getUserRolesList',
		method: 'get'
	})
}

//添加用户
export const addVMUser = (vmUser) => {
	//console.log(vmUser)
	return axios.request({
		url: '/api2.0/addVMUser',
		data: vmUser,
		method: 'post'
	})
}

//更新用户信息
export const updateVMUser = (vmUser) => {
	//console.log(vmUser)
	return axios.request({
		url: '/api2.0/updateVMUser',
		data: vmUser,
		method: 'post'
	})
}

//获取用户信息
export const getVMUser = (vmUserId) => {
	//console.log(typeof(vmUserId))
	vmUserId = parseInt(vmUserId)
	return axios.request({
		url: '/api2.0/getVMUser',
		params: {
			'vmUserId': vmUserId
		},
		method: 'get'
	})
}

//获取用户列表
export const getVMUserList = (searchKey, maxId, pageSize) => {
	return axios.request({
		url: '/api2.0/getVMUserList',
		params: {
			'searchKey': searchKey,
			'maxId': maxId,
			'pageSize': pageSize
		},
		method: 'get'
	})
}

//重置用户密码
export const reSetPassword = (vmUserId, newPassword) => {
	//console.log(vmUser)
	const data = new URLSearchParams()
	data.append('vmUserId', vmUserId)
	data.append('newPassword', newPassword)
	return axios.request({
		url: '/api2.0/reSetPassword',
		data,
		method: 'post'
	})
}

//获取信息列表
export const getMessageList = (pageNo, pageSize) => {
	return axios.request({
		url: '/api2.0/getMessageList',
		params: {
			'pageNo': pageNo,
			'pageSize': pageSize
		},
		method: 'get'
	})
}

export const getMessage = () => {
	return axios.request({
		url: 'message/init',
		method: 'get'
	})
}

export const getContentByMsgId = msg_id => {
	return axios.request({
		url: 'message/content',
		method: 'get',
		params: {
			msg_id
		}
	})
}

//阅读信息
export const hasRead = id => {
	const data = new URLSearchParams()
	data.append('id', id)
	return axios.request({
		url: '/api2.0/enableMessage',
		method: 'post',
		data
	})
}
//删除信息
export const removeReaded = id => {
	const data = new URLSearchParams()
	data.append('id', id)
	return axios.request({
		url: '/api2.0/delMessage',
		method: 'post',
		data
	})
}

export const restoreTrash = msg_id => {
	return axios.request({
		url: 'message/restore',
		method: 'post',
		data: {
			msg_id
		}
	})
}
