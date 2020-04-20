<!-- 手机端补货组件 -->
<template>
	<div>
		<div style="position: fixed;top:3.125rem;z-index:2;background: #FFFFFF;">
			<div style="height: 3.125rem;">
				<span style="color: #FF0000;margin-right: 1.25rem;">预防库存不对应，补货期间建议停止营业，完成补货后再开启</span><span style="margin:0 1.25rem;">当前机器编号:{{rtuNumber}}</span>
				<Button type="warning" @click="changeStopRtu" size="small" v-show="stopRtuBtn">点击{{stopBtnText}}营业</Button>
			</div>
			<div style="overflow: hidden;padding:0 0.625rem 0.3125rem 0.3125rem ;">
				<Input @on-search="getCargos" search enter-button="查找" placeholder="请输入机器编号" style="width: 70%;float: left;" />
				<Button type="success" @click="updateCargos" style="float: right;">保存</Button>
			</div>
		</div>
		<List :loading="aisleListLoading" item-layout="vertical" class="listItemStyle">
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
		<Modal v-model="showGoodsImg" title="选择商品" footer-hide :styles="{top: '50px'}">
			<goods-child-list v-if="showGoodsImg" @get-goods-info="getGoodsInfo"></goods-child-list>
		</Modal>
	</div>
</template>

<script>
	import {
		updateCargosData,
		getCargosData,
		closeShop
	} from '@/api/rtu'
	import GoodsChildList from '@/view/components/goods-child-list.vue'
	export default {
		components: {
			GoodsChildList
		},
		name: 'm_replenishment',
		data() {
			return {
				rtuNumber: null,
				stopBtnText: '停止',
				stopRtuBtn: false,
				copyRtuNumber: null, //复制机器编号
				aisleListLoading: false,
				index: null,
				showGoodsImg: false,
				level: 0, //层数
				//inventory: 0,
				allAisle: 0, //总货道
				aisle: '', //每层货道
				//totalCost: 0,
				//replenishment: false,
				aisleList: [], //货道列表
				disCreateBtn: false
			}
		},
		mounted() {

		},
		methods: {
			changeStopRtu() { //启禁用营业
				let title = ''
				let enable = false
				if (this.stopBtnText == '停止') {
					title = '是否停止营业？'
					enable = false
				} else {
					title = '是否开启营业？'
					enable = true
				}
				this.$Modal.confirm({
					title: title,
					loading: true,
					onOk: () => {
						closeShop(this.rtuNumber, enable).then(res => {
							const data = res.data
							this.$Modal.remove();
							if (data.success == 1) {
								if (enable) {
									this.$Message.success('开启成功')
									this.stopBtnText = '停止'
								} else {
									this.$Message.success('停止成功')
									this.stopBtnText = '开启'
								}

							} else {
								this.$Message.error(data.errorMessage)
							}
						}).catch(error => {
							this.$Modal.remove();
							alert(error)
						})
					},
					onCancel: () => {}
				});
			},
			shopAisle(item) { //启禁用货道
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

			getCommodityImg(item, i) { //选择商品
				//this.commodityImg = val
				this.index = i
				this.showGoodsImg = true
				//console.log(index)
			},
			getGoodsInfo(val) { //获取选择商品信息
				let i = this.index
				//console.log(val)
				if (this.index != null) {
					this.aisleList[this.index].commodity = val
					this.aisleList[this.index].commodityId = val.id
				}
				this.showGoodsImg = false

			},

			getCargos(rtuNumber) { //获取货道信息列表

				this.aisleListLoading = true
				getCargosData(rtuNumber).then(res => {
					this.aisleListLoading = false
					const data = res.data
					if (data.success == 1) {
						this.rtuNumber = parseInt(rtuNumber)
						this.stopRtuBtn = true
						let cargosData = data.cargosData
						if (cargosData) {
							const cargoList = cargosData.cargoList
							if (cargoList) {
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
									if(item.costPrice != 0){
										item.costPrice = item.costPrice.toFixed(2)
									}
									if(item.price != 0){
										item.price = item.price.toFixed(2)
									}
									if(item.promotionPrice != 0){
										item.promotionPrice = item.promotionPrice.toFixed(2)
									}
									
								})
								this.aisleList = cargoList
								//console.log(1)
							}
						}

					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.aisleListLoading = false
					alert(error)
				})
			},
			updateCargos() { //更新货道
				if (this.rtuNumber) {
					if (this.aisleList.length > 0) {
						let cargoList = []
						let aisleList = this.aisleList
						for (var i = 0; i < aisleList.length; i++) {
							var item = aisleList[i]
							if (parseFloat(item.price) < parseFloat(item.costPrice)) {
								this.$Message.error(item.cargoNo + '货道单价不能少于成本价');
								return;
							}
							if (parseFloat(item.promotionPrice) > 0) {
								if (parseFloat(item.promotionPrice) < parseFloat(item.costPrice)) {
									this.$Message.error(item.cargoNo + '货道促销价不能少于成本价');
									return;
								}
								if (parseFloat(item.promotionPrice) >= parseFloat(item.price) ) {
									this.$Message.error(item.cargoNo + '货道促销价不能大于单价');
									return;
								}
							}
						
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

						if (cargoList.length == aisleList.length) {
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
						}
					} else {
						this.$Message.warning('请先查找设备再进行保存')
					}
				} else {
					this.$Message.warning('请先查找设备再进行保存')

				}
			}
		}

	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.listItemStyle {
			padding: 0 0.625rem;
			background: #E6E6E6;
			top: 5.125rem
		}

		.listItemStyle .ivu-badge-count {
			border-radius: 50%;
			height: 1.875rem;
			width: 1.875rem;
			line-height: 1.875rem;
			z-index: 1;

		}

		.listItemStyle .ivu-list-item-extra {
			margin: 0;
		}

		.listItemStyle .ivu-list-item {
			border-bottom: 1px solid #515A6E;
		}

		.listItemStyle .ivu-input {
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
