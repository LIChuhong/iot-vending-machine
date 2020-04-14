<!-- 手机端收益组件 -->
<template>
	<div class="mOrderEarningsStyle">
		<div style="padding:0.625rem;">
			<Row>
				<Col span="12" style="padding-right: 0.625rem;">
				<span>起始:</span>
				<DatePicker :editable="false" v-model="startDay" type="date" placeholder="选择起始日期" style="width: 75%"></DatePicker>
				</Col>
				<Col span="12">
				<span>截止:</span>
				<DatePicker :editable="false" v-model="endDay" type="date" placeholder="选择截止日期" style="width: 75%"></DatePicker>
				</Col>
			</Row>
			<Row style="padding:0.625rem 0 0;">
				<Col span="10">
				<span>订单总金额:</span>
				<span style="color: #9ed900;">${{totalAmount}}</span>
				</Col>
				<Col span="10">
				<span>订单总笔数:</span>
				<span style="color: #fa8c35;">{{totalCount}}</span>
				</Col>
				<Col span="4" style="text-align: right;">
				<Button type="primary" @click="getEarningsList">查找</Button>
				</Col>
			</Row>
		</div>
		<div>
			<Table :loading="tableLoading" border :columns="earningsColumns" :data="earningsList" size="small" show-summary
			 sum-text="合计">
			</Table>
			<div style="overflow: hidden;padding:0.625rem 0.625rem;">
				<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
				<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>

			</div>

		</div>
	</div>
</template>

<script>
	import {
		earningsColumns
	} from '@/data/columns'
	import {
		DateDiffDay,
		getNowFormatDate
	} from '@/libs/tools'
	import {
		getVMOrgDayIncomeList
	} from '@/api/order'
	export default {
		data() {
			return {
				tableLoading: false,
				startDay: '', //起始日期
				endDay: '', //结束日期
				earningsColumns: earningsColumns,
				earningsList: [], //收益列表数据
				VMOrgDayIncomeList: [], //收益列表总数据
				pageNo: 0,
				pageSize: 6,
				totalCount: 0, //总订单数
				totalAmount: 0, //总收入
			}
		},
		methods: {
			setEarningsList() { //获取分页列表数据
				
				this.earningsList = this.VMOrgDayIncomeList.slice(this.pageNo * this.pageSize, (this.pageNo + 1) * this.pageSize)
			},
			nextPage() {
				if (this.earningsList.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					this.pageNo++
					this.setEarningsList()
				}

			},
			prevPage() {
				if (this.pageNo > 0) {
					this.pageNo--
					this.setEarningsList()
				} else {
					this.$Message.warning('这是第一页');
				}

			},
			getEarningsList() { //获取收益列表总数据
				var startDay1 = getNowFormatDate(this.startDay, '-')
				var endDay1 = getNowFormatDate(this.endDay, '-')
				var startDay = getNowFormatDate(this.startDay, '')
				var endDay = getNowFormatDate(this.endDay, '')
				var num = DateDiffDay(startDay1, endDay1)
				//console.log(num)
				if (num <= 31) {
					this.pageNo = 0
					this.totalAmount = 0
					this.totalCount = 0
					this.tableLoading = true
					getVMOrgDayIncomeList(startDay, endDay).then(res => {
						const data = res.data
						this.tableLoading = false
						if (data.success == 1) {
							if (data.VMOrgDayIncomeList != null && data.VMOrgDayIncomeList != undefined) {
								this.VMOrgDayIncomeList = data.VMOrgDayIncomeList.map(item => {
									this.totalAmount += item.totalAmount
									this.totalCount += item.totalCount
									item.profits = item.totalAmount - item.totalCostAmount
									return item
								})
								//this.VMOrgDayIncomeList
								this.setEarningsList()
							}
						} else {
							this.$Message.error(data.errorMessage)
						}

					}).catch(error => {
						this.tableLoading = false
						alert(error)
					})

				} else {
					this.$Message.warning('查询时间跨度最长31天')
				}
			}
		},

	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {

		.mOrderEarningsStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
	}
</style>
