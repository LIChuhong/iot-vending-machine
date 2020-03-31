<template>
	<div>
		<Form ref="jdPayInfo" :model="jdPayInfo" :rules="jdPayInfoRule" :label-width="100">
			<FormItem label="商户号" prop="merchantNo">
				<Input type="text" v-model="jdPayInfo.merchantNo" placeholder="请输入京东商户号">
				</Input>
			</FormItem>
			<FormItem label="SystemId" prop="systemId">
				<Input type="text" v-model="jdPayInfo.systemId" placeholder="请输入京东支付系统ID">
				</Input>
			</FormItem>
			<FormItem label="服务商商号" prop="agentNo">
				<Input type="number" v-model="jdPayInfo.agentNo" placeholder="请输入服务商商号">
				</Input>
			</FormItem>
			<FormItem label="DesKey" prop="desKey">
				<Input type="text" v-model="jdPayInfo.desKey" placeholder="请输入desKey秘钥">
				</Input>
			</FormItem>
			<FormItem label="SaltMd5Key" prop="saltMd5Key">
				<Input type="text" v-model="jdPayInfo.saltMd5Key" placeholder="请输入saltMd5Key秘钥">
				</Input>
			</FormItem>
			</FormItem>
			<FormItem label="登录邮箱" prop="eMail">
				<Input type="text" v-model="jdPayInfo.eMail" placeholder="请输入登录邮箱账号">
				</Input>
			</FormItem>
			<FormItem label="收款人" prop="payeeName">
				<Input type="text" v-model="jdPayInfo.payeeName" placeholder="请输入收款人姓名">
				</Input>
			</FormItem>
			<FormItem prop="belongOrgId" label="所属组织">
				<Input :disabled="belongOrgBtn" readonly v-model="belongOrgName" search enter-button="选择" placeholder="请选择所属组织" @on-search="getBelongOrgInfo"></Input>
			</FormItem>
			<FormItem>
				<Button @click="handleReset('jdPayInfo')" style="margin-right:0.625rem">重置</Button>
				<Button type="primary" @click="handleSubmit('jdPayInfo')">
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
				<org-tree v-if="showBelongOrg" @getBelongOrgInfo="showBelongOrgInfo"></org-tree>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="belongOrgOk">确定</Button>
			</div>

		</Modal>
		<Spin fix v-show="showSpin" class="show-spin-style">
			<Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
		</Spin>
	</div>
</template>

<script>
	import {
		addJDPayinfo,
		getJDPayInfo,
		updateJDPayInfo
	} from '@/api/pay'
	import OrgTree from '@/view/mVending-machine/components/org-tree.vue'
	export default {
		name: 'pay_form',
		props: ['merchantNo'],
		components: {
			OrgTree
		},
		data() {
			const validateMerchantNo = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('商户号不能为空'));
				} else if (!value.replace(/[^\w\.\/]/ig, '')) {
					return callback(new Error('不能输入汉字'));
				} else if (value.length >= 33) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validateSystemId = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('SystemId不能为空'));
				} else if (!value.replace(/[^\w\.\/]/ig, '')) {
					return callback(new Error('不能输入汉字'));
				} else if (value.length >= 33) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validateKey = (rule, value, callback) => {
				if (!value) {
					callback();
				} else if (!value.replace(/[^\w\.\/]/ig, '')) {
					return callback(new Error('不能输入汉字'));
				} else if (value.length >= 255) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validateEMail = (rule, value, callback) => {
				var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('邮箱不能为空'));
				} else if (!reg.test(value)) {
					return callback(new Error('邮箱验证不通过'));
				} else if (value.length >= 255) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validatePayeeName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('收款人不能为空'));
				} else if (value.length >= 11) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};

			return {
				belongOrgBtn:false,
				showSpin: false,
				belongOrgTitle: '',
				showBelongOrg: false,
				belongOrgName: '',
				belongOrgInfo: '',
				jdPayInfo: {
					merchantNo: '',
					systemId: '',
					agentNo: '',
					desKey: '',
					saltMd5Key: '',
					eMail: '',
					payeeName: '',
					belongOrgId: null
				},
				jdPayInfoRule: {
					merchantNo: [{
						required: true,
						validator: validateMerchantNo,
						trigger: 'blur'
					}],
					systemId: [{
						required: true,
						validator: validateSystemId,
						trigger: 'blur'
					}],
					desKey: [{
						required: false,
						validator: validateKey,
						trigger: 'blur'
					}],
					saltMd5Key: [{
						required: false,
						validator: validateKey,
						trigger: 'blur'
					}],
					eMail: [{
						required: true,
						validator: validateEMail,
						trigger: 'blur'
					}],
					payeeName: [{
						required: true,
						validator: validatePayeeName,
						trigger: 'blur'
					}],
					belongOrgId: [{
						required: true,
						type: 'number',
						message: '请选择用户所属组织',
						trigger: 'change'
					}],


				}

			}
		},
		watch: {
			merchantNo(val) {
				this.getPayInfo()
			}
		},
		methods: {
			getPayInfo() {
				if (this.merchantNo) {
					this.belongOrgBtn = true
					this.showSpin = true
					getJDPayInfo(this.merchantNo).then(res => {
						const data = res.data
						this.showSpin = false
						if (data.success == 1) {
							//console.log(data)
							this.jdPayInfo = data.jdPayInfo
							this.belongOrgName = data.jdPayInfo.orgName
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						this.showSpin = false
						alert(error)
					})
				}

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
				this.jdPayInfo.belongOrgId = this.belongOrgInfo[0].id
				this.belongOrgName = this.belongOrgInfo[0].orgName
				this.showBelongOrg = false
			},
			handleReset(name) {
				this.belongOrgName = ''
				this.$refs[name].resetFields();
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						//console.log(this.jdPayInfo)
						this.showSpin = true
						if (this.jdPayInfo.id) {
							updateJDPayInfo(this.jdPayInfo).then(res => {
								const data = res.data
								this.showSpin = false
								if (data.success == 1) {
									this.$Message.success('修改成功');
								} else {
									this.$Message.error(data.errorMessage);
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})

						} else {
							addJDPayinfo(this.jdPayInfo).then(res => {
								const data = res.data
								this.showSpin = false
								if (data.success == 1) {
									this.$Message.success('添加成功');
								} else {
									this.$Message.error(data.errorMessage);
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})
						}
					} else {
						this.$Message.error('Fail!');
					}
				})
			},

		}

	}
</script>

<style>
</style>
