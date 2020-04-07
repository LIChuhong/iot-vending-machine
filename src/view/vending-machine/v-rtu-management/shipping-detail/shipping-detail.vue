<template>
	<div>
		<Form ref="shippingModel" :model="shippingModel" :rules="shippingRule" inline :label-width="100">
			<FormItem label="机器编号" prop="rtuNumber">
				<Input type="number" v-model="shippingModel.rtuNumber" placeholder="请输入机器编号">
				</Input>
			</FormItem>
			
			<FormItem label="起始" prop="startTimeStr">
				<DatePicker v-model="shippingModel.startTimeStr" type="datetime" placeholder="请选择起始时间"></DatePicker>
			</FormItem>
			<FormItem label="结束" prop="endTimeStr">
				<DatePicker v-model="shippingModel.endTimeStr" type="datetime" placeholder="请选择起始时间"></DatePicker>
			</FormItem>
			<FormItem label="货道" prop="cargoNo">
				<Input type="number" v-model="shippingModel.cargoNo" placeholder="请输入货道">
				</Input>
			</FormItem>
			
			<FormItem>
				<Button type="primary" @click="handleSubmit('shippingModel')">查找</Button>
			</FormItem>
		</Form>
		<Table size="small" border :columns="shippingColumns" :data="shippingList" max-height="500">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" style="margin-right: 5px" @click="getShippingDetail(row)">明细</Button>
			</template>
		</Table>
		<Modal v-model="showGoodsDetail" :title="modalTitle+'出货明细'" footer-hide width="60%">
			<detail :cargoOutCommodityOrderList ="cargoOutCommodityOrderList" ></detail>
		</Modal>

	</div>
</template>

<script>
	import {
		shippingColumns
	} from '@/data/columns'
	import {
		getVMRtuDayOutCommodityRecordList
	} from '@/api/order'
	import {
		getNowFormatDateTime,timestampToTime
	} from '@/libs/tools'
	import Detail from './detail.vue'
	
	export default {
		name: 'shipping_detail',
		components:{
			Detail
		},
		data() {
			return {
				modalTitle:'',
				showGoodsDetail: false,
				shippingModel: {
					rtuNumber: '',
					cargoNo: '',
					startTimeStr:new Date(new Date().toLocaleDateString()),
					endTimeStr: new Date()

				},
				shippingRule:{
					rtuNumber: [{
						required: true,
						//type:'number',
						message: '机器编号不能为空',
						trigger: 'blur'
					}],
					cargoNo: [{
						required: true,
						//type:'number',
						message: '货道不能为空',
						trigger: 'blur'
					}],
					startTimeStr: [{
						required: true,
						type: 'date',
						message: '请选择起始时间',
						trigger: 'change'
					}],
					endTimeStr: [{
						required: true,
						type: 'date',
						message: '请选择结束时间',
						trigger: 'change'
					}],
					},
				shippingColumns: shippingColumns,
				shippingList: [],
				cargoOutCommodityOrderList:[]

			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						const rtuNumber = parseInt(this.shippingModel.rtuNumber)
						const cargoNo = parseInt(this.shippingModel.cargoNo)
						const startTimeStr = getNowFormatDateTime(this.shippingModel.startTimeStr,'-')
						const endTimeStr = getNowFormatDateTime(this.shippingModel.endTimeStr,'-')
							getVMRtuDayOutCommodityRecordList(rtuNumber,cargoNo,startTimeStr,endTimeStr).then(res => {
								const data = res.data
								if (data.success == 1) {
									//this.$Message.success('添加成功')
									this.shippingList = data.cargoOutCommoditysDetailsList
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								alert(error)
							})
					
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			getShippingDetail(row) {
				this.modalTitle = this.shippingModel.rtuNumber+'机器'+ '-'+row.cargoNo + '货道'
				this.cargoOutCommodityOrderList = row.cargoOutCommodityOrderList.map(item=>{
					item.orderTime = timestampToTime(item.orderTime)
					if(item.outCommoditysFinishedTime != 0){
						item.outCommoditysFinishedTime = timestampToTime(item.outCommoditysFinishedTime)
					}
					return item
				})
				this.showGoodsDetail = true
			}
		},

	}
</script>

<style>
</style>
