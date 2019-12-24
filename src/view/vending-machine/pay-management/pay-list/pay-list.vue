<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input search enter-button placeholder="请输入名称关键字" @on-search="findPayList" style="width: 200px;float: left;" />
		</div>
		<Table size="small" border :columns="payColumns" :data="payList">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="payEditor(row)" style="margin-right: 8px;">编辑</Button>
				<Button type="error" icon="md-trash" size="small" @click="payDel(row)">删除</Button>
			</template>
		</Table>
		<Modal v-model="showPayEditor" title="编辑用户信息" footer-hide>
			<pay-form>修改</pay-form>
		</Modal>
	</div>
</template>

<script>
	import {
		payColumns
	} from '@/data/columns.js'
	import payForm from '../components/pay-form.vue'
	export default {
		name: 'pay_list',
		components: {
			payForm
		},
		data() {
			return {
				payColumns: payColumns,
				payList: [{}],
				showPayEditor:false
			}
		},
		methods: {
			findPayList() {

			},
			payEditor(row) {
				this.showPayEditor = true

			},
			payDel(row) {
				
			}

		},
	}
</script>

<style>
</style>
