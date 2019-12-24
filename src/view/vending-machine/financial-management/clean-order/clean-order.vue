<template>
	
	<Form style="width: 50%;margin: 0 auto;" ref="cleanOrderModel" :model="cleanOrderModel" :rules="cleanOrderRule" :label-width="80">
		<FormItem label="起始日期" prop="startDate">
			 <DatePicker type="date" placeholder="Select date" style="width: 100%;"></DatePicker>
		</FormItem>
		<FormItem label="结束日期" prop="endDate">
			 <DatePicker type="date" placeholder="Select date" style="width: 100%;"></DatePicker>
		</FormItem>
		<FormItem label="设备编号" prop="rtuNum">
			<Input type="text" v-model="cleanOrderModel.rtuNum" placeholder="请输入设备编号(如:100000)"></Input>
		</FormItem>
		<FormItem style="text-align: center;">
			<Button @click="handleReset('cleanOrderModel')" style="margin-right: 8px">重置</Button>
			<Button type="primary" @click="handleSubmit('cleanOrderModel')">提交</Button>
		</FormItem>
	</Form>
	
</template>

<script>
	export default{
		name:'clean_order',
		data(){
			return{
				cleanOrderModel:{
					startDate:'',
					endDate:'',
					rtuNum:''
				},
				cleanOrderRule:[]
			}
		}
	}
</script>

<style>
</style>
