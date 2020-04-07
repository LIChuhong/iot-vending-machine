<template>
	<Table size="small" border :columns="shippingDetailColumns" :data="cargoOutCommodityOrderList" max-height="400">
		<template slot-scope="{ row, index }" slot="orderId">
			<div>{{row.payType == "WX" ?'微信':"支付宝"}}:{{row.transaction_id}}</div>
			<div>商户:{{row.orderId}}</div>
		</template>
	</Table>
</template>

<script>
	import { shippingDetailColumns } from '@/data/columns1'
	export default{
		props:['cargoOutCommodityOrderList'],
		data(){
			return{
				shippingDetailColumns:shippingDetailColumns,
				//shippingDetailList:[]
			}
		}
	}
</script>

<style>
</style>
