<template>
	<div class="replenishmentStyle">
		<div class="flexStyle">
			<div>
				<span>起始时间:</span>
				<DatePicker :editable="false" v-model="startDate" type="datetime" placeholder="请选择起始时间"></DatePicker>
			</div>
			<div class="middleSpacing">
				<span>结束时间:</span>
				<DatePicker :editable="false" v-model="endDate" type="datetime" placeholder="请选择结束时间"></DatePicker>
			</div>
			<Row>
				<Col span="16">
				<span>机器编号:</span>
				<Input style="width: 70%;" v-model="rtuNumber" type="number" placeholder="请输入机器编号" />
				</Col>
			
				<Col span="8" style="text-align: right;">
				<Button @click="getReplenishmentList" type="primary">查找</Button>
				</Col>
			</Row>
		</div>
		<Table size="small" border :columns="replenishmentColumns" :data="replenishmentList">
			<template slot-scope="{ row, index }" slot="stock">
				<span>{{row.oldStock}}/{{row.newStock}}</span>
			</template>
			<template slot-scope="{ row, index }" slot="few">
				<span>{{row.newStock-row.oldStock}}</span>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		</div>
	</div>
</template>

<script>
	import {
		DateDiffDay,
		getNowFormatDateTime,
		CompareDate,
		timestampToTime
	} from '@/libs/tools'
	import {
		replenishmentColumns
	} from '@/data/columns'
	import {
		stockHistoryDetailsList
	} from '@/api/rtu'
	export default {
		name: 'replenishment_record',
		data() {
			return {
				startDate: '',
				endDate: '',
				rtuNumber: '',
				replenishmentColumns: replenishmentColumns,
				replenishmentList: [],
				stockHistoryDetailsList: [],
				pageNo: 0,
				pageSize: 7,

			}
		},
		methods: {
			nextPage() {
				if (this.replenishmentList.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					this.pageNo++
					this.setReplenishmentList()
				}

			},
			prevPage() {
				if (this.pageNo > 0) {
					this.pageNo--
					this.setReplenishmentList()
				} else {
					this.$Message.warning('这是第一页');
				}

			},
			setReplenishmentList() {
				this.replenishmentList = this.stockHistoryDetailsList.slice(this.pageNo * this.pageSize, (this.pageNo + 1) * this.pageSize)
			},
			getReplenishmentList() {
				if (this.rtuNumber != null && this.rtuNumber != '') {
					if (this.startDate == '') {
						this.$Message.warning('请选择起始时间')
						return
					}
					if (this.endDate == '') {
						this.$Message.warning('请选择结束时间')
						return
					}
					var startDate = getNowFormatDateTime(this.startDate, '-')
					var endDate = getNowFormatDateTime(this.endDate, '-')
					var num = DateDiffDay(startDate, endDate)
					var compareDate = CompareDate(endDate, startDate)
					if (num < 7 && compareDate) {
						this.pageNo = 0
						stockHistoryDetailsList(parseInt(this.rtuNumber), startDate, endDate).then(res => {
							const data = res.data
							//console.log(data)
							if (data.success == 1) {
								this.stockHistoryDetailsList = data.stockHistoryDetailsList.map(item => {
									item.addTime = timestampToTime(item.addTime)
									return item
								})
								this.setReplenishmentList()
							} else {
								this.$Message.error(data.errorMessage)
							}
						}).catch(error => {
							alert(error)
						})

					} else if (!compareDate) {
						this.$Message.warning('起始时间不能大于结束时间')
					} else {
						this.$Message.warning('时间间隔不能大于七天')
					}
				} else {
					this.$Message.warning('机器编号不能为空')
				}
			}
		},
	}
</script>

<style>
	@media screen and (min-width:900px) {
		.flexStyle {
			padding: 0.625rem;
			display:flex; 
			justify-content: space-between;
			display: -webkit-flex;
		}
		.flexStyle .middleSpacing{
			padding: 0;
		}
	}
	@media screen and (min-width:300px) and (max-width:900px) {
		.flexStyle {
			padding: 0.625rem;
		}
		.flexStyle .middleSpacing{
			padding: 0.625rem 0;
		}

		.replenishmentStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
	}
</style>
