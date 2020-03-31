<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 0.625rem;">
			<Input search enter-button placeholder="请输入商店类型关键字" @on-search="findShopTypeList" style="width: 30%;float: left;" />
		</div>
		<Table border :loading="tableLoading" :columns="shopTypeListColumns" :data="shopTypeListData" size="small">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="shopTypeEditor(row)">编辑</Button>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		</div>
		<Modal v-model="showShopTypeEditor" title="编辑商店类型信息" footer-hide>
			<shop-type-form :shop-type-id="shopTypeId" style="text-align: center;">修改</shop-type-form>
		</Modal>
	</div>
</template>

<script>
	import {
		getShopTypeList
	} from '@/api/shop'
	import ShopTypeForm from '../components/shop-type-form.vue'
	import {
		shopTypeListColumns
	} from '@/data/columns1'
	export default {
		components:{
			ShopTypeForm
		},
		name: 'shop_type_list',
		data() {
			return {
				shopTypeId:null,
				showShopTypeEditor: false,
				shopTypeListColumns: shopTypeListColumns,
				shopTypeName: '',
				maxId: 0,
				pageSize: 10,
				shopTypeListData: [],
				prevId: [0],
				tableLoading: false
			}
		},
		methods: {
			shopTypeEditor(row) {
				this.shopTypeId = row.id
				this.showShopTypeEditor = true

			},
			findShopTypeList(shopTypeName) {
				this.shopTypeName = shopTypeName
				this.maxId = 0
				this.prevId = [0]
				this.getShopTypeListData()
			},
			nextPage() {
				if (this.shopTypeListData.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					//console.log(this.maxId)
					this.prevId.push(this.maxId)
					this.getShopTypeListData()
				}

			},
			prevPage() {
				if (this.prevId.length > 1) {
					this.prevId.pop()
					this.maxId = this.prevId[this.prevId.length - 1]
					this.getShopTypeListData()
				} else {
					this.$Message.warning('这是第一页');
				}

			},
			getShopTypeListData() {
				this.tableLoading = true
				getShopTypeList(this.shopTypeName, this.maxId, this.pageSize).then(res => {
					const data = res.data
					this.tableLoading = false
					if (data.success == 1) {
						//console.log(data)
						data.shopTypeList.map(item => {
							if (this.maxId < item.id) {
								this.maxId = item.id
							}
						})
						this.shopTypeListData = data.shopTypeList

					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.tableLoading = false
					alert(error)
				})
			}
		},
		created() {
			this.getShopTypeListData()
		}

	}
</script>

<style>
</style>
