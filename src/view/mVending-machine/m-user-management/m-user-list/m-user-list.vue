<template>
	<div>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Input search enter-button placeholder="请输入用户名关键字" @on-search="findUserList" style="width: 60%;float: left;" />
		</div>

		<Table size="small" border :columns="userColumns" :data="userList" :loading="userTableLoading">

			<template slot-scope="{ row, index }" slot="action">
				<Button  type="primary" size="small" icon="md-create" @click="userEditor(row)" style="margin-right:0.3125rem"></Button>
				<Button type="success" icon="md-key" size="small" @click="resetPassword(row)"></Button>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>

		</div>
		<Modal v-model="showUserEditor" title="编辑用户信息" footer-hide>
			<user-form :user-id="userId">修改</user-form>
		</Modal>
		<Modal title='修改密码' v-model="showPwd" footer-hide>
			<reset-pwd v-if="showPwd" :vmUserId ="vmUserId"></reset-pwd>
		</Modal>
	</div>
</template>

<script>
	import {
		getVMUserList
	} from '@/api/user'
	import {
		mUserColumns
	} from '@/data/columns'
	import UserForm from '../components/user-form.vue'
	import ResetPwd from '../components/reset-pwd.vue'
	export default {
		name: 'm_user_list',
		components: {
			UserForm,
			ResetPwd
			
		},
		data() {
			return {
				vmUserId:null,
				showPwd:false,
				userId:null,
				userTableLoading:false,
				userColumns: mUserColumns,
				userList: [],
				showUserEditor: false,
				searchKey: '',
				maxId: 0,
				pageSize: 10,
				prevId: [0]
			}
		},
		methods: {
			findUserList(searchKey){
				this.searchKey = searchKey
				this.maxId = 0
				this.prevId = [0]
				this.getUserList()
				
			},
			getUserList() {
				this.userTableLoading = true
				getVMUserList(this.searchKey, this.maxId, this.pageSize).then(res => {
					this.userTableLoading = false
					const data = res.data
					if (data.success == 1) {
						
						this.userList = data.userList.map(item=>{
							if (this.maxId < item.id) {
								this.maxId = item.id
							}
							return item
						})
						
						//this.userList = data.userList
					} else {
						this.$Message.error(data.Message);
					}
				}).catch(error => {
					this.userTableLoading = false
					alert(error)
				})

			},
			nextPage() {
				if (this.userList.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					//console.log(this.maxId)
					this.prevId.push(this.maxId)
					//console.log(this.prevId)
					this.getUserList()
					//console.log(this.maxId)
				}

			},
			prevPage() {
				if(this.prevId.length>1){
					this.prevId.pop()
					this.maxId = this.prevId[this.prevId.length-1]
						this.getUserList()
				}else{
					this.$Message.warning('这是第一页');
				}
				
			},
			userEditor(row) {
				this.userId = row.id
				//alert(this.userId)
				this.showUserEditor = true

			},
			resetPassword(item) {
					this.vmUserId = item.id
					this.showPwd = true
				
			}

		},
		created() {
			this.getUserList()
		}
	}
</script>

<style>
</style>
