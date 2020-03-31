<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input search enter-button placeholder="请输入名称关键字" @on-search="findGoodsList" style="width:30%;float: left;" />
		</div>
		<Table :loading="tableLoading" size="small" border :columns="goodsColumns" :data="goodsList">
			<template slot-scope="{ row, index }" slot="commodityImgUrl">
				<img :src="row.commodityImgUrl" width="50px" height="50px"/>
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="goodsEditor(row)">编辑</Button>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		</div>
		<Modal v-model="showGoodsEditor" title="编辑商品" footer-hide>
			<goods-form :goodsId="goodsId">修改</goods-form>
		</Modal>
	</div>
</template>

<script>
	import GoodsForm from '../components/goods-form.vue'
	import {
		goodsColumns
	} from '@/data/columns.js'
	import {
		getCommodityList
	} from '@/api/commodity'
	export default {
		name: 'goods_list',
		components: {
			GoodsForm
		},
		data() {
			return {
				goodsId:null,
				tableLoading:false,
				commodityName:'',
				maxId:0,
				pageSize:10,
				showGoodsEditor:false,
				goodsColumns: goodsColumns,
				goodsList: [],
				prevId: [0],

			}
		},
		methods: {
			nextPage() {
				if (this.goodsList.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					//console.log(this.maxId)
					this.prevId.push(this.maxId)
					this.getCommodityListData()
				}
			
			},
			prevPage() {
				if (this.prevId.length > 1) {
					this.prevId.pop()
					this.maxId = this.prevId[this.prevId.length - 1]
					this.getCommodityListData()
				} else {
					this.$Message.warning('这是第一页');
				}
			
			},
			getCommodityListData(){
				this.tableLoading = true
				getCommodityList(this.commodityName,this.maxId,this.pageSize).then(res=>{
					const data = res.data
					this.tableLoading = false
					if(data.success == 1){
						//console.log(data)
						data.commodityList.map(item=>{
							if(this.maxId < item.id){
								this.maxId = item.id
							}
						})
						this.goodsList = data.commodityList
					}else{
						
						this.$Message.error(data.errorMessage)
					}
				}).catch(error=>{
					this.tableLoading = false
					alert(error)
				})
			},
			findGoodsList(commodityName) {
				this.commodityName = commodityName
				this.maxId = 0
				this.prevId = [0]
				this.getCommodityListData()

			},
			goodsEditor(row) {
				this.goodsId = row.id
				this.showGoodsEditor = true

			}

		},
		created() {
			this.getCommodityListData()
		}

	}
</script>

<style>
</style>
