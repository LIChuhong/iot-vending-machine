<!-- 手机端首页收益组件 -->
<template>
	<div style="height: 100%;padding-top: 0.625rem;">
		<Row style="text-align: center;border-bottom: 0.0625rem solid #515A6E;">
			<Col span="12" style="border-right: 0.0625rem solid #515A6E; ;">
			<div style="overflow: hidden;">
				<span style="font-size: 1.25rem;">昨天</span>
				<Button type="text" @click="showDetailModal('昨天',yd)" style="float: right;margin-right:10%;color: #2D8CF0;">{{detail}}</Button>
			</div>
			<Row>
				<Col span="8">
				<div>
					<p>订单数</p>
					<p style="color: #fa8c35;">{{ydTotalCount}}</p>
				</div>
				</Col>
				<Col span="8">
				<div>
					<p>收入</p>
					<p style="color: #9ed900;">{{ydTotalAmount.toFixed(2)}}</p>
				</div>
				</Col>
				<Col span="8">
				<div>
					<p>利润</p>
					<p style="color: #f00056;">{{ydProfits.toFixed(2)}}</p>
				</div>
				</Col>
			</Row>
			</Col>
			<Col span="12">
			<div style="overflow: hidden;">
				<span style="font-size: 1.25rem;">今天</span>
				<Button type="text" @click="showDetailModal('今天',td)" style="float: right;margin-right:10%;color: #2D8CF0;">{{detail}}</Button>
			</div>
			<Row>
				<Col span="8">
				<div>
					<p>订单数</p>
					<p style="color: #fa8c35;">{{tdTotalCount}}</p>
				</div>
				</Col>
				<Col span="8">
				<div>
					<p>收入</p>
					<p style="color: #9ed900;">{{tdTotalAmount.toFixed(2)}}</p>
				</div>
				</Col>
				<Col span="8">
				<div>
					<p>利润</p>
					<p style="color: #f00056;">{{tdProfits.toFixed(2)}}</p>
				</div>
				</Col>
			</Row>
			</Col>
		</Row>
		<div style="height: 65%;overflow: hidden;position: relative;">
			<div style="position: absolute;top:1.875rem;width: 100%;text-align: center;">
				<Row>
					<Col span="8">
					<div>
						<p>总订单数:<span style="color: #fa8c35;">{{totalCount}}</span></p>
					</div>
					</Col>
					<Col span="8">
					<div>
						<p>总收入:<span style="color: #9ed900;">{{totalAmount.toFixed(2)}}</span></p>
					</div>
					</Col>
					<Col span="8">
					<div>
						<p>总利润:<span style="color: #f00056;">{{totalProfits.toFixed(2)}}</span></p>
					</div>
					</Col>
				</Row>
			</div>
			<div ref="dom" style="height: 100%;"></div>
		</div>
		<!-- <Button type="primary" @click="modal1 = true">Display dialog box</Button> -->
		<Modal v-model="modalValue" fullscreen footer-hide :title="modalTitle" class="mEdetailModalStyle">
			<Table :loading="tableLoading" border :columns="mEdetailColumns" :data="mEdetailData" size="small">
				<template slot-scope="{ row, index }" slot="rtuNumber">
					<!-- {{row.vmRtuDayIncomeSummary.jdBillSplit.totalBillSplitAmount.toFixed(2)}} -->
					<Badge :status="row.rtuNetWorkState == 1 ? 'success':'error'" :text="row.rtuNumber" />
				</template>
				<template slot-scope="{ row, index }" slot="totalBillSplitAmount">
					{{row.vmRtuDayIncomeSummary.jdBillSplit.totalBillSplitAmount.toFixed(2)}}
				</template>
				<template slot-scope="{ row, index }" slot="totalCount">
					{{row.vmRtuDayIncomeSummary.totalCount}}
				</template>
				<template slot-scope="{ row, index }" slot="totalAmount">
					{{row.vmRtuDayIncomeSummary.totalAmount.toFixed(2)}}
				</template>
				<template slot-scope="{ row, index }" slot="totalCostAmount">
					{{row.vmRtuDayIncomeSummary.totalCostAmount.toFixed(2)}}
				</template>
				<template slot-scope="{ row, index }" slot="profits">
					{{(row.vmRtuDayIncomeSummary.totalAmount-row.vmRtuDayIncomeSummary.totalCostAmount).toFixed(2)}}
				</template>
			</Table>
			<div style="overflow: hidden;padding:0.625rem 0.625rem;">
				<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
				<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>

			</div>
		</Modal>
	</div>
</template>

