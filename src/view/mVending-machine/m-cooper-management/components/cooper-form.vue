<template>
	<div>
		<!-- {{orgId}} -->
		<Form ref="vmOrg" :model="vmOrg" :rules="vmOrgRules" label-position="left" :label-width="80">
			<FormItem prop="orgName" label="组织名称">
				<Input type="text" v-model="vmOrg.orgName" placeholder="请输入组织名称">
				</Input>
			</FormItem>
			<FormItem prop="orgTypeId" label="组织类型">
				<RadioGroup v-model="vmOrg.orgTypeId">
					<Radio :disabled="disParentOrgId" v-for="item in orgTypeList" :key="item.id" :label="item.id">{{item.orgTypeName}}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem prop="parentOrgId" label="所属组织">
				<!-- {{belongOrgName}} -->
				<Input :disabled="disParentOrgId" readonly v-model="belongOrgName" search enter-button="选择" placeholder="请选择所属组织"
				 @on-search="showBelongOrgList"></Input>
				<!-- <Button :disabled="disParentOrgId" style="float: right;" type="primary" @click="showBelongOrgList" shape="circle">选择</Button> -->
			</FormItem>
			<FormItem prop="seviceTelephone" label="售后电话">
				<Input type="text" v-model="vmOrg.seviceTelephone" placeholder="请输入售后电话">
				</Input>
			</FormItem>
			<FormItem prop="affiliateHotline" label="加盟热线">
				<Input type="text" v-model="vmOrg.affiliateHotline" placeholder="请输入加盟热线">
				</Input>
			</FormItem>
			<FormItem prop="brandName" label="品牌名称">
				<Input type="text" v-model="vmOrg.brandName" placeholder="请输入品牌名称">
				</Input>
			</FormItem>
			<FormItem prop="orgDesc" label="组织描述">
				<Input v-model="vmOrg.orgDesc" type="textarea" :maxlength="500" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述一下组织更好喔(若不描述请填写:无)"></Input>
			</FormItem>
			<FormItem>
				<Button @click="handleReset('vmOrg')" style="margin-right:0.625rem">重置</Button>
				<Button type="primary" @click="handleSubmit('vmOrg')">
					<slot></slot>
				</Button>
			</FormItem>
		</Form>
		<Modal :title="'当前选择:'+ belongOrgTitle" v-model="showBelongOrg">
			<div slot="close" style="float: left;">
				<Icon size="30" type="ios-arrow-forward" color="rgb(81,90,110)"></Icon>
				<!-- //<span>Delete confirmation</span> -->
			</div>
			<div class="tree-style">
				<org-tree v-if="showBelongOrg" @getBelongOrgInfo="showBelongOrgInfo" :orgTypeId="vmOrg.orgTypeId"></org-tree>
			</div>
			<div slot="footer">

				<Button type="primary" size="large" @click="belongOrgOk">确定</Button>
			</div>
			<!-- <Spin fix v-show="showSpin" class="show-spin-style">
		<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
		<div>加载中</div>
	</Spin> -->
		</Modal>
		<Spin fix v-show="showSpin">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>更新中...</div>
		</Spin>
	</div>
</template>

