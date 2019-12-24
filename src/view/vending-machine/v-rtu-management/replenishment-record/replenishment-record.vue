<template>
	<div>
		<Form ref="repModel" :model="repModel" :rules="repRule" inline :label-width="70">
			<FormItem label="机器编号" prop="rtuNum">
				<Input type="text" v-model="repModel.rtuNum" placeholder="Username">
				</Input>
			</FormItem>
			<FormItem label="货道" prop="aisle">
				<Input type="text" v-model="repModel.aisle" placeholder="Password">
				</Input>
			</FormItem>
			<FormItem label="日期范围" prop="date">
				<DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 250px"></DatePicker>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('repModel')">查找</Button>
			</FormItem>
		</Form>
		
		 <Table size="small" border :columns="replenishmentColumns" :data="replenishmentList"></Table>
	</div>
</template>

<script>
	import { replenishmentColumns } from '@/data/columns.js'
	export default {
		name: 'replenishment_record',
		data() {
			return {
				repModel:{
					rtuNum:'',
					aisle:'',
					date:'',
					
				},
				repRule:[],
				replenishmentColumns:replenishmentColumns,
				replenishmentList:[{
					
				}]

			}
		}
	}
</script>

<style>
</style>
