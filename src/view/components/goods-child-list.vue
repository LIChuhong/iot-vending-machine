<!-- 商品选择页面组件 -->
<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input v-model="commodityName" search enter-button placeholder="请输入名称关键字" @on-search="findGoodsList" style="width:60%;float: left;" />
		</div>
		<Table class="goodsChildTableStyle" :loading="tableLoading" size="small" border :columns="goodsColumns" :data="goodsList">
			<template slot-scope="{ row, index }" slot="commodityImgUrl">
				<img :src="row.commodityImgUrl" width="50px" height="50px"/>
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" @click="getGoodsInfo(row)">选择</Button>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		</div>
		
	</div>
</template>

<script>
	import {
		goodsChildColumns
	} from '@/data/columns.js'
	import {
		getCommodityList
	} from '@/api/commodity'
	export default {
		name: 'goods_child_list',
		components: {
		},
		data() {
			return {
				tableLoading:false,
				commodityName:'',//商品名称
				maxId:0,//当前页最大Id
				pageSize:10,//每页数量
				goodsColumns: goodsChildColumns,//商品列表表头
				goodsList: [],//商品列表
				prevId: [0],//记录每页最大Id

			}
		},
		methods: {
			getGoodsInfo(row){//获取选择商品信息
				this.$emit('get-goods-info',row)
			},
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
			getCommodityListData(){//获取商品列表
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
			findGoodsList() {//查找商品
				this.maxId = 0
				this.prevId = [0]
				this.getCommodityListData()

			},
			
		},
		created() {
			this.getCommodityListData()
		}

	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.goodsChildTableStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
	}
</style>
