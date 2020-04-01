<template>
	<div>
		<div style="padding:0.625rem;">
			<Row style="padding:0 0 0.625rem ;">
				<Col span="12" style="padding-right: 0.3125rem">
				<DatePicker v-model="startTimeStr" type="datetime" placeholder="请选择起始时间"></DatePicker>
				</Col>
				<Col span="12" style="padding-left: 0.3125rem">
				<DatePicker v-model="endTimeStr" type="datetime" placeholder="请选择截止时间"></DatePicker>
				</Col>
			</Row>
			<Row>
				<Col span="16" style="padding-left: 0.625rem;">
				<span>机器编号:</span>
				<Input style="width: 70%;" v-model="rtuNumber" type="number" placeholder="请输入机器编号" />
				</Col>

				<Col span="8" style="text-align: right;">
				<Button @click="getCargoSellList" type="primary">查询</Button>
				</Col>
			</Row>
		</div>
		<Table :loading="tableLoading" border :columns="mSalesColumns" :data="mSalesData" size="small" class="mSalesStyle">
			<template slot-scope="{ row, index }" slot="totalProfits">
				{{row.totalAmount-row.totalCostAmount}}
			</template>
		</Table>

	</div>
</template>

<script>
	import {
		mSalesColumns
	} from '@/data/columns1'
	import {
		getCargoSellDatasList
	} from '@/api/order'
	import {
		getNowFormatDateTime
	} from '@/libs/tools'
	export default {
		name: 'm_sales_subsidiary',
		data() {
			return {
				tableLoading: false,
				mSalesColumns: mSalesColumns,
				mSalesData: [],
				rtuNumber: '',
				startTimeStr: new Date(new Date().toLocaleDateString()),
				endTimeStr: new Date()
			}
		},
		methods: {
			getCargoSellList() {
				if (this.rtuNumber == null || this.rtuNumber == '') {
					this.$Message.warning('机器编号不能为空')
				} else {
					if (this.startTimeStr == '') {
						this.$Message.warning('起始时间不能为空')
						return
					}
					if (this.endTimeStr == '') {
						this.$Message.warning('结束时间不能为空')
						return
					}
					const rtuNumber = parseInt(this.rtuNumber)
					const startTimeStr = getNowFormatDateTime(this.startTimeStr, '-')
					const endTimeStr = getNowFormatDateTime(this.endTimeStr, '-')
					this.tableLoading = true
					getCargoSellDatasList(rtuNumber, startTimeStr, endTimeStr).then(res => {
						const data = res.data
						this.tableLoading = false
						if (data.success == 1) {
							//console.log(data)
							this.mSalesData = data.cargoSellDatasList
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						this.tableLoading = false
						alert(error)
					})
				}
			}
		}
	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.mSalesStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
	}
</style>