<script>
	import {
		addVMOrg,
		getAllOrgTypeList,
		getVMOrg,
		updateVMOrg
	} from '@/api/org'
	import OrgTree from '@/view/mVending-machine/components/org-tree.vue'
	export default {
		name: 'cooper_form',
		components: {
			OrgTree
		},
		props: ['orgId'],
		data() {
			const validateOrgName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('组织名称不能为空'));
				} else if (value.length >= 100) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validateBrandName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('品牌名称不能为空'));
				} else if (value.length >= 20) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validateTel = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('该列不能为空'));
				} else if (!value.replace(/[^\w\.\/]/ig, '')) {
					return callback(new Error('不能输入汉字'));
				} else if (value.length >= 12) {
					return callback(new Error('请输入正确号码'));
				} else {
					callback();
				}
			};
			const validateParentOrgId = (rule, value, callback) => {
				if (value == null) {
					return callback(new Error('该列不能为空'));
				} else {
					callback();
				}
			};
			return {
				disParentOrgId: false, //禁用组织选项，默认false
				showSpin: false,
				belongOrgTitle: '', //modal标题
				showBelongOrg: false,
				belongOrgName: '', //所属组织名称
				belongOrgInfo: '', //所属组织信息
				orgTypeList: [], //组织类型列表
				vmOrg: {
					orgName: '', //组织名
					orgTypeId: null, //组织类型id
					parentOrgId: '', //所属组织ID
					seviceTelephone: '', //售后电话
					affiliateHotline: '', //加盟热线
					brandName: '', //品牌名称
					orgDesc: '', //组织描述
					orgLogoUrl: '/uploadFile/defaultImages/orgLogo.png' //默认组织Logo
				},
				vmOrgRules: {
					orgName: [{
						required: true,
						validator: validateOrgName,
						trigger: 'blur'
					}],
					seviceTelephone: [{
						required: true,
						validator: validateTel,
						trigger: 'blur'
					}],
					affiliateHotline: [{
						required: true,
						validator: validateTel,
						trigger: 'blur'
					}],
					brandName: [{
						required: true,
						validator: validateBrandName,
						trigger: 'blur'
					}],
					orgTypeId: [{
						required: true,
						type: 'number',
						message: '请选择组织类型',
						trigger: 'change'
					}],
					orgDesc: [{
						required: true,
						message: '该列不能为空',
						trigger: 'blur'
					}],
					parentOrgId: [{
						required: true,
						validator: validateParentOrgId,
						trigger: 'change'
					}],

				}
			}
		},
		watch: {
			orgId(val) { //监听组织ID
				this.getVMOrgInfo()

			}
		},
		methods: {
			getVMOrgInfo() { //获取组织信息
				if (this.orgId != null && this.orgId != '') {
					this.disParentOrgId = true
					getVMOrg(this.orgId).then(res => {
						const data = res.data
						if (data.success == 1) {
							//console.log(data)
							//this.vmOrg.seviceTelephone = data.vmOrg.seviceTelephone
							this.vmOrg.orgName = data.vmOrg.orgName
							this.vmOrg.orgTypeId = data.vmOrg.orgTypeId
							this.vmOrg.parentOrgId = data.vmOrg.parentOrgId
							this.vmOrg.seviceTelephone = data.vmOrg.seviceTelephone
							this.vmOrg.affiliateHotline = data.vmOrg.affiliateHotline
							this.vmOrg.brandName = data.vmOrg.brandName
							this.vmOrg.orgDesc = data.vmOrg.orgDesc
							this.vmOrg.orgLogoUrl = data.vmOrg.orgLogoUrl
							this.belongOrgName = data.vmOrg.parentOrgName
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				}
			},
			handleReset(name) { //重置表单
				this.belongOrgName = ''
				this.$refs[name].resetFields();
			},

			handleSubmit(name) { //提交表单
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.showSpin = true
						if (this.orgId) {
							const updateOrg = this.vmOrg
							updateOrg.id = this.orgId
							//console.log(updateOrg)
							updateVMOrg(updateOrg).then(res => {
								const data = res.data
								this.showSpin = false
								if (data.success == 1) {
									if (data.success == 1) {
										this.$Message.success('更新成功')
									} else {
										this.$Message.error(data.errorMessage)
									}
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})

						} else {
							addVMOrg(this.vmOrg).then(res => {
								this.showSpin = false
								const data = res.data
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

					} else {
						//this.$Message.error('Fail!');
					}
				})
			},

			showBelongOrgList() { //显示所属组织列表
				this.belongOrgTitle = this.belongOrgName
				this.showBelongOrg = true

			},
			showBelongOrgInfo(data) { //显示所选所属组织信息
				//console.log(JSON.stringify(data))
				this.belongOrgInfo = data
				this.belongOrgTitle = data[0].orgName
				//this.belongOrgTitle = '当前选择: ' + val[0].orgName
			},
			belongOrgOk() { //确定所属组织
				//const selectedNodes = this.$refs.belongOrgTree.getSelectedNodes();
				this.vmOrg.parentOrgId = this.belongOrgInfo[0].orgId
				this.belongOrgName = this.belongOrgInfo[0].orgName
				this.showBelongOrg = false
			},
		},
		created() {
			getAllOrgTypeList().then(res => { //获取组织类型列表
				const data = res.data
				if (data.success == 1) {
					this.orgTypeList = data.orgTypeList
					if(this.orgTypeList.length>0){
						this.vmOrg.orgTypeId = this.orgTypeList[0].id
					}
				} else {
					this.$Message.error(data.errorMessage)
				}

			}).catch(error => {
				alert(error)

			})
		}
	}
</script>

<style>
</style>
