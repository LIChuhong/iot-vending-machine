<template>
	<div>

		<Form ref="vmRtu" :model="vmRtu" :rules="vmRtuRule" :label-width="80">
			<FormItem label="设备编号" prop="rtuNumber">
				<Input type="number" v-model="vmRtu.rtuNumber" placeholder="请输入机器编号"></Input>
			</FormItem>
			<FormItem label="设备名称" prop="rtuName">
				<Input v-model="vmRtu.rtuName" placeholder="请输入设备名称"></Input>
			</FormItem>
			<FormItem label="机器类型" prop="rtuTypeId">
				<Select @on-open-change="openRtuTypeList" :disabled="disEditor" v-model="vmRtu.rtuTypeId" placeholder="请选择设备类型" @on-change="getRtuType">
					<Option v-for="item in rtuTypeList" :key="item.id" :value="item.id">{{item.rtuTypeName}}</Option>
				</Select>
			</FormItem>
			<FormItem label="设备版本" prop="rtuVersion">
				<Input :disabled="disEditor" type="number" v-model="vmRtu.rtuVersion" placeholder="请输入设备版本"></Input>
			</FormItem>
			<FormItem label="生产日期" prop="date">
				<DatePicker :editable="false" :disabled="disEditor" type="date" placeholder="请选择生产日期" v-model="vmRtu.date"></DatePicker>
			</FormItem>
			<FormItem label="生产批次" prop="productionBatch">
				<Input :disabled="disEditor" type="number" v-model="vmRtu.productionBatch" placeholder="请输入生产批次"></Input>
			</FormItem>
			<FormItem label="所属商家" prop="belongOrgId">
				<Input readonly v-model="belongOrgName" search enter-button="选择" placeholder="请选择所属组织商家" @on-search="getBelongOrgInfo"></Input>
			</FormItem>
			<FormItem label="收款人" prop="payId">
				<Input readonly v-model="payeeName" search enter-button="选择" placeholder="请选择收款账户" @on-search="showPayId=true"></Input>
			</FormItem>
			<FormItem label="页面风格" prop="shopType">
				<Select @on-open-change="openShopTypeList" placeholder="请选择页面风格" v-model="vmRtu.shopType">
					<Option v-for="item in shopTypeList" :key="item.id" :value="item.id">{{item.shopTypeName}}({{item.pageName}})</Option>
				</Select>
			</FormItem>
			<FormItem label="售后电话" prop="serviceTelePhone">
				<Input v-model="vmRtu.serviceTelePhone" placeholder="请输入售后电话"></Input>
			</FormItem>

			<FormItem label="机器地址" prop="address">
				<Input v-model="vmRtu.address" :maxlength="255" placeholder="请输入机器所在地址"></Input>
			</FormItem>
			<FormItem label="最多购买" prop="maxBuyCount">
				<Input type="number" v-model="vmRtu.maxBuyCount"></Input>
			</FormItem>
			<FormItem label="到期时间" prop="expirationDate">
				<DatePicker :editable="false" type="date" placeholder="请选择设备到期日期" v-model="vmRtu.expirationDate"></DatePicker>
			</FormItem>
			<FormItem>
				<Button @click="handleReset('vmRtu')" style="margin-right: 8px">重置</Button>
				<Button type="primary" @click="handleSubmit('vmRtu')"><slot></slot></Button>
			</FormItem>
		</Form>
		<Modal :title="'当前选择:'+ belongOrgTitle" v-model="showBelongOrg">
			<div slot="close" style="float: left;">
				<Icon size="30" type="ios-arrow-forward" color="rgb(81,90,110)"></Icon>
				<!-- //<span>Delete confirmation</span> -->
			</div>
			<div class="tree-style">
				<org-tree v-if="showBelongOrg" @getBelongOrgInfo="showBelongOrgInfo"></org-tree>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="belongOrgOk">确定</Button>
			</div>

		</Modal>
		<Modal title="选择收款人" v-model="showPayId" footer-hide :styles="{top: '50px'}">
			<div slot="close" style="float: left;">
				<Icon size="30" type="ios-arrow-forward" color="rgb(81,90,110)"></Icon>
				<!-- //<span>Delete confirmation</span> -->
			</div>
			<pay-child-list v-if="showPayId" @getPayIdInfo="getPayIdInfo"></pay-child-list>

		</Modal>
		<Spin fix v-show="showSpin" class="show-spin-style">
			<Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
		</Spin>
	</div>
</template>

