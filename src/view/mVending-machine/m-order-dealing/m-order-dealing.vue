<!-- 订单处理组件 -->
<template>
	<div>
		<List item-layout="vertical" class="orderListStyle">
			<ListItem>
				<Row>
					<Col span="8">
					<div>
						<p>订单数:{{totalCount}}</p>
					</div>
					</Col>
					<Col span="8">
					<div>
						<p>收入:${{totalAmount}}</p>
					</div>
					</Col>
					<Col span="8">
					<div>
						<p>利润:${{profitAmount}}</p>
					</div>
					</Col>
				</Row>
			</ListItem>
			<ListItem>
				<Row style="text-align: center;">
					<Col span="12">
					<div>
						<Input v-model="orderIdKey" placeholder="请输入订单号关键字" />
					</div>
					</Col>
					<Col span="12">
					<div>
						<DatePicker format="yyyy-MM-dd" :open="open" :value="date" type="date" @on-change="handleChange">
							<a href="javascript:void(0)" @click="handleClick">
								<Icon type="ios-calendar-outline"></Icon>
								<template>{{ date }}</template>
							</a>
						</DatePicker>
					</div>
					</Col>
				</Row>
			</ListItem>
			<ListItem>
				<Row style="text-align: center;">
					<Col span="12">
					<div>
						<Input v-model="rtuNumber" type="number" placeholder="请输入机器编号" />
					</div>
					</Col>
					<Col span="12" style="text-align: right;">
					<Select v-model="buyState" style="width: 70%;text-align: center;">
						<Option v-for="item in buyStateList" :value="item.id" :key="item.id">{{ item.label }}</Option>
					</Select>
					</Col>
				</Row>
			</ListItem>
			<ListItem>
				<Row style="text-align: right;">
					<Col span="12">
					<div>
						<Input v-model="cargoNo" type="number" placeholder="请输入货道编号" />
					</div>
					</Col>
					<Col span="12">
					<div>
						<Button @click="queryOrderList" type="primary">查询</Button>
					</div>
					</Col>
				</Row>
			</ListItem>
		</List>

		<Table :loading="orderListLoading" border :columns="mOrderDealColumns" :data="orderData" size="small" class="orderTableStyle">

			<template slot-scope="{ row, index }" slot="action">

				<div>
					<a href="javascript:void(0)" @click="handleModal(row)">详情</a>
				</div>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>

		</div>
		<Modal v-model="contentModalValue" fullscreen footer-hide title="订单详情" class="contentModalStyle">
			<List border item-layout="vertical" size="small">
				<ListItem>
					<span>支付订单ID:</span>
					<p style="float: right;">{{transaction_id}}</p>
				</ListItem>
				<ListItem style="overflow: hidden;">
					<span>商户ID:</span>
					<p style="float: right;">{{collAccount}}</p>
				</ListItem>
				<ListItem style="overflow: hidden;">
					<span>订单时间:</span>
					<p style="float: right;">{{orderTime}}</p>
				</ListItem>
				<ListItem style="overflow: hidden;">
					<span>订单状态:</span>
					<p style="float: right;">{{orderStateLabel}}</p>
				</ListItem>
				<ListItem style="overflow: hidden;">
					<span>机器编号:</span>
					<p style="float: right;">{{rowRtuNumber}}</p>
				</ListItem>
				<ListItem style="overflow: hidden;">
					<span>用户ID:</span>
					<p style="float: right;">{{openId}}</p>
				</ListItem>
				<ListItem style="overflow: hidden;">
					<span>支付金额:</span>
					<p style="float: right;">{{payTotalAmount}}</p>
				</ListItem>
				<ListItem style="overflow: hidden;">
					<span>总成本:</span>
					<p style="float: right;">{{totalCostAmount}}</p>
				</ListItem>
				<ListItem style="overflow: hidden;">
					<span>应退金额:</span>
					<p style="float: right;">{{refundTotalAmount}}<Button v-show="refundTotalBtn" @click="refundTotal(refundTotalAmount)" type="warning">退款</Button></p>
				</ListItem>
			</List>

			<Table border :columns="mOcontentColumns" :data="buyCommodityList" size="small">
				<template slot-scope="{ row, index }" slot="totalPrice">
					{{row.price*row.buyCount}}
				</template>
			</Table>

		</Modal>
		
	</div>
</template>

