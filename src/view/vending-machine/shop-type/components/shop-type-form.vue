<template>
	<div>
		<Form ref="shopType" :model="shopType" :rules="shopTypeRules" label-position="left" :label-width="80">
			<FormItem prop="shopTypeName" label="类型名称">
				<Input type="text" v-model="shopType.shopTypeName" placeholder="请输入商店类型名称">
				</Input>
			</FormItem>
			<FormItem prop="pageName" label="页面名称">
				<Input type="text" v-model="shopType.pageName" placeholder="请输入页面名称">
				</Input>
			</FormItem>
			<FormItem prop="belongOrgId" label="所属组织">
				<Input :disabled="belongOrgBtn" readonly v-model="belongOrgName" search enter-button="选择" placeholder="请选择所属组织" @on-search="getBelongOrgInfo"></Input>
			</FormItem>

			<FormItem>
				<Button @click="handleReset('shopType')" style="margin-right:0.625rem">重置</Button>
				<Button type="primary" @click="handleSubmit('shopType')">
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
				<org-tree v-if="showBelongOrg" @getBelongOrgInfo = "showBelongOrgInfo"></org-tree>
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
	import { addShopType,getShopType,updateShopType } from '@/api/shop'
	import OrgTree from '@/view/mVending-machine/components/org-tree.vue'
	export default {
		components:{
			OrgTree
		},
		name:'shop_type_form',
		props:['shopTypeId'],
		data() {
			const validateShopTypeName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('商店类型名称不能为空'));
				} else if (value.length >= 30) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			const validatePageName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('页面名称不能为空'));
				} else if (value.length >= 50) {
					return callback(new Error('输入字符过长'));
				} else {
					callback();
				}
			};
			return {
				belongOrgBtn:false,
				showSpin:false,
				belongOrgTitle:'',
				showBelongOrg:false,
				belongOrgName:'',
				belongOrgInfo:'',
				shopType: {
					shopTypeName: '',
					pageName: '',
					belongOrgId: null
				},
				shopTypeRules: {
					shopTypeName: [{
						required: true,
						//message: '用户名不能为空',
						validator: validateShopTypeName,
						trigger: 'blur'
					}],
					pageName: [{
						required: true,
						//message: '用户名不能为空',
						validator: validatePageName,
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
		methods:{
			getShopTypeInfo(){
				if(this.shopTypeId){
					this.belongOrgBtn = true
					this.showSpin = true
					getShopType(this.shopTypeId).then(res=>{
						const data = res.data
						this.showSpin = false
						if(data.success == 1){
							//console.log(data)
							this.shopType.shopTypeName = data.shopType.shopTypeName
							this.shopType.pageName = data.shopType.pageName
							this.shopType.belongOrgId = data.shopType.belongOrgId
							this.belongOrgName = data.shopType.orgName
							
						}else{
							this.$Message.error(data.errorMessage)
						}
					}).catch(error=>{
						this.showSpin = false
						alert(error)
					})
				}
			},
			getBelongOrgInfo(){
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
			belongOrgOk(){
				//const selectedNodes = this.$refs.belongOrgTree.getSelectedNodes();
				this.shopType.belongOrgId = this.belongOrgInfo[0].id
				this.belongOrgName = this.belongOrgInfo[0].orgName
				this.showBelongOrg = false
			},
			handleReset (name) {
				this.belongOrgName = ''
			    this.$refs[name].resetFields();
			},
			 handleSubmit (name) {
			    this.$refs[name].validate((valid) => {
			        if (valid) {
						this.showSpin = true
						if(this.shopTypeId){
							const updateShopTypeData = this.shopType
							updateShopTypeData.id = this.shopTypeId
							updateShopType(updateShopTypeData).then(res=>{
								const data = res.data
								this.showSpin = false
								if(data.success == 1){
									this.$Message.success('修改成功');
								}else{
									this.$Message.error(data.errorMessage);
								}
							}).catch(error=>{
								this.showSpin = false
								alert(error)
							})
						}else{
							addShopType(this.shopType).then(res=>{
								const data = res.data
								this.showSpin = false
								if(data.success == 1){
									this.$Message.success('添加成功');
								}else{
									this.$Message.error(data.errorMessage);
								}
							}).catch(error=>{
								this.showSpin = false
								alert(error)
							})
						}
						
			        } else {
			            this.$Message.error('Fail!');
			        }
			    })
			},
			
		},
		watch:{
			shopTypeId(val){
				this.getShopTypeInfo()
			}
		}
		
	}
</script>

<style>
</style>
