<template>
	<div>
		<div style="overflow: hidden;">
			<p style="width: 30%;float: left;">订单总金额:<span style="color: red;">4333</span></p>
			<p style="float: left;">订单总笔数:<span style="color: red;">4433</span></p>
		</div>
		<Form  ref="cleanOrderModel" :model="earningsModel" :rules="earningsrRule" :label-width="70" label-position="left" inline>
			<FormItem label="起始日期" prop="startDate">
				 <DatePicker type="date" placeholder="Select date"></DatePicker>
			</FormItem>
			<FormItem label="结束日期" prop="endDate">
				 <DatePicker type="date" placeholder="Select date"></DatePicker>
			</FormItem>
			
			<FormItem>
				<Button type="primary" @click="handleSubmit('cleanOrderModel')">查找</Button>
			</FormItem>
		</Form>
		<Table border :columns="earningsColumns" :data="earningsList" size="small" show-summary sum-text="合计">
		</Table>
	</div>
</template>

<script>
	import { earningsColumns } from '@/data/columns.js'
	export default{
		name:'earnings',
		data(){
			return{
				earningsColumns:earningsColumns,
				earningsList:[{}],
				earningsModel:{
					startDate:'',
					endDate:'',
				},
				earningsrRule:[]
				
			}
		}
	}
</script>

<style>
</style>