<script>
	import {
		getOrderList,
		refund
	} from '@/api/order'
	import {
		getNowFormatDate,
		timestampToTime
	} from '@/libs/tools'
	import {
		mOrderDealColumns,
		mOcontentColumns
	} from '@/data/columns.js'
	export default {
		data() {
			return {
				orderListLoading: false,
				refundTotalBtn: false,//是否显示退款按钮
				rowRtuNumber: null,//机器编号
				orderId: null,//订单ID
				refundTotalAmount: null, //退款金额
				payTotalAmount: null, //支付金额
				transaction_id: null, //支付订单ID
				collAccount: null, //商户订单Id
				orderTime: null, //订单时间
				orderStateLabel:null,//订单状态
				orderState: null, //订单时间
				openId: null, //用户ID
				buyCommodityList: [],//购买商品详情列表
				mOcontentColumns: mOcontentColumns,
				contentModalValue: false,
				totalCount: null, //订单数
				totalAmount: null, //收入
				profitAmount: null, //利润
				orderIdKey: null, //订单关键字
				rtuNumber: null, //机器编号
				cargoNo: null, //货道
				totalCostAmount: null,//总成本
				open: false,
				date: getNowFormatDate(new Date(), '-'),//默认当前时间查找
				//date: new Date(),
				mOrderDealColumns: mOrderDealColumns,
				orderData: [],
				pageNo: 0, //页码
				pageSize: 5, //页数
				buyState: 0, //购买状态
				buyStateList: [{
						id: 0,
						label: '所有订单'
					},
					{
						id: 1,
						label: '购买成功'
					},
					{
						id: 2,
						label: '购买失败'
					},
				],
				orderStateList: [{//订单状态列表
						id: 0,
						label: '未支付'
					},
					{
						id: 1,
						label: '已支付'
					},
					{
						id: 2,
						label: '购买成功'
					},
					{
						id: 3,
						label: '购买失败'
					},
					{
						id: 4,
						label: '退款中'
					},
					{
						id: 5,
						label: '已退款'
					},
					{
						id: 6,
						label: '退款失败'
					},
				],
			}

		},
		watch:{
			
		},
		methods: {
			queryOrderList() {//查询订单
				this.pageNo = 0
				this.getOrderListData()
			},
			refundTotal(refundTotalAmount) {//退款
				this.$Modal.confirm({
					title: '请确认退款金额',
					render: (h) => {
						return h('div', [h('Input', {
								props: {
									value: refundTotalAmount,
									autofocus: true,
									placeholder: '请输入退款金额',
									type: 'Number',
								},
								on: {
									input: (val) => {
										this.refundTotalAmount = val;
									}
								}
							}),
							h('p', {
								style: {
									color: 'red'
								}
							}, '退款金额不能少于等于0或大于实际支付金额')
						])

					},
					loading: true,
					onOk: () => {
						if (this.refundTotalAmount <= 0 || this.refundTotalAmount > refundTotalAmount) {
							this.$Message.error('退款失败')
							this.$Modal.remove();
						} else {
							refund(this.orderId, parseFloat(this.refundTotalAmount)).then(res => {
								this.$Modal.remove();
								const data = res.data
								if (data.success == 1) {
									this.refundTotalAmount = 0
									this.refundTotalBtn = false
									this.$Message.success('退款成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.$Modal.remove();
								alert(error)
							})
						}

					},
				
				});
			},
			getOrderListData() {//获取订单列表数据
				if (this.rtuNumber == null || this.rtuNumber == '') {
					this.$Message.warning('机器编号不能为空')
					return
				}
				//const day = getNowFormatDate(this.date, '')
				const day = this.date.split('-').join('')
				const rtuNumber = parseInt(this.rtuNumber)
				let cargoNo = null
				if (this.cargoNo != null && this.cargoNo != '') {
					cargoNo = parseInt(this.cargoNo)
				}
				this.orderListLoading = true
				getOrderList(rtuNumber, this.orderIdKey, null, day, this.buyState, this.pageNo, this.pageSize).then(res => {
					const data = res.data
					this.orderListLoading = false
					if (data.success == 1) {
						this.totalCount = data.totalCount
						this.totalAmount = data.totalAmount
						this.profitAmount = data.profitAmount
						const buyStateList = this.buyStateList
						this.orderData = data.orderList.map(item => {
							this.orderStateList.map(i => {
								if (item.orderState == i.id) {
									item.orderStateLabel = i.label
								}
							})
							return item
						})
					} else {
						this.$Message.error(data.errorMessage)

					}
				}).catch(error => {
					this.orderListLoading = false
					alert(error)
				})
			},
			handleModal(row) {//显示订单详情
				this.transaction_id = row.transaction_id
				this.collAccount = row.collAccount
				this.rowRtuNumber = row.rtuNumber
				this.openId = row.openId
				this.payTotalAmount = row.payTotalAmount
				this.totalCostAmount = row.totalCostAmount
				this.refundTotalAmount = row.refundTotalAmount
				this.refundTotalBtn = this.refundTotalAmount > 0 && row.orderState != 5? true : false
				this.orderTime = timestampToTime(row.orderTime)
				this.orderId = row.orderId
				this.buyCommodityList = row.shoppingCart.buyCommodityList
				this.orderStateLabel = row.orderStateLabel

				this.contentModalValue = true
			},
			handleClick() {//打开日期选择器
				this.open = !this.open;
			},
			handleChange(date) {//选择时间
				this.open = false
				this.date = date;
			},
			nextPage() {
				if (this.orderData.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					this.pageNo++
					this.getOrderListData()
				}

			},
			prevPage() {
				if (this.pageNo > 0) {
					this.pageNo--
					this.getOrderListData()
				} else {
					this.$Message.warning('这是第一页');
				}
			},
		},
		mounted() {


		}

	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.orderListStyle {
			padding: 0 0.625rem;
		}

		.orderListStyle .ivu-list-item-extra {
			margin: 0;
		}

		.orderTableStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}

		.contentModalStyle .ivu-modal-header {
			text-align: center;
		}

		.contentModalStyle .ivu-modal-body {
			padding: 0;
		}

		.contentModalStyle .ivu-table-cell,
		.contentModalStyle .ivu-list-item-extra {
			padding: 0;
			margin: 0;
		}

	}
</style>
