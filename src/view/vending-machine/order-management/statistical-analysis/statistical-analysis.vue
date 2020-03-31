<template>
	<div>
		<div style="overflow: hidden;">
			<!-- <p class="showText">订单总金额:<span class="textColor">{{totalAmount}}</span></p> -->
			<p class="showText">订单总笔额:<span class="textColor">{{totalCount}}</span></p>
			<p class="showText">总收入:<span class="textColor">{{totalAmount}}</span></p>
			<p class="showText">总成本:<span class="textColor">{{totalCostAmount}}</span></p>
			<p class="showText">总利润:<span class="textColor">{{totalProfits}}</span></p>
		</div>
		<Form ref="analysisModel" :model="analysisModel" :rules="analysisRule" inline :label-width="70">
			<FormItem label="机器编号" prop="rtuNum">
				<Input type="text" v-model="analysisModel.rtuNum" placeholder="Username">
				</Input>
			</FormItem>
			<FormItem label="时间范围" prop="dateTime">
				<DatePicker type="datetimerange" placement="bottom-end" placeholder="Select date" style="width: 350px"></DatePicker>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('analysisModel')">查找</Button>
			</FormItem>
		</Form>
		<Card shadow>
			<analysis-echarts style="height: 400px;"></analysis-echarts>
		</Card>
	</div>
</template>

<script>
	import analysisEcharts from './analysis-echarts.vue'
	export default {
		name: 'statistical_analysis',
		components: {
			analysisEcharts
		},
		data() {
			return {
				totalCount:0,
				totalAmount:508.42,
				totalCostAmount:219,
				analysisModel: {
					rtuNum:'',
					dateTime:''
				},
			}
		},
		computed:{
			totalProfits:function () {
				return this.totalAmount - this.totalCostAmount
			}
			// totalProfits:()=>{
			// 	return this.totalAmount - this.totalCostAmount
			// }
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