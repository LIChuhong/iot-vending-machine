import axios from '@/libs/api.request'

//添加支付
export const addJDPayinfo = (jdPayInfo) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/api2.0/addJDPayinfo',
		data: jdPayInfo,
		method: 'post'
	})
}

//获取支付信息
export const getJDPayInfo = (merchantNo) => {
	return axios.request({
		url: '/api2.0/getJDPayInfo',
		params: {
			'merchantNo': merchantNo
		},
		method: 'get'
	})
}

//更新支付信息
export const updateJDPayInfo = (jdPayInfo) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/api2.0/updateJDPayInfo',
		data: jdPayInfo,
		method: 'post'
	})
}

//获取支付列表
export const getJDPayInfoList = (payeeName, maxId, pageSize) => {
	return axios.request({
		url: '/api2.0/getJDPayInfoList',
		params: {
			'payeeName': payeeName,
			'maxId': maxId,
			'pageSize': pageSize
		},
		method: 'get'
	})
}

//统一下单预支付
export const prepayment = (prepaymentParameter) => {
	//console.log(vmOrg)
	return axios.request({
		url: '/api2.0/prepayment',
		data: prepaymentParameter,
		method: 'post'
	})
}

//退款
export const refund = (orderId,refundTotalAmount) => {
	//console.log(vmOrg)
	const data = new URLSearchParams()
	data.append('orderId', orderId)
	data.append('refundTotalAmount', parseFloat(refundTotalAmount))
	return axios.request({
		url: '/api2.0/refund',
		data,
		method: 'post'
	})
}
