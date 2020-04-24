<template>
	<Form ref="updateTotalData" :model="updateTotalData" :rules="updateTotalDataRule" inline :label-width="90">
		<FormItem label="机器编号" prop="rtuNumber">
			<Input type="number" v-model="updateTotalData.rtuNumber" placeholder="请输入机器编号">
			</Input>
		</FormItem>
		<FormItem label="日期" prop="day">
			<DatePicker :editable="false" v-model="updateTotalData.day" type="date" placeholder="请选择纠正日期"></DatePicker>
		</FormItem>
		<FormItem>
			<Button type="primary" @click="handleSubmit('updateTotalData')">纠正</Button>
		</FormItem>
	</Form>
</template>

<script>
	import { updateVMRtuDayTotalData } from '@/api/order'
	import {
		getNowFormatDate
	} from '@/libs/tools'
	export default {
		name: 'correct_statistics',
		data() {
			return {
				updateTotalData: {
					rtuNumber: '',
					day: '',
				},
				updateTotalDataRule: {
					rtuNumber: [{
						required: true,
						//type: 'number',
						message: '请输入机器编号',
						trigger: 'blur'
					}],
					day: [{
						required: true,
						type: 'date',
						message: '请选择纠正日期',
						trigger: 'change'
					}],
				}
			}
		},
		methods: {
			handleSubmit (name) {
			    this.$refs[name].validate((valid) => {
			        if (valid) {
						//this.showSpin = true
						const rtuNumber = parseInt(this.updateTotalData.rtuNumber)
						const day = getNowFormatDate(this.updateTotalData.day,'')
						updateVMRtuDayTotalData(rtuNumber,day).then(res=>{
							const data = res.data
							//this.showSpin = false
							if(data.success == 1){
								//console.log(data)
								this.$Message.success('纠正成功');
								//alert(JSON.stringify(data))
								//this.userRolesList = data.userRolesList
							}else{
								this.$Message.error(data.Message);
							}
						}).catch(error=>{
							alert(error)
						})
						
						//console.log(this.vmUser)
			        } else {
			           // this.$Message.error('Fail!');
			        }
			    })
			},
			
		},
		created() {
			this.$route.meta.keepAlive = true
		},
		
	}
</script>

<style>
</style>
