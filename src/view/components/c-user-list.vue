<template>
	<user-list v-if="showUserList"></user-list>
	<m-user-list v-else></m-user-list>
</template>

<script>
	import mUserList from '@/view/mVending-machine/m-user-management/m-user-list/m-user-list.vue'
	import UserList from '@/view/vending-machine/user-management/user-list/user-list.vue'
	import data from '@/data/data'
	export default {
		name: 'c_user_list',
		components: {
			mUserList,
			UserList
		},
		data() {
			return {
				showUserList: true
			}
		},
		created() {
			if (data.interface == 1 || data.interface == 2) {//判断显示手机端还是电脑端
				this.showUserList = false
			}
			//console.log(this.showAddUser)
		}
	
	}
</script>

<style>
</style>