<script>
	import {
		getAllRtuTypeList,
		addVMRtu,
		getVMRtu,
		updateVMRtu
	} from '@/api/rtu'
	import {
		getVMOrgShopTypeList
	} from '@/api/shop'
	import OrgTree from '@/view/mVending-machine/components/org-tree.vue'
	import PayChildList from '@/view/components/pay-child-list.vue'
	import {
		getNowFormatDate
	} from '@/libs/tools'
	//import { addRtu,getBelongUserList,getCollectionUserList } from '@/api/v-rtu-manage'
	export default {
		name: 'rtu_form',
		props: ['rtuNumber'],
		components: {
			OrgTree,
			PayChildList
		},
		data() {
			const validateRtuName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('机器名称不能为空'));
				} else if (value.length >= 100) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validateTel = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('电话不能为空'));
				} else if (value.length >= 20) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			return {
				id:null,
				disEditor: false,
				showSpin: false,
				showPayId: false,
				userBelongOrgId: this.$store.state.user.userBelongOrgId,
				belongOrgTitle: '',
				showBelongOrg: false,
				belongOrgName: '',
				belongOrgInfo: '',
				rtuTypeList: [],
				shopTypeList: [],
				payeeName: '', //收款人姓名
				rtuTypeTag: '', //机器类型标识
				vmRtu: {
					rtuNumber: '', //机器编号
					rtuName: '', //机器名称
					rtuVersion: '', //设备版本
					date: new Date(), //生产日期
					rtuTypeId: '', //机器类型Id
					productionBatch: '', //生产批次
					belongOrgId: '', //所属商家-所属组织ID
					payId: '', //收款人-支付id
					shopType: '', //商店类型id-页面风格
					serviceTelePhone: '', //售后电话
					address: '', //机器地址
					expirationDate: new Date(), //过期时间
					maxBuyCount: '3', //最多购买数量

				},
				//addRtuRules: [],
				vmRtuRule: {
					rtuNumber: [{
						required: true,
						//type:'number',
						message: '机器编号不能为空',
						trigger: 'blur'
					}],
					rtuName: [{
						required: true,
						//message: '机器名称不能为空',
						validator: validateRtuName,
						trigger: 'blur'
					}],
					rtuTypeId: [{
						required: true,
						type: 'number',
						message: '机器类型不能为空',
						trigger: 'change'
					}],
					rtuVersion: [{
						required: true,
						//type:'number',
						message: '设备版本不能为空',
						trigger: 'blur'
					}],
					date: [{
						required: true,
						type: 'date',
						message: '请选择出产日期',
						trigger: 'change'
					}],
					belongOrgId: [{
						required: true,
						type: 'number',
						message: '请选择用户所属组织商家',
						trigger: 'change'
					}],
					productionBatch: [{
						required: true,
						//type:'number',
						message: '生产批次不能为空',
						trigger: 'blur'
					}],
					shopType: [{
						required: true,
						type: 'number',
						message: '请选择页面风格',
						trigger: 'change'
					}],
					payId: [{
						required: true,
						//type:'number',
						message: '请选择收款人',
						trigger: 'change'
					}],
					maxBuyCount: [{
						required: true,
						//type: 'number',
						message: '该列不能为空',
						trigger: 'blur'
					}],
					serviceTelePhone: [{
						required: true,
						validator: validateTel,
						trigger: 'blur'
					}],
					
				}

			}
		},
		// watch: {
		// 	rtuNumber(val) {
		// 		this.getRtuInfo()
		// 	}
		// },
		methods: {
			openShopTypeList(val){
				if(val){
					getVMOrgShopTypeList(this.userBelongOrgId).then(res => {
						const data = res.data
						if (data.success == 1) {
							this.shopTypeList = data.shopTypeList
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				}
			},
			openRtuTypeList(val){
				if(val){
					getAllRtuTypeList().then(res => {
							const data = res.data
							if (data.success == 1) {
								//console.log(data)
								this.rtuTypeList = data.rtuTypeList
							} else {
								this.$Message.error(data.errorMessage)
							}
						}).catch(error => {
							alert(error)
						})
				}
			},
			getRtuInfo() {
				if (this.rtuNumber != null && this.rtuNumber != '') {
					this.disEditor = true
					this.openShopTypeList(true)
					this.openRtuTypeList(true)
					getVMRtu(this.rtuNumber).then(res => {
						const data = res.data
						if (data.success == 1) {
							const vmRtu = data.vmRtu
							//console.log(vmRtu)
							if (vmRtu) {
								this.id = vmRtu.id
								this.vmRtu.rtuNumber = vmRtu.rtuNumber.toString()
								this.vmRtu.rtuName = vmRtu.rtuName
								this.vmRtu.belongOrgId = vmRtu.belongOrgId
								this.belongOrgName = vmRtu.orgName
								this.vmRtu.address = vmRtu.address
								this.vmRtu.shopType = vmRtu.shopType
								this.vmRtu.serviceTelePhone = vmRtu.serviceTelePhone
								this.vmRtu.maxBuyCount = vmRtu.maxBuyCount.toString()
								this.vmRtu.expirationDate = vmRtu.expirationDate
								this.vmRtu.payId = vmRtu.payId
								this.payeeName = vmRtu.payeeName
								this.rtuTypeTag = vmRtu.rtuTypeTag
								const rtuSerialNumber = vmRtu.rtuSerialNumber.split('-')
								this.vmRtu.rtuVersion = rtuSerialNumber[2]
								this.vmRtu.productionBatch = rtuSerialNumber[4]
								this.vmRtu.date = rtuSerialNumber[3]
								this.vmRtu.rtuTypeId = vmRtu.rtuTypeId
							}

						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				}

			},
			getPayIdInfo(row) {
				this.vmRtu.payId = row.merchantNo
				this.payeeName = row.payeeName
				this.showPayId = false

			},
			getBelongOrgInfo() {
				//alert(1)
				this.belongOrgTitle = this.belongOrgName
				this.showBelongOrg = true

			},
			showBelongOrgInfo(data) {
				//console.log(JSON.stringify(data))
				this.belongOrgInfo = data
				this.belongOrgTitle = data[0].orgName
				//this.belongOrgTitle = '当前选择: ' + val[0].orgName
			},
			belongOrgOk() {
				//const selectedNodes = this.$refs.belongOrgTree.getSelectedNodes();
				this.vmRtu.belongOrgId = this.belongOrgInfo[0].id
				this.belongOrgName = this.belongOrgInfo[0].orgName
				this.showBelongOrg = false
			},
			getRtuType(val) {
				this.rtuTypeList.map(item => {
					if (val == item.id) {
						this.rtuTypeTag = item.rtuTypeTag
					}
				})
				//alert(item)
				//this.vmRtu.rtuTypeId = val.id
				//this.rtuTypeTag = val.rtuTypeTag
			},
			chooseBelongUser(row) {

			},
			chooseCollectionUser(row) {

			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						var expirationDate = ''
						if(this.vmRtu.expirationDate != null && this.vmRtu.expirationDate != ''){
							 expirationDate = getNowFormatDate(this.vmRtu.expirationDate, '-')
						}
						
						const vmRtuModal = {
							'rtuNumber': parseInt(this.vmRtu.rtuNumber),
							'rtuName': this.vmRtu.rtuName,
							'rtuSerialNumber': 'l1' + '-' + this.rtuTypeTag + '-' + this.vmRtu.rtuVersion + '-' + getNowFormatDate(this.vmRtu.date, '') + '-' + this.vmRtu.productionBatch + '-' + this.vmRtu.rtuNumber,
							'rtuTypeId': parseInt(this.vmRtu.rtuTypeId),
							'belongOrgId': parseInt(this.vmRtu.belongOrgId),
							'maxBuyCount':parseInt(this.vmRtu.maxBuyCount),
							'shopType': parseInt(this.vmRtu.shopType),
							'serviceTelePhone': this.vmRtu.serviceTelePhone,
							'address': this.vmRtu.address,
							'payId': this.vmRtu.payId,
							'expirationDate': expirationDate
						}
						//console.log(vmRtuModal)
						this.showSpin = true
						if(this.id != null && this.id != ''){
							//console.log(this.id)
							vmRtuModal.id = this.id
							updateVMRtu(vmRtuModal).then(res => {
								const data = res.data
								this.showSpin = false
								if (data.success == 1) {
							
									this.$Message.success('修改成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})
						}else{
							addVMRtu(vmRtuModal).then(res => {
								const data = res.data
								this.showSpin = false
								if (data.success == 1) {
							
									this.$Message.success('添加成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})
						}
						
						//this.vmRtu.expirationDate = getNowFormatDate(this.vmRtu.expirationDate,'-')

					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			findBelongUser(value) {

			},
			findCollectionUser(value) {

			}

		},
		mounted() {
			//console.log(1)
			this.getRtuInfo()
		},
		created() {
		}

	}
</script>

<style>
</style>
