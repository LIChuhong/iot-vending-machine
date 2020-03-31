<template>
	<div>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Input search enter-button placeholder="请输入组织名称关键字" @on-search="findOrgList" style="width: 60%;float: left;" />
		</div>
		<Table border :columns="coopListColumns" :data="coopListData" size="small" class="mCooperListTableStyle">

			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="orgEditor(row)" style="margin-right:0.3125rem"></Button>
				<i-switch :disabled="row.disabled" :loading="row.switchLoading" v-model="row.isEnable" @on-change="changeSwitch(row)" />
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		</div>
		<Modal v-model="showOrgEditor" title="编辑组织信息" footer-hide :styles="{top: '3.125rem'}">
			<cooper-form :org-id="orgId">修改</cooper-form>
		</Modal>
	</div>
</template>

<script>
	import {
		coopListColumns
	} from '@/data/columns'
	import {
		getVMOrgList,
		isEnableVMOrg
	} from '@/api/org'
	import CooperForm from '../components/cooper-form.vue'
	export default {
		components: {
			CooperForm
		},
		data() {
			return {
				orgName: '',//组织名称
				pageSize: 10,
				maxId: 0,
				coopListColumns: coopListColumns,
				coopListData: [],//页面合作列表
				showOrgEditor: false,
				orgId: null,//组织ID
				prevId:[0]
			}
		},
		methods: {
			findOrgList(orgName){//查找组织
				this.orgName = orgName
				this.maxId = 0
				this.prevId = [0]
				this.getOrgList()
				
			},
			changeSwitch(row) {//启禁用组织
				row.switchLoading = true
				isEnableVMOrg(row.id, row.isEnable).then(res => {
					const data = res.data
					row.switchLoading = false
					if (data.success == 1) {
						if (row.isEnable) {
							this.$Message.success('组织启用成功')
						} else {
							this.$Message.success('组织禁用成功')
						}
					} else {
						row.isEnable = !row.isEnable
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					row.switchLoading = false
					row.isEnable = !row.isEnable
					alert(error)
				})

			},
			orgEditor(row) {//编辑组织
				this.orgId = row.id
				this.showOrgEditor = true
			},
			nextPage() {
				if (this.coopListData.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					//console.log(this.maxId)
					this.prevId.push(this.maxId)
					//console.log(this.prevId)
					this.getOrgList()
					//console.log(this.maxId)
				}
			
			},
			prevPage() {
				if(this.prevId.length>1){
					this.prevId.pop()
					this.maxId = this.prevId[this.prevId.length-1]
						this.getOrgList()
				}else{
					this.$Message.warning('这是第一页');
				}
				
			},
			getOrgList() {//获取组织列表
				getVMOrgList(this.orgName, this.maxId, this.pageSize).then(res => {
					const data = res.data
					//console.log(data)
					if (data.success == 1) {
						data.vmOrgList.map(item=>{
							if(this.maxId < item.id){
								this.maxId = item.id
							}
							if(item.orgId == "0"){
								item.disabled = true
							}else{
								item.disabled = false
							}
							item.switchLoading = false
						})
						this.coopListData = data.vmOrgList
						//console.log(this.maxId)
					} else {
						this.$Message.error(data.errorMessage)
					}

				}).catch(error => {
					alert(error)
				})
			}
		},
		created() {
			this.getOrgList()
		}
	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.mCooperListTableStyle .ivu-table-cell {
			padding: 0;
		}
	}
</style>
