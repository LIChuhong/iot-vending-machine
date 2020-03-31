<template>
	<!-- {{this.$route.query.rtuNumber}} -->
	<div>
		<div style="position:fixed;z-index:100;width: 100%;background: #FFFFFF;">
			<div style="overflow: hidden;padding: 0.3125rem 0.3125rem">
				<div @click="$router.back(-1)" style="display: inline;">
					<Icon type="ios-arrow-back" :size="28" />
				</div>
				<Button @click="updateCargos" type="primary" style="float: right;">保存</Button>
			</div>
			<div style="text-align: center;">
				<Row>
					<Col span="6">
					<p>机器编号</p>
					<p>{{rtuNumber}}</p>
					</Col>
					<Col span="6">
					<p>货道数量</p>
					<p>{{allAisle}}</p>
					</Col>
					<Col span="6">
					<p>库存</p>
					<p>{{inventory}}</p>
					</Col>
					<Col span="6">
					<p>总成本</p>
					<p>{{totalCost}}</p>
					</Col>
				</Row>
			</div>
			<div style="overflow: hidden;padding:0.625rem 0.3125rem">
				<Input type="number" v-model="copyRtuNumber" placeholder="输入被拷贝机器编号" style="width: 40%;margin-right: 0.3125rem;" />
				<Button type="primary" @click="copyAisle">复制货道</Button>
				<Button type="primary" style="float: right;" @click="againAisleList">重建</Button>

			</div>

		</div>
		<div style="bottom: 3.125rem;top: 8.5rem;position: absolute;">
			<List :loading="aisleListLoading" item-layout="vertical" class="listItemStyle1">
				<ListItem v-for="(item,i) in aisleList" :key="item.cargoNo">
					<div style="overflow: hidden;height: 3.125rem;">
						<div @click="shopAisle(item)" :title="item.stoped">
							<Badge :type="item.badgeType" :count="item.cargoNo" style="float: left;"></Badge>
						</div>
						<div @click="getCommodityImg(item,i)" style="height:100%;width: 3.125rem;float: left;background: #515A6E;margin: 0 0.625rem;">
							<img :src="item.commodity.commodityImgUrl" :title="item.commodityId" width="100%" />
						</div>

						<div style="float: left;text-align: center;font-size: 1rem;">{{item.commodity.commodityName}}</div>
					</div>

					<div>
						<Row>
							<Col span="8">
							<div style="overflow: hidden;">
								<span style="float: left;width: 40%;">排序：</span>
								<Input type="number" v-model="item.sortIndex" style="width: 60%;" />
							</div>
							</Col>
							<Col span="8">
							<div>
								<span style="float: left;width: 40%;">库存：</span>
								<Input type="number" v-model="item.stock" style="width: 60%;" />
							</div>
							</Col>
							<Col span="8">
							<div>

								<span style="float: left;width: 40%;">预警：</span>
								<Input type="number" v-model="item.stockWarn" style="width: 60%;" />
							</div>
							</Col>
						</Row>
						<Row>
							<Col span="8">
							<div>

								<span style="float: left;width: 40%;">单价：</span>
								<Input type="number" v-model="item.price" style="width: 60%;" />
							</div>
							</Col>
							<Col span="8">
							<div>

								<span style="float: left;width: 50%;">促销价：</span>
								<Input type="number" v-model="item.promotionPrice" style="width: 50%;" />
							</div>
							</Col>
							<Col span="8">
							<div>

								<span style="float: left;width: 50%;">成本价：</span>
								<Input type="number" v-model="item.costPrice" style="width: 50%;" />
							</div>
							</Col>
						</Row>
					</div>
				</ListItem>
			</List>

			<div style="padding: 0.625rem 0.3125rem;text-align: center;">
				<span>这里是第{{level+1}}层，你要创建</span><Input type="number" v-model="aisle" style="width: 50px" /><span>个货道</span>
				<Button :disabled="disCreateBtn" type="primary" @click="createLevelAisle" style="margin-left: 0.3125rem;">创建</Button>
			</div>

		</div>
		<Modal v-model="showGoodsImg" title="选择商品" footer-hide :styles="{top: '50px'}">
			<goods-child-list v-if="showGoodsImg" @get-goods-info="getGoodsInfo"></goods-child-list>
		</Modal>

	</div>
</template>