<script>
	import {
		mEdetailColumns
	} from '@/data/columns.js'
	import echarts from 'echarts'
	import {
		getVMOrgDayIncomeList,
		getVMOrgRtuDayIncomeList
	} from '@/api/order'
	import {
		on,
		off,
		getLastMonthday,
		getNowFormatDate
	} from '@/libs/tools'
	export default {
		data() {
			return {
				tableLoading: false,
				modalValue: false,
				dom: null,
				ydTotalCount: 0, //昨天订单数
				ydTotalAmount: 0, //昨天收入
				ydTotalCostAmount: 0,
				tdTotalCount: 0, //今天订单数
				tdTotalAmount: 0, //今天收入
				tdTotalCostAmount: 0,
				totalCount: 0, //总订单数
				totalAmount: 0, //总收入
				totalCostAmount: 0, //总成本
				incomeList: [], //收益列表
				yd: '', //昨天
				td: '', //今天
				pageNo: 0, //页码
				pageSize: 10,
				detailDay: '', //查看详情日期
				detail: '明细',
				modalTitle: '',
				mEdetailColumns: mEdetailColumns,
				mEdetailData: [], //详情列表


			}

		},
		computed: {
			totalProfits() { //总利润
				return (this.totalAmount - this.totalCostAmount)
			},
			ydProfits() { //昨天利润
				return this.ydTotalAmount - this.ydTotalCostAmount
			},
			tdProfits() { //今天利润
				return this.tdTotalAmount - this.tdTotalCostAmount
			}
		},
		methods: {
			getDayIncomeList(startDay, endDay) { //获取近一个月收益列表数据
				this.totalCount = 0, //总订单数
					this.totalAmount = 0, //总收入
					this.totalCostAmount = 0, //总成本
					this.incomeList = []
				this.dom = echarts.init(this.$refs.dom)
				this.dom.showLoading({
					text: '',
					color: '#2d8cf0',
					maskColor: 'rgba(255, 255, 255, 0.5)',
				})
				getVMOrgDayIncomeList(startDay, endDay).then(res => {
					const data = res.data
					this.dom.hideLoading()
					if (data.success == 1) {
						if (data.VMOrgDayIncomeList != null && data.VMOrgDayIncomeList != undefined) {
							const VMOrgDayIncomeList = data.VMOrgDayIncomeList
							const len = VMOrgDayIncomeList.length
							this.ydTotalCount = VMOrgDayIncomeList[len - 2].totalCount
							this.ydTotalAmount = VMOrgDayIncomeList[len - 2].totalAmount
							this.ydTotalCostAmount = VMOrgDayIncomeList[len - 2].totalCostAmount
							this.yd = VMOrgDayIncomeList[len - 2].day
							this.td = VMOrgDayIncomeList[len - 1].day
							this.tdTotalCount = VMOrgDayIncomeList[len - 1].totalCount
							this.tdTotalAmount = VMOrgDayIncomeList[len - 1].totalAmount
							this.tdTotalCostAmount = VMOrgDayIncomeList[len - 1].totalCostAmount
							VMOrgDayIncomeList.map(item => {
								this.totalCount += item.totalCount
								this.totalAmount += item.totalAmount
								this.totalCostAmount += item.totalCostAmount
								this.incomeList.push({
									'day': item.day,
									'订单数': item.totalCount,
									'收入': item.totalAmount.toFixed(2),
									'利润': (item.totalAmount - item.totalCostAmount).toFixed(2)
								})
							})
							const option = {
								title: {
									text: '近一个月营收曲线图'
								},
								tooltip: {
									trigger: 'axis'
								},
								legend: {
									bottom: '3%'
								},
								dataset: {
									dimensions: ['day', '订单数', '收入', '利润'],
									source: this.incomeList
								},
								grid: {
									top: 80,
									left: '3%',
									right: '3%',
									bottom: '15%',
									containLabel: true
								},
								xAxis: {
									//nameRotate:45,
									type: 'category',
									boundaryGap: false,
									axisLabel: { //重点在这一块，其余可以忽略
										interval: 1, //这个一定要有，别忘记了
										rotate: 45,
										showMinLabel: false

									}

								},
								yAxis: {
									type: 'value'
								},
								series: [{
										type: 'line',
										itemStyle: {
											normal: {
												color: '#fa8c35', //圈圈的颜色
												lineStyle: {
													color: '#fa8c35' //线的颜色
												}
											}
										},
									},
									{
										type: 'line',
										itemStyle: {
											normal: {
												color: '#9ed900', //圈圈的颜色
												lineStyle: {
													color: '#9ed900' //线的颜色
												}
											}
										},
									},
									{
										type: 'line',
										itemStyle: {
											normal: {
												color: '#f00056', //圈圈的颜色
												lineStyle: {
													color: '#f00056' //线的颜色
												}
											}
										},
									},
								]

							}

							this.$nextTick(() => {
								this.dom.setOption(option)
								on(window, 'resize', this.resize)
							})
							//console.log(this.incomeList)
						}
					} else {

					}
				}).catch(error => {
					alert(error)
				})
			},
			showDetailModal(title, day) { //显示详情对话框
				this.modalTitle = title + this.detail
				this.pageNo = 0
				this.detailDay = day
				this.modalValue = true
				this.getRtuDayIncomeList()
			},
			getRtuDayIncomeList() { //获取详情列表数据
				this.tableLoading = true
				getVMOrgRtuDayIncomeList(this.detailDay, this.pageNo, this.pageSize).then(res => {
					const data = res.data
					//console.log(data)
					this.tableLoading = false
					if (data.success == 1) {
						this.mEdetailData = data.vmRtuDayIncomeList
					} else {
						this.$Message.error(data.errorMessage)
					}

				}).catch(error => {
					this.tableLoading = false
					alert(error)
				})
			},
			nextPage() {
				if (this.mEdetailData.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					this.pageNo++
					this.getRtuDayIncomeList()
				}

			},
			prevPage() {
				if (this.pageNo > 0) {
					this.pageNo--
					this.getRtuDayIncomeList()
				} else {
					this.$Message.warning('这是第一页');
				}

			},
			resize() {
				this.dom.resize()
			}
		},
		created() {

		},
		mounted() {
			var startDay = getLastMonthday(new Date(), '')
			var endDay = getNowFormatDate(new Date(), '')
			this.getDayIncomeList(startDay, endDay)
		},
		beforeDestroy() {
			off(window, 'resize', this.resize)
		}

	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.mEdetailModalStyle .ivu-modal-body {
			padding: 0;
		}

		.mEdetailModalStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
		.mEdetailModalStyle .ivu-badge-status-text {
			margin-left: 0;
		}
	}
</style>
