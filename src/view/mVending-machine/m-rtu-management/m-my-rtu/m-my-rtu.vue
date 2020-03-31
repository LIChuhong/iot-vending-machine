<template>
	<div style="overflow: hidden;">

		<List :loading="mRtuListLoading" class="mMyRtuStyle" ref="listRef">
			<template slot="header">
				<div style="overflow: hidden;height: 2.5rem;">
					<Select v-model="keyField" style="width: 28%;float: left;margin-right: 8px;">
						<Option v-for="item in keyFieList" :key="item.id" :value="item.id">{{item.title}}</Option>
					</Select>
					<Input search enter-button placeholder="请输入关键字" @on-search="findRtuList" style="width:60%; " />
				</div>
			</template>
			<ListItem v-for="item in rtuList" :key="item.id">
				<ListItemMeta>
					<template slot="description">
						<div>
							<span style="margin-right: 0.625rem;">编号:{{item.rtuNumber}}</span><span>名称:{{item.rtuName}}</span>
						</div>
						<div>
							<span>序列号:{{item.rtuSerialNumber}}</span>
						</div>
						<div>
							<span style="margin-right: 0.625rem;">收款人:{{item.payeeName}}</span><span>账号:{{item.payId}}</span>
						</div>
						<div>
							<span>所属商家:{{item.orgName}}</span>
						</div>
					</template>
				</ListItemMeta>
				<div slot="action" style="border-left:0.0625rem solid #e8eaec">
					<!-- <div slot="action"> -->
					<div>
						<div @click="getEwm(item)" style="width: 3.125rem;height: 3.125rem;margin: 0 auto;">
							<img style="width: 100%;height: 100%;" :src="Ewm" :title="item.rtuNumber"/>
						</div>
					</div>
					<div class="listButtonStyle">
						<Button @click="editorRtu(item)" style="float: left;" size="small" type="text">编辑</Button>
						<Button :loading="item.checkLoading" @click="checkRtu(item)" icon="md-search" style="float: right;" size="small"
						 type="warning">检测</Button>


					</div>
					<div class="listButtonStyle">
						<!-- <Button style="float: left;" size="small" type="text" @click="copyRtu(item)">复制</Button> -->
						<Button style="float: left;" @click="setProportion(item)" size="small" type="text">分成</Button>
						<i-switch :loading="item.switchLoading" style="float: right;" v-model="item.isEnable" @on-change="changeStopRtu(item)" />
						<!-- <Button style="float: left;" size="small" type="text">启禁用</Button> -->
					</div>
					<div class="listButtonStyle">
						<Button style="float: left;" size="small" type="text" @click="creatAisle(item)">货道</Button>

						<Button style="float:right;" size="small" type="text" @click="copyRtu(item)">复制</Button>
					</div>
				</div>
			</ListItem>
		</List>

		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>

		</div>
		<Modal :title="modalTitle" v-model="showModal" :fullscreen="modelFullscreen" footer-hide @on-cancel="canelModal">
			<div slot="close" style="float: left;">
				<Icon size="30" type="ios-arrow-forward" color="rgb(81,90,110)"></Icon>
				<!-- //<span>Delete confirmation</span> -->

			</div>

			<rtu-form v-if="showEditorRtu" :rtuNumber="copyRtuNumber">修改</rtu-form>
			<copy-rtu v-else :rtuNumber="copyRtuNumber"></copy-rtu>

		</Modal>
		<Modal :title="'机器:'+ ewmTitle" v-model="showEwmModal" footer-hide width="360">
			<img style="width: 100%;height: 100%;" :src="bigEwm"/>
		</Modal>
	</div>
</template>

