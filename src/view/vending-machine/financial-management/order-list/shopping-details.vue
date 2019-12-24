<template>
	<div>

		<div>
			<div style="overflow: hidden;">
				<p class="shoppingText">订单号:<span class="shoppingColor">{{orderId}}</span></p>
				<p class="shoppingText">机器编号:<span class="shoppingColor">{{rtuNum}}</span></p>
				<p class="shoppingText">下单时间:<span class="shoppingColor">{{orderTime}}</span></p>
				
			</div>
			<p style="text-align: right;font-size: 24px;">十位尾号:<span class="shoppingColor">{{tenNum}}</span>&nbsp;&nbsp;&nbsp;余数:<span class="shoppingColor">{{remainder}}</span></p>
		</div>
		<Table border :columns="shoppingColumns" :data="shoppingList" size="small" show-summary sum-text="合计">
		</Table>
	</div>
</template>

<script>
	import {
		shoppingColumns
	} from '@/data/columns.js'
	export default {
		name: 'shopping_details',
		data() {
			return {
				orderId: '201910171110467287775109643', //订单Id
				rtuNum: '100000', //机器编号
				orderTime: '2019-10-17 11:57:48', //下单时间
				shoppingColumns: shoppingColumns,
				shoppingList: [{}],
				tenNum:'1234567890',//十位尾数
				remainder:'12344',//余数
				
			}
		}
	}
</script>

<style scoped="scoped">
	.shoppingText {
		float: left;
		width: 30%;
	}

	.shoppingColor {
		color: red;
	}
</style>
