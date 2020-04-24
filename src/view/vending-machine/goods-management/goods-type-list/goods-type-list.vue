<template>
	<div>
		<Table :loading="tableLoading" border :columns="goodsTypeListColumns" :data="goodsTypeListData" size="small">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="goodsTypeEditor(row)">编辑</Button>
			</template>
		</Table>
		<Modal v-model="showGoodsTypeEditor" title="编辑商品类型名称" footer-hide>
			<goods-type-form :goods-type-info="goodsTypeInfo">修改</goods-type-form>
		</Modal>
	</div>
</template>

<script>
	import {
		getCommodityTypeList
	} from '@/api/commodity'
	import {
		goodsTypeListColumns
	} from '@/data/columns1'
	import GoodsTypeForm from '../components/goods-type-form.vue'
	export default {
		name: 'gooods_type_list',
		components: {
			GoodsTypeForm
		},
		data() {
			return {
				tableLoading: false,
				showGoodsTypeEditor: false,
				goodsTypeListColumns: goodsTypeListColumns,
				goodsTypeListData: [],
				goodsTypeInfo: ''
			}
		},

		methods: {
			getGoodsTypeList() {
				this.tableLoading = true
				getCommodityTypeList().then(res => {
					this.tableLoading = false
					const data = res.data
					if (data.success == 1) {
						this.goodsTypeListData = data.commodityTypeList
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.tableLoading = false
					alert(error)
				})
			},
			goodsTypeEditor(row) {
				this.goodsTypeInfo = row
				this.showGoodsTypeEditor = true
			}
		},

		created() {
			this.$route.meta.keepAlive = true
			this.getGoodsTypeList()
		},
		// activated(){
		// 	this.getGoodsTypeList()
		// }
	}
</script>

<style>
</style>
