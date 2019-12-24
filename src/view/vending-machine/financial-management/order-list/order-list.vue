<template>
	<div>
		<div style="overflow: hidden;">
			<p class="showText">订单总金额:<span class="textColor">{{totalAmount}}</span></p>
			<p class="showText">订单总笔额:<span class="textColor">{{totalNumber}}</span></p>
			<p class="showText">收入:<span class="textColor">{{income}}</span></p>
			<p class="showText">订单数:<span class="textColor">{{orderNum}}</span></p>
			<p class="showText">利润:<span class="textColor">{{profits}}</span></p>
		</div>
		<Form ref="orderModel" :model="orderModel" :rules="orderRule" inline>
			<FormItem prop="orderIdKey">
				<Input type="text" v-model="orderModel.orderIdKey" placeholder="请输入订单ID关键字(可选)" style="width: 200px" />
			</FormItem>
			<FormItem prop="rtuNum">
				<Input type="text" v-model="orderModel.rtuNum" placeholder="请输入机器编号(可选)" />
			</FormItem>
			<FormItem prop="aisleNum">
				<Input type="text" v-model="orderModel.aisleNum" placeholder="请输入货道编号(可选)" />
			</FormItem>
			<FormItem prop="orderType">
				<Select v-model="orderModel.orderType" placeholder="请选择订单类型">
					<Option value="beijing">所有订单</Option>
				</Select>
			</FormItem>
			<FormItem prop="date">
				<DatePicker type="date" placeholder="请选择日期" v-model="orderModel.orderType"></DatePicker>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('orderModel')">查询</Button>
			</FormItem>
		</Form>
		<Table border :columns="orderColumns" :data="orderList" size="small">
			<template slot-scope="{ row }" slot="orderId">
				<p>微信:4200000415201910171569048550</p>
				<p>商户:201910171110467287775109643</p>
			</template>
			<template slot-scope="{ row }" slot="customerInfo">
				<p>openId:o5E-z0hbwTRDp1mSyzjS9AszTEuM</p>
				<img src="../../../../assets/images/雪碧.png" width="50" height="50" style="float: right;" />
				<p>昵称:littleGirl</p>
				<p>所在城市:齐齐哈尔</p>
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<p>下单:2019-10-17 11:57:48</p>
				<p>支付完成:2019-10-17 11:57:56</p>
				<p>出货:2019-10-17 11:57:48</p>
				<Button icon="md-cart" type="primary" size="small" @click="showOrderDetails(row)">详情</Button>
			</template>
		</Table>
		<Modal v-model="showShopping" title="购物车详情" footer-hide width="90">
			<shopping-details></shopping-details>
		</Modal>
	</div>
</template>

<script>
	import shoppingDetails from './shopping-details.vue'
	import {
		orderColumns
	} from '@/data/columns.js'
	export default {
		name: 'order_list',
		components: {
			shoppingDetails
		},
		data() {
			return {
				showShopping: false,
				totalAmount: 0, //订单总金额
				totalNumber: 0, //订单总笔数
				income: 0, //收入
				orderNum: 0, //订单数
				profits: 0, //利润
				orderModel: {
					orderIdKey: '', //关键字
					rtuNum: '', //机器编号
					aisleNum: '', //货道编号
					orderType: '', //订单类型
					date: '', //日期
				},
				orderRule: [],
				orderList: [{},
					{}
				],
				orderColumns: orderColumns

			}
		},
		methods: {
			showOrderDetails(row) {
				this.showShopping = true
			}
		},

	}
</script>

<style scoped="scoped">
	.showText {
		float: left;
		width: 20%;
	}

	.textColor {
		color: red;
	}
</style>
