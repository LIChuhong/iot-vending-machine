<template>
	<div class="rtuAisleStyle">

		<div style="text-align: left;border-bottom: 1px solid #E6E6E6;position:fixed;top:51px;width: 100%;z-index: 100;background: #FFFFFF;">
			<Row>
				<Col span="6">
				<span>机器编号:</span>
				<span>{{rtuNumber}}</span>
				</Col>
				<Col span="6">
				<span>货道数量:</span>
				<span>{{allAisle}}</span>
				</Col>
				<Col span="6">
				<span>库存:</span>
				<span>{{inventory}}</span>
				</Col>
				<Col span="6">
				<span>总成本:</span>
				<span>{{totalCost}}</span>
				</Col>
			</Row>
			<div style="overflow: hidden;padding-bottom: 0.625rem;">
				<Input type="number" v-model="copyRtuNumber" placeholder="输入被拷贝机器编号" style="width: 30%;" />
				<Button type="primary" @click="copyAisle" style="margin:0 1.25rem;">复制货道</Button>
				<Button type="primary" @click="againAisleList">重建</Button>
				<Button @click="updateCargos" type="primary" style="position: absolute; right: 50px;">保存</Button>
			</div>
		</div>
		<div>
			<Row class="aisleRowStyle" v-for="(j,index) in levelAisleList" :key="j.level">
				<Col span="2">
				<div style="height: 50px;width:50px;"></div>
				<div>名称</div>
				<div class="aisleTextInput">排序</div>
				<div class="aisleTextInput">库存</div>
				<div class="aisleTextInput">预警</div>
				<div class="aisleTextInput">单价</div>
				<div class="aisleTextInput">促销价</div>
				<div class="aisleTextInput">成本价</div>
				<div class="aisleTextInput">编号</div>
				</Col>
				<Col span="2" v-for="(item,index1) in j.aisleList" :key="item.cargoNo">
				<div>
					<div @click="getCommodityImg(item,index,index1)" style="height: 50px;width:50px;overflow: hidden;background: #2D8CF0;display: inline-block;">
						<img :src="item.commodity.commodityImgUrl" :title="item.commodityId" width="100%" />
					</div>
				</div>
				<div style="height: 21px;">{{item.commodity.commodityName}}</div>
				<div class="aisleTextInput"><Input v-model="item.sortIndex" size="small" type="number"></Input></div>
				<div class="aisleTextInput"><Input v-model="item.stock" size="small" type="number"></Input></div>
				<div class="aisleTextInput"><Input v-model="item.stockWarn" size="small" type="number"></Input></div>
				<div class="aisleTextInput"><Input v-model="item.price" size="small" type="number"></Input></div>
				<div class="aisleTextInput"><Input v-model="item.promotionPrice" size="small" type="number"></Input></div>
				<div class="aisleTextInput"><Input v-model="item.costPrice" size="small" type="number"></Input></div>
				<div @click="shopAisle(item)" :title="item.stoped" class="aisleTextInput">
					<Badge style="cursor:pointer" :type="item.badgeType" :count="item.cargoNo"></Badge>
				</div>
				</Col>
			</Row>

		</div>
		<div>
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
		components: {
			GoodsChildList
		},
		props: ['rtuNumber'],
		name: 'rtu_aisle',
		data() {
			return {
				//rtuNumber:null,
				copyRtuNumber: null,
				showGoodsImg: false,
				allAisle: 0,
				levelAisleList: [],
				level: 0,
				aisle: 10,
				disCreateBtn: false,
				index: null,
				index1: null,
			}
		},
		computed: {

			inventory() {
				let inventoryNum = 0
				if (this.levelAisleList.length > 0) {
					this.levelAisleList.map(item => {
						item.aisleList.map(i => {
							inventoryNum += parseInt(i.stock)
						})

					})
				}
				return inventoryNum
			},
			totalCost() {
				let totalCostNum = 0
				if (this.levelAisleList.length > 0) {
					this.levelAisleList.map(item => {
						item.aisleList.map(i => {
							totalCostNum += parseInt(i.stock) * parseInt(i.costPrice)
						})

					})
				}
				return totalCostNum
			},

		},
		created() {
			this.getCargos(this.rtuNumber)
		},
		methods: {
			updateCargos() {
				let cargoList = []
				this.levelAisleList.map(j => {
					let aisleList = j.aisleList
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
				})
				const cargosData = {
					rtuNumber: this.rtuNumber,
					replenishment: false,
					cargoList: cargoList

				}
				updateCargosData(cargosData).then(res => {
					const data = res.data
					if (data.success == 1) {
						this.$Message.success('保存成功')
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
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

			copyAisle() {
				//alert(this.copyRtuNumber)
				if (this.copyRtuNumber != null) {
					this.getCargos(parseInt(this.copyRtuNumber))
				}
			},
			againAisleList() {
				this.levelAisleList = []
				this.level = 0
				this.allAisle = 0

			},
			getCargos(rtuNumber) {
				this.levelAisleList = []
				getCargosData(rtuNumber).then(res => {
					const data = res.data
					if (data.success == 1) {
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
								this.levelAisleList.push({
									aisleList: cargoList
								})
							}
						}
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					alert(error)
				})
			},
			getGoodsInfo(val) {
				let i = this.index
				let j = this.index1
				console.log(val)
				if (i != null && j != null) {
					this.levelAisleList[i].aisleList[j].commodity = val
					this.levelAisleList[i].aisleList[j].commodityId = val.id

				}
				this.showGoodsImg = false

			},
			getCommodityImg(item, i, j) {
				//this.commodityImg = val
				this.index = i
				this.index1 = j
				this.showGoodsImg = true
				//console.log(index)
			},
			createLevelAisle() {
				const al = parseInt(this.aisle)
				if (al <= 10 && al > 0 && this.level <= 9) {
					this.allAisle += al
					let aisleList = []
					for (let i = 1; i <= al; i++) {
						//console.log(i)
						//console.log(this.level)
						aisleList.push({
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
					this.levelAisleList.push({
						aisleList: aisleList
					})
					if (this.level == 9) {
						this.disCreateBtn = true
					}
					this.level += 1

					//console.log(this.aisleList)

				} else {
					this.$Message.error('创建货道不能大于10或少于0')
				}

			}

		},

	}
</script>

<style>
	.rtuAisleStyle {
		overflow: hidden;
		margin-top: 51px;

	}

	.rtuAisleStyle .aisleTextInput {
		margin-top: 0.3125rem;
		height: 24px;
		padding: 0 0.625rem;
	}

	.rtuAisleStyle .aisleRowStyle {
		text-align: center;
		padding: 0.625rem 0;
		border-bottom: 1px solid #E6E6E6;
	}

	.rtuAisleStyle .aisleTextInput .ivu-input-small {
		text-align: center
	}
</style>
