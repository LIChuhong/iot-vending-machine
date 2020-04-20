import axios from '@/libs/api.request'

//订单列表
export const getOrderList = (rtuNumber,orderIdKey,cargoNo,day,buyState,pageNo,pageSize) => {
  return axios.request({
    url: '/api2.0/getOrderList',
	params:{
		'rtuNumber':rtuNumber,
		'orderIdKey':orderIdKey,
		'cargoNo':cargoNo,
		'day':day,
		'buyState':buyState,
		'pageNo':pageNo,
		'pageSize':pageSize,
		
	},
    method: 'get'
  })
}

//组织时段内每日收益
export const getVMOrgDayIncomeList = (startDay,endDay) => {
  return axios.request({
    url: '/api2.0/getVMOrgDayIncomeList',
	params:{
		'startDay':startDay,
		'endDay':endDay,
	},
    method: 'get'
  })
}

//组织机器每日收益明细
export const getVMOrgRtuDayIncomeList = (day,pageNo,pageSize) => {
  return axios.request({
    url: '/api2.0/getVMOrgRtuDayIncomeList',
	params:{
		'day':day,
		'pageNo':pageNo,
		'pageSize':pageSize,
	},
    method: 'get'
  })
}

//机器时段每日收益
export const getVMRtuDayIncomeSummaryList = (startDay,endDay,rtuNumber) => {
  return axios.request({
    url: '/api2.0/getVMRtuDayIncomeSummaryList',
	params:{
		'startDay':startDay,
		'endDay':endDay,
		'rtuNumber':rtuNumber,
	},
    method: 'get'
  })
}



//退款
export const refund = (orderId,refundTotalAmount) => {
	const data = new URLSearchParams()
	data.append('orderId', orderId)
	data.append('refundTotalAmount', refundTotalAmount)
  return axios.request({
    url: '/api2.0/refund',
		data,
    method: 'post'
  })
}

//纠正统计
export const updateVMRtuDayTotalData = (rtuNumber,day) => {
	const data = new URLSearchParams()
	data.append('rtuNumber', rtuNumber)
	data.append('day', day)
  return axios.request({
    url: '/api2.0/updateVMRtuDayTotalData',
		data,
    method: 'post'
  })
}

//机器销售明细
export const getCargoSellDatasList = (rtuNumber,startTimeStr,endTimeStr) => {
  return axios.request({
    url: '/api2.0/getCargoSellDatasList',
	params:{
		'rtuNumber':rtuNumber,
		'startTimeStr':startTimeStr,
		'endTimeStr':endTimeStr,
	},
    method: 'get'
  })
}

//机器出货明细
export const getVMRtuDayOutCommodityRecordList = (rtuNumber,cargoNo,startTimeStr,endTimeStr) => {
  return axios.request({
    url: '/api2.0/getVMRtuDayOutCommodityRecordList',
  	params:{
  		'rtuNumber': rtuNumber,
			'cargoNo': cargoNo,
			'startTimeStr': startTimeStr,
			'endTimeStr': endTimeStr,
  	},
  	method: 'get'
  })
}



