<template>
	<div style="margin: 0 auto;">
		<Form style="width: 50%;margin: 0 auto;" ref="addRtuModel" :model="addRtuModel" :rules="addRtuRules" :label-width="100">
			<FormItem label="设备编号" prop="rtuNum">
				<Input v-model="addRtuModel.rtuNum" placeholder="请输入设备编号"></Input>
			</FormItem>
			<FormItem label="设备名称" prop="rtuName">
				<Input v-model="addRtuModel.rtuName" placeholder="请输入设备名称"></Input>
			</FormItem>
			<FormItem label="设备类型" prop="rtuType">
				<Select v-model="addRtuModel.rtuType" placeholder="请选择设备类型">
					<Option value="0">自动售货机</Option>
				</Select>
			</FormItem>
			<FormItem label="设备版本" prop="rtuVersion">
				<Input v-model="addRtuModel.rtuVersion" placeholder="请输入设备版本(如:1.2)"></Input>
			</FormItem>
			<FormItem label="生产日期" prop="date">
				<DatePicker type="date" placeholder="请选择生产日期" v-model="addRtuModel.date"></DatePicker>
			</FormItem>
			<FormItem label="生产批次" prop="productionBatch">
				<Input v-model="addRtuModel.productionBatch" placeholder="请输入生产批次"></Input>
			</FormItem>
			<FormItem label="所属用户" prop="belongUser">
				<Input readonly v-model="addRtuModel.belongUser" search enter-button="选择" placeholder="请选择所属用户" @on-search="getBelongUser=true"></Input>
			</FormItem>
			<FormItem label="收款账户" prop="collectionUser">
				<Input readonly v-model="addRtuModel.collectionUser" search enter-button="选择" placeholder="请选择收款账户" @on-search="getCollectionUser=true"></Input>
			</FormItem>
			<FormItem label="加盟热线" prop="joinTel">
				<Input v-model="addRtuModel.joinTel"></Input>
			</FormItem>
			<FormItem style="text-align: center;">
				<Button @click="handleReset('addRtuModel')" style="margin-right: 8px">重置</Button>
				<Button type="primary" @click="handleSubmit('addRtuModel')">添加</Button>
			</FormItem>
		</Form>
		<Modal width="70" v-model="getBelongUser" title="选择所属用户" footer-hide>
			<Input style="margin-bottom: 8px;width: 50%;" v-model="belongUserKey" search enter-button placeholder="请输入用户关键字" @on-search="findBelongUser"></Input>
			<Table size="small" border :columns="belongUserColumns" :data="belongUserList">
				<template slot-scope="{ row, index }" slot="action">
					<Button type="primary" size="small" style="margin-right: 5px" @click="chooseBelongUser(row)">选择</Button>
				</template>
			</Table>
		</Modal>
		
		<Modal width="70" v-model="getCollectionUser" title="选择收款账户" footer-hide>
			<Input style="margin-bottom: 8px;width: 50%;" v-model="collectionUserKey" search enter-button placeholder="请输入账户关键字" @on-search="findCollectionUser"></Input>
			<Table size="small" border :columns="collectionUserColumns" :data="collectionUserList">
				
				<template slot-scope="{ row, index }" slot="action">
					<Button type="primary" size="small" style="margin-right: 5px" @click="chooseCollectionUser(row)">选择</Button>
				</template>
			</Table>
		</Modal>
	</div>
</template>

<script>
	import { belongUserColumns,collectionUserColumns } from '@/data/columns.js'
	import { addRtu,getBelongUserList,getCollectionUserList } from '@/api/v-rtu-manage'
	export default {
		name: 'add_rtu',
		data() {
			return {
				collectionUserKey:'',
				collectionUserColumns:collectionUserColumns,
				belongUserColumns: belongUserColumns,
				belongUserList: [{}],
				collectionUserList:[{}],
				belongUserKey: '',
				getCollectionUser:false,
				getBelongUser: false,
				addRtuModel: {
					rtuNum: '', //设备编号
					rtuName: '', //设备名称
					rtuType: '', //设备类型
					rtuVersion: '', //设备版本
					date: '', //生产日期
					productionBatch: '', //生产批次
					belongUser: '', //所属用户
					collectionUser: '', //收款账户
					joinTel: '', //加盟热线

				},
				//addRtuRules: [],
				addRtuRules: {
					rtuNum: [{
						required: true,
						message: 'The name cannot be empty',
						trigger: 'blur'
					}],
					rtuName: [{
						required: true,
						message: 'The name cannot be empty',
						trigger: 'blur'
					}],
					rtuType: [{
						required: true,
						message: 'Please select the city',
						trigger: 'blur'
					}],
					rtuVersion: [{
						required: true,
						message: 'Please select gender',
						trigger: 'blur'
					}],
					date: [{
						required: true,
						type: 'date',
						message: 'Please select the date',
						trigger: 'change'
					}],
					productionBatch: [{
						required: true,
						message: 'Please select gender',
						trigger: 'blur'
					}],
					belongUser: [{
						required: true,
						message: 'Please select gender',
						trigger: 'blur'
					}],
					collectionUser: [{
						required: true,
						message: 'Please select gender',
						trigger: 'blur'
					}],
					// joinTel: [{
					// 	required: true,
					// 	message: 'Please select gender',
					// 	trigger: 'blur'
					// }],
				}

			}
		},
		methods: {
			chooseBelongUser(row){
				
			},
			chooseCollectionUser(row){
				
			},
			 handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
						addRtu(this.addRtuModel).then(res => {
							
						}).catch(error => {
							alert(error)
						})
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
			findBelongUser(value) {

			},
			findCollectionUser(value){
				
			}
			
		},

	}
</script>

<style>
</style>
