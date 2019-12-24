<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input search enter-button placeholder="请输入名称关键字" @on-search="findGoodsList" style="width: 200px;float: left;" />
		</div>
		<Table size="small" border :columns="goodsColumns" :data="goodsList">
			<template slot-scope="{ row, index }" slot="goodsImg">
				<img src="../../../../assets/images/雪碧.png" width="90%" />
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="goodsEditor(row)">编辑</Button>
			</template>
		</Table>
		<Modal v-model="showGoodsEditor" title="编辑商品" footer-hide>
			<goods-form>修改</goods-form>
		</Modal>
	</div>
</template>

<script>
	import goodsForm from '../components/goods-form.vue'
	import {
		goodsColumns
	} from '@/data/columns.js'
	export default {
		name: 'goods_list',
		components: {
			goodsForm
		},
		data() {
			return {
				showGoodsEditor:false,
				goodsColumns: goodsColumns,
				goodsList: [{}]

			}
		},
		methods: {
			findGoodsList() {

			},
			goodsEditor(row) {
				this.showGoodsEditor = true

			}

		},

	}
</script>

<style>
</style>
