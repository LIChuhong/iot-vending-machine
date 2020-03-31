<template>
	
	<add-user v-if="showAddUser"></add-user>
	<m-add-user v-else></m-add-user>

</template>

<script>
	import mAddUser from '@/view/mVending-machine/m-user-management/m-add-user/m-add-user.vue'
	import AddUser from '@/view/vending-machine/user-management/add-user/add-user.vue'
	import data from '@/data/data'
	export default {
		name: 'c_add_user',
		components: {
			mAddUser,
			AddUser
		},
		data() {
			return {
				showAddUser: true
			}
		},
		created() {
			if (data.interface == 1 || data.interface == 2) {//判断显示手机端还是电脑端
				this.showAddUser = false
			}
			//console.log(this.showAddUser)
		}

	}
</script>

<style>
</style>
