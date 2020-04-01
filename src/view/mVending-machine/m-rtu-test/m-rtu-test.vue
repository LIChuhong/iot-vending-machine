<template>
	<div style="background:#808695;height: 100%;color:white;overflow:hidden;">
		<div style="overflow: hidden;">
			<div style="color: red;text-align: center;">若要使用此功能，请勿使用微信或QQ浏览器登录</div>
			<List item-layout="vertical" class="mRtestListStyle">
				<ListItem>
					<div style="overflow: hidden;">
						<Input type="number" v-model="rtuNumber" style="width: 60%;" placeholder="请输入机器编号" />
						<Button type="primary" @click="queryRtu" style="float: right;">确定</Button>
					</div>
				</ListItem>
				<ListItem>
					<div style="overflow: hidden;" class="mRtInputStyle">
						<Input type="number" v-model="rowsNum" style="width:4.375rem;text-align: center;" /> <span style="margin:0 0.3125rem;">层</span>
						<Input type="number" v-model="aisleNum" style="width:4.375rem" /> <span style="margin:0 0.3125rem;">货道</span>
						<Button :disabled="customBtn" @click="customAisle" type="primary" style="float: right;">自定义货道</Button>
					</div>
				</ListItem>
				<ListItem>
					<Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleAllCheck">全选</Checkbox>
					<Badge v-for="item in stateType" :key="item" :color="item.color" :text="item.text" />
				</ListItem>
			</List>
		</div>
		<div class="checkboxGroupStyle">
			<CheckboxGroup v-model="checkAllGroup" @on-change="checkGroupAllChange">
				<div v-for="item in rowsList" :key="item.id" style="padding-bottom: 0.3125rem;overflow: auto;">
					<Checkbox style="float: left;" :value="item.checkAll" :indeterminate="item.indeterminate" size="small" :label="item.id"
					 @click.prevent.native="handleCheckAll(item)"></Checkbox>
					<div style="float: left;">
						<CheckboxGroup v-model="item.checkAllGroup" @on-change="checkAllGroupChange">
							<Checkbox size="small" v-for="i in item.rowContentList" :key="i.cargoNo" :label="i" :style="{color:i.color}">{{i.cargoNo}}</Checkbox>
						</CheckboxGroup>
					</div>

				</div>
			</CheckboxGroup>
		</div>
		<div style="text-align: center; position: absolute;width: 100%;bottom: 3%;">
			<Button :disabled="disShipment" style="width:9.375rem" size="large" @click="shipment" type="primary">{{shipmentText}}</Button>
		</div>
		<Spin fix v-if="showSpin">
			<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
			<div>Loading</div>
		</Spin>
	</div>
</template>

