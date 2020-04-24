<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input search enter-button placeholder="请输入用户名关键字" @on-search="findCompanyList" style="width: 200px;float: left;" />
		</div>
		<Table size="small" border :columns="companyColumns" :data="companyList">
			<template slot-scope="{ row, index }" slot="companyLogo">
				<img src="../../../../assets/images/雪碧.png" width="50px" />
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="companyEditor(row)" style="margin-right: 8px;">编辑</Button>
				<Button type="error" icon="md-trash" size="small" @click="companyDel(row)">删除</Button>
			</template>
		</Table>
		<Modal v-model="showCompanyEditor" title="编辑公司信息" footer-hide>
			<company-form>修改</company-form>
		</Modal>
	</div>
</template>

<script>
	import {
		companyColumns
	} from '@/data/columns.js'
	import companyForm from '../components/company-form.vue'
	export default {
		name: 'company_list',
		components: {
			companyForm
		},
		data() {
			return {
				companyColumns: companyColumns,
				companyList: [{}],
				showCompanyEditor:false
			}
		},
		methods: {
			findCompanyList() {
	
			},
			companyEditor(row) {
				this.showCompanyEditor = true
	
			},
			companyDel(row) {
	
			}
	
		},
		created() {
			this.$route.meta.keepAlive = true
			
		},
	}
</script>

<style>
</style>
