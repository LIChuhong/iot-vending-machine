<template>
	<Form ref="rtuCopyModel" :model="rtuCopyModel" :rules="rtuCopyRule" :label-width="80" style="width: 50%;margin: 0 auto;">
		<FormItem label="机器编号" prop="rtuNum">
			<Input type="text" v-model="rtuCopyModel.rtuNum" placeholder="请输入机器编号">
			
			</Input>
		</FormItem>
		<FormItem label="复制数量" prop="copyNum">
			<Input type="text" v-model="rtuCopyModel.copyNum" placeholder="请输入复制数量">
			</Input>
		</FormItem>
		<FormItem style="text-align: center;">
			 <Button @click="handleReset('rtuCopyModel')" style="margin-right: 8px">重置</Button>
			<Button type="primary" @click="handleSubmit('rtuCopyModel')">复制</Button>
		</FormItem>
	</Form>
</template>

<script>
	import { rtuCopy } from '@/api/v-rtu-manage'
	export default {
		name: 'copy_rtu',
		data() {
			return {
				rtuCopyModel:{
					rtuNum:'',
					copyNum:''
				},
				rtuCopyRule:[]

			}
		},
		methods: {
			handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
		},
		
	}
</script>

<style>
</style>
