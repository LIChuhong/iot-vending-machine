<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input search enter-button placeholder="请输入用户名关键字" @on-search="findUserList" style="width: 200px;float: left;" />
		</div>
		<Table size="small" border :columns="userColumns" :data="userList">
			<template slot-scope="{ row, index }" slot="userLogo">
				<img src="../../../../assets/images/雪碧.png" width="50px" />
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="userEditor(row)" style="margin-right: 8px;">编辑</Button>
				<Button type="error" icon="md-trash" size="small" @click="userDel(row)">删除</Button>
			</template>
		</Table>
		<Modal v-model="showUserEditor" title="编辑用户信息" footer-hide>
			<user-form>修改</user-form>
		</Modal>
	</div>
</template>

<script>
	import {
		userColumns
	} from '@/data/columns.js'
	import userForm from '../components/user-form.vue'
	export default {
		name: 'user_list',
		components: {
			userForm
		},
		data() {
			return {
				userColumns: userColumns,
				userList: [{}],
				showUserEditor:false
			}
		},
		methods: {
			findUserList() {

			},
			userEditor(row) {
				this.showUserEditor = true

			},
			userDel(row) {

			}

		},
	}
</script>

<style>
</style>
