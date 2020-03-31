<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input search enter-button placeholder="请输入广告名称关键字" @on-search="findAdList" style="width:30%;float: left;" />
		</div>
		<Table :loading="tableLoading" size="small" border :columns="adColumns" :data="adList">
			<template slot-scope="{ row, index }" slot="adType">
				<!-- <img :src="row.commodityImgUrl" width="50px" height="50px"/> -->
				{{row.adType == 0?'图片':'视频'}}
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="adEditor(row)">编辑</Button>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		</div>
		<Modal v-model="showAdEditor" title="编辑广告信息" footer-hide>
			<!-- <goods-form :goodsId="goodsId">修改</goods-form> -->
			<ad-form :adId="adId" style="text-align:left">修改</ad-form>
		</Modal>
	</div>
</template>

<script>
	import AdForm from '../components/ad-form.vue'
	import {
		adColumns
	} from '@/data/columns1.js'
	import {
		getAdvertisementList
	} from '@/api/ad'
	export default {
		name: 'ad_list',
		components: {
			AdForm
		},
		data() {
			return {
				adId:null,
				tableLoading:false,
				adName:'',
				maxId:0,
				pageSize:10,
				showAdEditor:false,
				adColumns: adColumns,
				adList: [],
				prevId: [0],

			}
		},
		methods: {
			nextPage() {
				if (this.adList.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					//console.log(this.maxId)
					this.prevId.push(this.maxId)
					this.getAdList()
				}
			
			},
			prevPage() {
				if (this.prevId.length > 1) {
					this.prevId.pop()
					this.maxId = this.prevId[this.prevId.length - 1]
					this.getAdList()
				} else {
					this.$Message.warning('这是第一页');
				}
			
			},
			getAdList(){
				this.tableLoading = true
				getAdvertisementList(this.adName,this.maxId,this.pageSize).then(res=>{
					const data = res.data
					this.tableLoading = false
					if(data.success == 1){
						//console.log(data)
						this.adList = data.advertisementList.map(item=>{
							if(this.maxId < item.id){
								this.maxId = item.id
							}
							return item
						})
						
					}else{
						
						this.$Message.error(data.errorMessage)
					}
				}).catch(error=>{
					this.tableLoading = false
					alert(error)
				})
			},
			findAdList(adName) {
				this.adName = adName
				this.maxId = 0
				this.prevId = [0]
				this.getAdList()

			},
			adEditor(row) {
				this.adId = row.id
				this.showAdEditor = true

			}

		},
		created() {
			this.getAdList()
		}

	}
</script>

<style>
</style>