<script>
	import {
		getCargosData,
		setVMRtuData
	} from '@/api/rtu'
	export default {
		name: 'm_rtu_test',
		data() {
			return {
				disShipment: false,
				shipmentText: '出货',
				allCheck: [],
				index: 0,
				CheckboxColor: 'red',
				customBtn: true,
				showSpin: false,
				rowsNum: 6,
				aisleNum: 10,
				checkAllGroup: [],
				rtuNumber: '',
				rowContentList: [],
				indeterminate: false,
				checkAll: false,
				rowsList: [],
				stateType: [{
						color: 'white',
						text: '初始状态'
					},
					{
						color: 'green',
						text: '成功'
					},
					{
						color: 'red',
						text: '失败'
					},
					{
						color: 'purple',
						text: '正在进行中'
					}
				]
			}
		},
		watch: {},
		methods: {
			shipment() {
				if (this.rtuNumber != null && this.rtuNumber != '') {
					if (this.shipmentText == '出货') {
						this.index = 0
						var list = this.rowsList
						this.allCheck = []
						for (var i = 0; i < list.length; i++) {
							var checkAllGroup = list[i].checkAllGroup
							for (var j = 0; j < checkAllGroup.length; j++) {
								this.rowsList[i].rowContentList[j].color = 'white'
								this.allCheck.push({
									rowsListIndex: i,
									checkAllGroupIndex: j
								})

							}
						}
						this.shipmentText = '停止'
						this.getShipment()
					} else {
						this.disShipment = true
						this.index = this.allCheck.length
						var i = 15;
						var timer = null;
						timer = setInterval(() => {
							if (i > 0) {
								this.shipmentText = i + 's可重新出货'
								i--;
							} else {
								this.shipmentText = '出货'
								this.disShipment = false
								clearInterval(timer);
							}
						}, 1000)
					}

				} else {
					this.$Message.error('机器编号不能为空！')
				}
			},
			getShipment() {
				if (this.index < this.allCheck.length) {

					const i = this.allCheck[this.index]
					const rIndex = i.rowsListIndex
					const cIndex = i.checkAllGroupIndex
					this.rowsList[rIndex].rowContentList[cIndex].color = 'purple'
					const rtuData = {
						orderType: 2,
						rtuNumber: parseInt(this.rtuNumber),
						parameterDataList: [{
							parameterIndex: 1,
							dataLength: 2,
							value: parseInt(this.rowsList[rIndex].rowContentList[cIndex].cargoNo)
						}, {
							parameterIndex: 2,
							dataLength: 1,
							value: 0
						}]
					}
					setVMRtuData(rtuData).then(res => {
						const data = res.data
						if (data.success == 1) {
							var parameterDataList = data.rtuData.parameterDataList[1];
							var pdvValue = parameterDataList.value
							if (pdvValue == 1) {
								this.rowsList[rIndex].rowContentList[cIndex].color = 'green'
							} else {
								this.rowsList[rIndex].rowContentList[cIndex].color = 'red'
							}
							
						} else {
							this.rowsList[rIndex].rowContentList[cIndex].color = 'white'
							if (data.errorCode == "F30000003") {
								this.index = this.allCheck.length
								this.shipmentText = '出货'
								this.$Message.error(data.errorMessage)
							}
						}
						if (this.index < this.allCheck.length) {
							this.index++
							this.getShipment()
						}

					}).catch(error => {

						alert(error)
					})
				} else {
					this.shipmentText = '出货'
				}
			},
			customAisle() {
				if (this.rowsNum > 10 || this.rowsNum < 0) {
					this.$Message.error('层数不能大于10或者小于0')
				} else if (this.aisleNum > 10 || this.aisleNum < 0) {
					this.$Message.error('货道数不能大于10或者小于0')
				} else {
					this.rowsList = []
					for (var i = 0; i < parseInt(this.rowsNum); i++) {
						var arr = []
						for (var j = 1; j <= parseInt(this.aisleNum); j++) {
							var cargoNo = i * 10 + j
							if (cargoNo < 10) {
								cargoNo = '0' + cargoNo
							}
							arr.push({
								cargoNo: cargoNo.toString(),
								color: 'white',
								level: i
							})
						}
						this.getRowsList(i + 1, arr)
					}
				}
			},
			handleAllCheck() {

				if (this.indeterminate) {
					this.checkAll = false;
				} else {
					this.checkAll = !this.checkAll;
				}
				this.indeterminate = false;

				if (this.checkAll) {
					let list = this.rowsList
					for (var i = 0; i < list.length; i++) {
						let contentList = list[i].rowContentList
						this.rowsList[i].checkAllGroup = list[i].rowContentList
						this.rowsList[i].checkAll = true
						this.rowsList[i].indeterminate = false
						for (var j = 0; j < contentList.length; j++) {
							this.checkAllGroup.push(contentList[j])
						}
					}

					//this.checkAllGroup = list
				} else {
					this.rowsList.map(item => {
						item.checkAllGroup = []
						item.checkAll = false
					})
					this.checkAllGroup = [];
				}
			},
			checkAllGroupChange(data) {
				//console.log(data)
				let row = ''
				let rowList = this.rowsList
				for (let i = 0; i < rowList.length; i++) {
					if (data[0].level + 1 == rowList[i].id) {
						row = rowList[i]
						break;
					}

				}
				if (data.length === row.rowContentList.length) {
					row.indeterminate = false;
					row.checkAll = true;
				} else if (data.length > 0) {
					row.indeterminate = true;
					row.checkAll = false;
				} else {
					row.indeterminate = false;
					row.checkAll = false;
				}
			},
			handleCheckAll(item) {
				//console.log(item)
				if (item.indeterminate) {
					item.checkAll = false;
				} else {
					item.checkAll = !item.checkAll;
				}
				item.indeterminate = false;

				if (item.checkAll) {
					item.checkAllGroup = item.rowContentList
				} else {
					item.checkAllGroup = [];
				}
			},

			getRowsList(i, arr) {
				// for (let i = 1; i <= num; i++) {

				this.rowsList.push({
					id: i,
					checkAll: false,
					indeterminate: false,
					checkAllGroup: [],
					rowContentList: arr

				})
				//console.log(this.rowsList)
				// }
			},
			queryRtu() {
				if (this.rtuNumber) {
					this.rowsList = []
					this.showSpin = true
					this.customBtn = false
					getCargosData(this.rtuNumber).then(res => {
						const data = res.data
						this.showSpin = false
						if (data.success == 1) {
							//console.log(data)
							if (data.cargosData) {
								const cargoList = data.cargosData.cargoList
								if (cargoList) {
									this.getRowContentList(cargoList)
								}
							}
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						this.showSpin = false
						alert(error)
					})
				}
			},
			getRowContentList(cargoList) {
				var num = Math.max.apply(Math, cargoList.map(function(item) {
					return item.level
				}));
				for (var i = 0; i < num + 1; i++) {
					var arr = cargoList.filter(function(item) {
						return item.level == i
					});
					if (arr) {
						var arr1 = arr.map(item => {
							if (item.cargoNo < 10) {
								item.cargoNo = '0' + item.cargoNo
							}
							var cargoNo = {
								cargoNo: item.cargoNo.toString(),
								color: 'white',
								level: item.level
							}
							return cargoNo
						})
						//console.log(arr1)
						this.getRowsList(i + 1, arr1)
					}

				}

			}


		},
		mounted() {
			//this.getRowsList(6)
		}

	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.demo-spin-icon-load {
			animation: ani-demo-spin 1s linear infinite;
		}

		@keyframes ani-demo-spin {
			from {
				transform: rotate(0deg);
			}

			50% {
				transform: rotate(180deg);
			}

			to {
				transform: rotate(360deg);
			}
		}

		.mRtestListStyle,
		.checkboxGroupStyle {
			padding: 0 0.625rem;
			overflow: hidden;

		}

		.mRtestListStyle .ivu-list-item-extra {
			margin: 0;
		}

		.mRtestListStyle .ivu-badge-status-text {
			margin-left: 0;
			color: white;
		}

		.mRtestListStyle .ivu-badge-status-dot {
			border-radius: 0;
			height: 0.625rem;
			width: 0.625rem;
			margin-left: 0.3125rem;
		}

		.mRtestListStyle .ivu-input {
			/* float: left; */
			padding: 0;
			margin: 0;
			line-height: 0;
			background: rgba(0, 0, 0, 0);
			border: 0px;
			border-radius: 0;
			border-bottom: 0.0625rem solid #2D8CF0;
			color: white
		}

		.mRtInputStyle .ivu-input {
			text-align: center;
		}

		.checkboxGroupStyle .ivu-checkbox-wrapper {
			margin-right: 0.0625rem;
			font-size: 0.75rem;
		}

		.checkboxGroupStyle .ivu-checkbox-small .ivu-checkbox-inner {
			width: 0.75rem;
			height: 0.75rem;
		}

	}
</style>
