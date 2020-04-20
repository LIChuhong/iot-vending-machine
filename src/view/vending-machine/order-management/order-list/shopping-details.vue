<template>
	<div>
		<!-- {{detailsRows}} -->
			<div style="overflow: hidden;">
				<p class="shoppingText">订单号:<span class="shoppingColor">{{detailsRows.orderId}}</span></p>
				<p class="shoppingText">机器编号:<span class="shoppingColor">{{detailsRows.rtuNumber}}</span></p>
				<p class="shoppingText">下单时间:<span class="shoppingColor">{{detailsRows.orderTime}}</span></p>
				<p class="shoppingText">订单状态:<span class="shoppingColor">{{detailsRows.orderStateName}}</span></p>
			</div>
		<Table border :columns="shoppingColumns" :data="detailsRows.shoppingCart.buyCommodityList" size="small">
			<template slot-scope="{ row, index }" slot="price">
				{{row.price.toFixed(2)}}
			</template>
			<template slot-scope="{ row, index }" slot="costPrice">
				{{row.costPrice.toFixed(2)}}
			</template>
			<template slot-scope="{ row, index }" slot="failureCount">
				{{row.buyCount-row.finishCount}}
			</template>
			<template slot-scope="{ row, index }" slot="totalPrice">
				{{(row.price*row.buyCount).toFixed(2)}}
			</template>
			<template slot-scope="{ row, index }" slot="totalCostPrice">
				{{(row.costPrice*row.finishCount).toFixed(2)}}
			</template>
			<template slot="footer">
				<div style="text-align: right;">
					<span>应退金额:{{detailsRows.refundTotalAmount.toFixed(2)}}</span><span v-if="detailsRows.refundedTotalAmount > 0">(已退:{{detailsRows.refundedTotalAmount.toFixed(2)}})</span>
					<Button :disabled="detailsRows.refundTotalAmount <= 0"  style="margin: 0 1.25rem;"  type="warning" @click="refundTotal(detailsRows.refundTotalAmount)">退款</Button></div>
			</template>
			
		</Table>
	</div>
</template>

<script>
	import {
		shoppingColumns
	} from '@/data/columns.js'
	import {
		refund
	} from '@/api/order'
	export default {
		name: 'shopping_details',
		props:['detailsRows'],
		data() {
			return {
				shoppingColumns: shoppingColumns,
			}
		},
		methods: {
			refundTotal(refundTotalNum) {
				let newRefundTotalNum = refundTotalNum
				this.$Modal.confirm({
					title: '请确认退款金额',
					render: (h) => {
						return h('div', [h('Input', {
								props: {
									value: refundTotalNum,
									autofocus: true,
									placeholder: '请输入退款金额',
									type: 'Number',
								},
								on: {
									input: (val) => {
										newRefundTotalNum = val;
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
						if (parseFloat(newRefundTotalNum) <= parseFloat(refundTotalNum)) {
							refund(this.detailsRows.orderId, parseFloat(newRefundTotalNum)).then(res => {
								this.$Modal.remove();
								const data = res.data
								if (data.success == 1) {
									this.detailsRows.refundTotalAmount = data.refundTotalAmount
									this.detailsRows.refundedTotalAmount = data.refundedTotalAmount
									this.$Message.success('退款成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.$Modal.remove();
								alert(error)
							})
							
						} else {
							this.$Message.error('退款失败')
							this.$Modal.remove();
							
						}
			
					},
				
				});
			
			},
			
		},
		
	}
</script>

<style scoped="scoped">
	.shoppingText {
		float: left;
		width: 25%;
	}

	.shoppingColor {
		color: red;
	}
</style>