<script>
	import {
		getVMRtuList,
		getVMRtuData,
		closeShop,
		getVMRtuQRCode
	} from '@/api/rtu'
	import Ewm from '@/assets/images/ewm.png'
	import CopyRtu from '@/view/vending-machine/v-rtu-management/copy-rtu/copy-rtu.vue'
	import RtuForm from '@/view/vending-machine/v-rtu-management/components/rtu-form.vue'
	export default {
		name: 'mMyRtu',
		components: {
			CopyRtu,
			RtuForm
		},
		data() {
			return {
				//scroll:0,
				Ewm,
				bigEwm:'',
				ewmTitle:'',
				showEwmModal:false,
				modelFullscreen: false,
				showEditorRtu: false,
				mRtuListLoading: true,
				copyRtuNumber: null,
				modalTitle: '',
				showModal: false,
				rtuList: [],
				keyField: 0,
				searchKey: '',
				maxId: 0,
				pageSize: 10,
				prevId: [0],
				keyFieList: [{
						id: 0,
						title: '机器名称'
					},
					{
						id: 1,
						title: '机器编号'
					}
				]
			}
		},
		mounted() {

		},


		methods: {
			getEwm(item){
				this.bigEwm=''
				this.ewmTitle = item.rtuNumber
				this.showEwmModal = true
				getVMRtuQRCode(item.rtuNumber).then(res=>{
					const data = res.data
					if(data.success == 1){
						//console.log(data)
						this.bigEwm = data.qrCodeUrl
					}else{
						this.$Message.error(errorMessage)
					}
				}).catch(error=>{
					alert(error)
				})
				
			},
			canelModal(){
				this.showEditorRtu = false
			},
			editorRtu(item) {
				this.copyRtuNumber = item.rtuNumber
				this.showEditorRtu = true;
				this.modalTitle = '编辑机器'
				this.modelFullscreen = true
				this.showModal = true
			},
			checkRtu(item) {
				item.checkLoading = true
				getVMRtuData(item.rtuNumber).then(res => {
					const data = res.data
					item.checkLoading = false
					if (data.success == 1) {
						this.$Message.success(item.rtuNumber + '机器在线')
					} else {
						this.$Message.error(item.rtuNumber + data.errorMessage)
					}
				}).catch(error => {
					item.checkLoading = false
					alert(error)
				})
				//item.checkLoading = true
			},
			changeStopRtu(item) {
				item.switchLoading = true
				closeShop(item.rtuNumber, item.isEnable).then(res => {
					const data = res.data
					item.switchLoading = false
					if (data.success == 1) {
						if (item.isEnable) {
							this.$Message.success(item.rtuNumber + '机器启用成功')
						} else {
							this.$Message.success(item.rtuNumber + '机器禁用成功')
						}
					} else {
						this.$Message.error(item.rtuNumber + data.errorMessage)
					}
				}).catch(error => {
					item.switchLoading = false
					alert(error)
				})


			},
			setProportion(item) {
				this.$router.push({
					name: 'proportion',
					query: {
						rtuNumber: item.rtuNumber
					}
				})
			},
			creatAisle(data) {
				
				// let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				// const children = this.$refs.listRef.$children
				// console.log(this.$refs.listRef.$el.offsetTop)
				// children.map(item => {
				// 	if (data.id == item.$vnode.data.key) {
				// 		console.log(item.$el.offsetTop)
				// 		console.log(Math.abs(clientHeight-item.$el.offsetTop))
				// 	}
				// })

				this.$router.push({
					name: 'create_aisle',
					query: {
						rtuNumber: data.rtuNumber
					}
				})

			},
			findRtuList(searchKey) {
				this.searchKey = searchKey
				this.maxId = 0
				this.prevId = [0]
				this.getRtuList()
			},
			nextPage() {
				if (this.rtuList.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					//console.log(this.maxId)
					this.prevId.push(this.maxId)
					//console.log(this.prevId)
					this.getRtuList()
					//console.log(this.maxId)
				}

			},
			prevPage() {
				if (this.prevId.length > 1) {
					this.prevId.pop()
					this.maxId = this.prevId[this.prevId.length - 1]
					this.getRtuList()
				} else {
					this.$Message.warning('这是第一页');
				}

			},
			copyRtu(item) {
				this.modelFullscreen = false
				this.modalTitle = '复制' + item.rtuNumber + '机器'
				this.copyRtuNumber = item.rtuNumber
				this.showEditorRtu = false
				this.showModal = true
			},
			getRtuList() {
				this.mRtuListLoading = true
				getVMRtuList(this.keyField, this.searchKey, this.maxId, this.pageSize).then(res => {
					const data = res.data
					this.mRtuListLoading = false
					if (data.success == 1) {
						//console.log(data)
						data.rtuList.map(item => {
							item.checkLoading = false
							item.switchLoading = false
							if (this.maxId < item.id) {
								this.maxId = item.id
							}

						})
						this.rtuList = data.rtuList
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.mRtuListLoading = false
					alert(error)
				})
			}
		},

		created() {
			this.getRtuList()
		},
		beforeRouteLeave(to, from, next) {
			//let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			//console.log(scrollTop)
			next()
		},






	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.mMyRtuStyle {
			padding: 0 0.625rem;
		}

		.mMyRtuStyle .listButtonStyle {
			overflow: hidden;
			padding-top: 0.3125rem;
		}

		.mMyRtuStyle .ivu-list-item {
			padding: 0.3125rem 0;
		}
	}
</style>
