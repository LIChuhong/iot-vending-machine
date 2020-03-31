<template>
	<div>
		<Form ref="salesModel" :model="salesModel" :rules="salesRule" :label-width="70" label-position="left" inline>
			<FormItem label="设备编号" prop="rtuNum">
				<Input type="text" v-model="salesModel.rtuNum" placeholder="请输入设备编号"></Input></FormItem>
			<FormItem label="起始日期" prop="startDate">
				<DatePicker type="date" placeholder="Select date"></DatePicker>
			</FormItem>
			<FormItem label="结束日期" prop="endDate">
				<DatePicker type="date" placeholder="Select date"></DatePicker>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('salesModel')">查找</Button>
			</FormItem>
		</Form>
		<Table border :columns="salesColumns" :data="salesList" size="small" show-summary sum-text="合计">
		</Table>
	</div>
</template>

<script>
	import {
		salesColumns
	} from '@/data/columns.js'
	export default {
		name: 'sales_subsidiary',
		data() {
			return {
				salesColumns: salesColumns,
				salesList: [{}],
				salesModel: {
					rtuNum: '',
					startDate: '',
					endDate: ''
				},
				earningsrRule: [],


			}
		}
	}
</script>

<style>
</style>
