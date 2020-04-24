<template>
	<div class="myRtuStyle">

		<div style="overflow: hidden;padding-bottom: 8px;">
			<Select v-model="keyField" style="width:100px;float: left;margin-right: 8px;">
				<Option v-for="item in keyFieList" :key="item.id" :value="item.id">{{item.title}}</Option>
			</Select>
			<Input search enter-button placeholder="请输入关键字" @on-search="findRtuList" style="width: 300px;float: left;" />
		</div>
		<Table :loading="tableLoading" size="small" border :columns="rtuColumns" :data="rtuList">
			<template slot-scope="{ row, index }" slot="name-type-serialNumber">
				<p>{{row.rtuName}}</p>
				<p>{{row.rtuSerialNumber}}</p>
			</template>
			<template slot-scope="{ row, index }" slot="payeeName-payId">
				<p>{{row.payeeName}}</p>
				<p>{{row.payId}}</p>
			</template>
			<template slot-scope="{ row, index }" slot="orgName-tel">
				<p>{{row.orgName}}</p>
				<p>{{row.serviceTelePhone}}</p>
			</template>
			<template slot-scope="{ row, index }" slot="qrCode">
				<div @click="getEwm(row)" style="width: 3.125rem;height: 3.125rem;margin: 0 auto;">
					<img style="width: 100%;height: 100%;" :src="Ewm" :title="row.rtuNumber" />
				</div>
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<div style="margin:8px 0;">
					<Button :loading="row.checkLoading" type="warning" icon="md-search" size="small" style="margin-right: 5px" @click="checkRtu(row)">检测在线</Button>
					<i-switch :loading="row.switchLoading" v-model="row.isEnable" @on-change="changeStopRtu(row)" />
					<Button size="small" type="text" @click="copyRtu(row)">复制机器</Button>
				</div>
				<div>
					<Button ghost type="success" size="small" @click="creatAisle(row)">机器货道</Button>
					<Button size="small" icon="md-create" style="margin:0 5px" @click="editorRtu(row)">编辑</Button>
					<Button ghost type="primary" size="small" @click="setProportion(row)">设置分成</Button>
				</div>
			</template>

		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>

		</div>
		<Modal :title="modalTitle" v-model="showModal" footer-hide @on-cancel="canelModal">

			<rtu-form v-if="showEditorRtu" :rtuNumber="copyRtuNumber">修改</rtu-form>
			<copy-rtu v-else :rtuNumber="copyRtuNumber"></copy-rtu>

		</Modal>
		<Modal fullscreen :title="title+'机器货道'" v-model="showAislePage" footer-hide>
			<rtu-aisle :rtuNumber="rtuNumber" v-if="showAislePage"></rtu-aisle>
		</Modal>
		<Modal width="65%" :title="'设置'+title+'机器分成'" v-model="showProportionPage" footer-hide>
			<proportion :rtuNumber="rtuNumber" v-if="showProportionPage"></proportion>
		</Modal>
		<Modal :title="'机器:'+ ewmTitle" v-model="showEwmModal" footer-hide width="360">
			<img style="width: 100%;height: 100%;" :src="bigEwm" />
		</Modal>

	</div>

</template>

<script>
	//import { getRtuList } from '@/api/v-rtu-manage'
	import {
		getVMRtuList,
		getVMRtuData,
		closeShop,
		getVMRtuQRCode
	} from '@/api/rtu'
	import CopyRtu from '../copy-rtu/copy-rtu.vue'
	import Ewm from '@/assets/images/ewm.png'
	import RtuForm from '../components/rtu-form.vue'
	import RtuAisle from './components/rtu-aisle.vue'
	import Proportion from './components/proportion.vue'
	import {
		rtuColumns
	} from '@/data/columns.js'
	export default {
		name: 'MyRtu',
		components: {
			CopyRtu,
			RtuForm,
			RtuAisle,
			Proportion
		},
		data() {
			return {
				
				tableLoading: false,
				Ewm,
				bigEwm: '',
				ewmTitle: '',
				showEwmModal: false,
				showProportionPage: false,
				rtuNumber: null,
				title: '',
				showAislePage: false,
				showEditorRtu: false,
				copyRtuNumber: null,
				modalTitle: '',
				showModal: false,
				searchKey: '',
				maxId: 0,
				pageSize: 10,
				prevId: [0],
				keyField: 0,
				keyFieList: [{
						id: 0,
						title: '机器名称'
					},
					{
						id: 1,
						title: '机器编号'
					}
				],
				rtuColumns: rtuColumns,
				rtuList: []

			}
		},
		methods: {
			getEwm(item) {
				this.bigEwm = ''
				this.ewmTitle = item.rtuNumber
				this.showEwmModal = true
				getVMRtuQRCode(item.rtuNumber).then(res => {
					const data = res.data
					if (data.success == 1) {
						//console.log(data)
						this.bigEwm = data.qrCodeUrl
					} else {
						this.$Message.error(errorMessage)
					}
				}).catch(error => {
					alert(error)
				})

			},
			closeAislePage() {
				this.showAislePage = false
			},
			creatAisle(data) {
				this.rtuNumber = data.rtuNumber
				this.title = data.rtuNumber
				this.showAislePage = true

			},
			canelModal() {
				this.showEditorRtu = false
			},
			editorRtu(item) {
				this.copyRtuNumber = item.rtuNumber
				this.showEditorRtu = true;
				this.modalTitle = '编辑机器'
				this.showModal = true
			},
			copyRtu(item) {
				this.modalTitle = '复制' + item.rtuNumber + '机器'
				this.copyRtuNumber = item.rtuNumber
				this.showEditorRtu = false
				this.showModal = true
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
			setProportion(item) {
				this.rtuNumber = item.rtuNumber
				this.title = item.rtuNumber
				this.showProportionPage = true

			},
			getRtuList() {
				this.tableLoading = true
				getVMRtuList(this.keyField, this.searchKey, this.maxId, this.pageSize).then(res => {
					const data = res.data
					this.tableLoading = false
					if (data.success == 1) {
						//console.log(data)
						this.rtuList = data.rtuList.map(item => {
							item.checkLoading = false
							item.switchLoading = false
							if (this.maxId < item.id) {
								this.maxId = item.id
							}
							return item

						})
						//this.rtuList = data.rtuList
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.tableLoading = false
					//this.mRtuListLoading = false
					alert(error)
				})
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
			findRtuList(searchKey) {
				//查找机器列表
				this.searchKey = searchKey
				this.maxId = 0
				this.prevId = [0]
				this.getRtuList()
			},
			
		},
		created() {
			this.$route.meta.keepAlive = true
			this.getRtuList()
		},
	
	}
</script>

<style>
	.myRtuStyle .ivu-table-cell {
		padding: 0;
		margin: 0;
	}
</style>