<script>
	import {
		updateCargosData,
		getCargosData
	} from '@/api/rtu'
	import GoodsChildList from '@/view/components/goods-child-list.vue'
	export default {
		name: 'create_aisle',
		components: {
			GoodsChildList
		},
		data() {
			return {
				copyRtuNumber:null,
				aisleListLoading: false,
				index: null,
				showGoodsImg: false,
				level: 0, //层数
				//inventory: 0,
				allAisle: 0, //总货道
				aisle: 10, //每层货道
				//totalCost: 0,
				//replenishment: false,
				rtuNumber: this.$route.query.rtuNumber,
				aisleList: [],
				disCreateBtn:false

			}
		},
		watch: {

		},
		computed: {
			// allAisle(){
			// 	//console.log(val)
			// 	return this.aisle
			// }
			inventory() {
				let inventoryNum = 0
				if (this.aisleList.length > 0) {
					this.aisleList.map(item => {
						inventoryNum += parseInt(item.stock)
					})
				}
				return inventoryNum
			},
			totalCost() {
				let totalCostNum = 0
				if (this.aisleList.length > 0) {
					this.aisleList.map(item => {
						totalCostNum += parseInt(item.stock) * parseInt(item.costPrice)
					})
				}
				return totalCostNum
			},

		},
		created() {
			this.getCargos(this.rtuNumber)
		},
		methods: {
			againAisleList(){
				this.aisleList = []
				this.level = 0
				this.allAisle = 0
				
			},
			copyAisle(){
				alert(this.copyRtuNumber)
				if(this.copyRtuNumber != null){
					this.getCargos(parseInt(this.copyRtuNumber))
				}
			},
			getCargos(rtuNumber) {
				getCargosData(rtuNumber).then(res => {
					const data = res.data
					if (data.success == 1) {
						//console.log(data)
						let cargosData = data.cargosData
						if (cargosData) {
							const cargoList = cargosData.cargoList
							if (cargoList != null && cargoList != '') {
								cargoList.forEach(item => {
									this.allAisle++
									if (this.level <= item.level) {
										this.level = item.level + 1
									}
									if (item.stoped) {
										item.badgeType = 'normal'
									} else {
										item.badgeType = 'success'
									}
								})
								this.aisleList = cargoList
							}
						}

					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					//this.aisleListLoading = false
					alert(error)
				})
			},
			updateCargos() {
				let cargoList = []
				let aisleList = this.aisleList
				for (var i = 0; i < aisleList.length; i++) {
					var item = aisleList[i]
					if (item.price <= item.costPrice || item.promotionPrice < item.costPrice) {
						this.$Message.error(item.cargoNo + '货道单价或促销价少于成本价');
						return;
					} else if (item.price < item.promotionPrice) {
						this.$Message.error(item.cargoNo + '货道促销价不能大于单价');
						return;
					} else {
						cargoList.push({
							cargoNo: parseInt(item.cargoNo),
							level: parseInt(item.level),
							sortIndex: parseInt(item.sortIndex),
							commodityId: parseInt(item.commodityId),
							stock: parseInt(item.stock),
							stockWarn: parseInt(item.stockWarn),
							costPrice: parseFloat(item.costPrice),
							price: parseFloat(item.price),
							promotionPrice: parseFloat(item.promotionPrice),
							stoped: item.stoped,

						})
					}
				}

				const cargosData = {
					rtuNumber: this.rtuNumber,
					replenishment: false,
					cargoList: cargoList

				}
				this.aisleListLoading = true
				updateCargosData(cargosData).then(res => {
					const data = res.data
					this.aisleListLoading = false
					if (data.success == 1) {
						this.$Message.success('保存成功')
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.aisleListLoading = false
					alert(error)
				})

			},
			shopAisle(item) {
				//const a = res.stoped
				let title = ''
				if (item.stoped) {
					title = '是否启用该货道？'
				} else {
					title = '是否禁用该货道？'
				}
				this.$Modal.confirm({
					title: title,
					//content: '<p>Content of dialog</p><p>Content of dialog</p>',
					onOk: () => {
						item.stoped = !item.stoped
						if (item.stoped) {
							item.badgeType = 'normal'
						} else {
							item.badgeType = 'success'
						}

					},
					onCancel: () => {

					}
				});
			},
			getCommodityImg(item, i) {
				//this.commodityImg = val
				this.index = i
				this.showGoodsImg = true
				//console.log(index)
			},
			getGoodsInfo(val) {
				let i = this.index
				console.log(val)
				if (this.index != null) {
					this.aisleList[this.index].commodity = val
					this.aisleList[this.index].commodityId = val.id

				}
				this.showGoodsImg = false

			},

			createLevelAisle() {
				const al = parseInt(this.aisle)

				if (al <= 10 && al > 0 && this.level <= 9) {
					this.allAisle += al
					for (let i = 1; i <= al; i++) {
						//console.log(i)
						//console.log(this.level)
						this.aisleList.push({
							cargoNo: this.level * 10 + i,
							level: this.level,
							sortIndex: 0, //排序
							commodityId: 0, //商品ID
							stock: 0, //库存
							stockWarn: 0, //库存预警值
							costPrice: 0, //该货道商品成本价
							price: 0, //该货道商品单价
							promotionPrice: 0, //该货道商品促销价
							stoped: false, //是否禁用该货道，true为禁用
							commodity: {},
							badgeType: 'success'

						})
					}
					if(this.level == 9){
						this.disCreateBtn = true
					}
					this.level += 1
					
					//console.log(this.aisleList)

				}  else {
					this.$Message.error('创建货道不能大于10或少于0')
				}

			}

		}
	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.listItemStyle1 {
			padding: 0 0.625rem;
			background: #E6E6E6;
			/* top: 9.125rem; */


		}

		.listItemStyle1 .ivu-badge-count {
			border-radius: 50%;
			height: 1.875rem;
			width: 1.875rem;
			line-height: 1.875rem;
			/* z-index: 1; */

		}

		.listItemStyle1 .ivu-list-item-extra {
			margin: 0;
		}

		.listItemStyle1 .ivu-list-item {
			border-bottom: 1px solid #515A6E;
		}

		.listItemStyle1 .ivu-input {
			float: left;
			padding: 0;
			margin: 0;
			line-height: 0;
			background: rgba(0, 0, 0, 0);
			height: 1.3125rem;
			border: 0px;
		}

	}
</style>
