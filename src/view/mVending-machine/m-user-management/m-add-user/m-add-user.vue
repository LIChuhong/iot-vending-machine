<template>
	<div style="width: 90%;margin: 0.625rem auto 0;">
		<Form ref="vmUser" :model="vmUser" :rules="userRule" :label-width="90" :label-colon="true">
			<FormItem label="用户名" prop="userName">
				<Input type="text" v-model="vmUser.userName" placeholder="请输入用户名">
				</Input>
			</FormItem>
			<FormItem label="密码" prop="password">
				<Input type="password" v-model="vmUser.password" placeholder="请输入密码">
				</Input>
			</FormItem>
			<FormItem label="确认密码" prop="againPwd">
				<Input type="password" v-model="vmUser.againPwd" placeholder="请再次输入密码">
				</Input>
			</FormItem>
			<FormItem label="用户角色" prop="userRolesId">
				<RadioGroup v-model="vmUser.userRolesId">
					<Radio v-for="item in userRolesList" :key="item.id" :label="item.id">{{item.userRolesName}}</Radio>
				</RadioGroup>
			</FormItem>

			<FormItem label="真实姓名" prop="realName">
				<Input type="text" v-model="vmUser.realName" placeholder="请输入真实姓名">
				</Input>
			</FormItem>

			<FormItem label="所属组织" prop="belongOrgId">
				<Input readonly v-model="belongOrgName" search enter-button="选择" placeholder="请选择所属组织" @on-search="showBelongOrgList"></Input>
				<!-- <Button style="float: right;" type="primary" @click="showBelongOrgList" shape="circle">选择</Button> -->
				
			</FormItem>
			<FormItem style="text-align: left;">
				<Button @click="handleReset('vmUser')" style="margin-right:0.625rem">重置</Button>
				<Button type="primary" @click="handleSubmit('vmUser')">
					添加
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
			<!-- <Spin fix v-show="showSpin" class="show-spin-style">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>加载中</div>
		</Spin> -->
		</Modal>
	</div>
</template>

<script>
	import {
		getUserRolesList,
		addVMUser,
	} from '@/api/user.js'
	import OrgTree from '@/view/mVending-machine/components/org-tree.vue'
	export default {
		name: 'm_add_user',
		components: {
			OrgTree
		},
		data() {
			const validateUserName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('用户名称不能为空'));
				} else if (value.length >= 100) {
					return callback(new Error('输入字符过长'));

				} else {
					callback();
				}
			};
			const validateRealName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('请填写真实姓名'));
				} else if (value.length >= 20) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validatePassword = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('密码不能为空'));
				} else if (value.length < 6 || value.length > 18) {
					return callback(new Error('密码不能少于6个字符或大于18个字符'));
				} else {
					callback();
				}
			};
			const validateAgainPwd = (rule, value, callback) => {
				if (!value) {
					return callback('请再次确认密码');
				} else if (value != this.vmUser.password) {
					callback('两次密码不匹配，请重新输入');
				} else {
					callback();
				}
			};
			return {
				vmUser: {
					userName: '',
					password: '',
					againPwd: '',
					userRolesId: null,
					realName: '',
					belongOrgId: null,
					userHeadImgUrl: '/uploadFile/defaultImages/userHead.png'
				},
				userRule: {
					userName: [{
						required: true,
						//message: '用户名不能为空',
						validator: validateUserName,
						trigger: 'blur'
					}],
					realName: [{
						required: true,
						validator: validateRealName,
						//message: '请填写真实姓名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						type: 'password',
						//message: '密码不能为空',
						validator: validatePassword,
						trigger: 'blur'
					}],
					againPwd: [{
						required: true,
						type: 'password',
						validator: validateAgainPwd,
						trigger: 'blur'
					}],
					userRolesId: [{
						required: true,
						type: 'number',
						message: '请选择用户角色',
						trigger: 'change'
					}],
					belongOrgId: [{
						required: true,
						type: 'number',
						message: '请选择用户所属组织',
						trigger: 'change'
					}],
				},
				userRolesList: [],
				belongOrgTitle: '',
				showBelongOrg: false,
				belongOrgName: '',
				belongOrgInfo: ''

			}
		},
		methods: {
			showBelongOrgList() {
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
				this.vmUser.belongOrgId = this.belongOrgInfo[0].id
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
						//this.$Message.success('Success!');
						const vmUserModal = this.vmUser
						delete vmUserModal.againPwd
						addVMUser(vmUserModal).then(res => {
							const data = res.data
							if (data.success == 1) {
								this.$Message.success('添加成功');
								//alert(JSON.stringify(data))
								//this.userRolesList = data.userRolesList
							} else {
								this.$Message.error(data.Message);
							}
						}).catch(error => {
							alert(error)
						})

						//console.log(this.vmUser)
					} else {
						this.$Message.error('Fail!');
					}
				})
			},

		},
		created() {
			getUserRolesList().then(res => {
				const data = res.data
				if (data.success == 1) {
					//alert(JSON.stringify(data))
					this.userRolesList = data.userRolesList
				} else {
					this.$Message.error(data.Message);
				}

			}).catch(error => {
				alert(error)
			})

		},
		mounted() {
			//console.log(this.userId)

		},
	


	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		/* .tree-style{
			padding:0.875rem 1rem 
		}
		
		.tree-style .ivu-tree ul li {
			font-size: 1rem;
			padding-left: 1rem;
			
		}
		
		.tree-style .ivu-tree-arrow .ivu-icon {
			font-size: 1.875rem;
			padding-right: 0.625rem;
			
		}
		
		.tree-style .ivu-tree-title {
			margin-left:1rem;
			margin-top: 0.3rem;
			
		} */
	}
</style>
