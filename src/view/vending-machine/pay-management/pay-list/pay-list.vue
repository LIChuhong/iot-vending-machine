<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input search enter-button placeholder="请输入收款人关键字" @on-search="findPayList" style="width: 30%;float: left;" />
		</div>
		<Table :loading="tableLoading" size="small" border :columns="payColumns" :data="payList">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" icon="md-create" @click="payEditor(row)">编辑</Button>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		</div>
		<Modal v-model="showPayEditor" title="编辑用户信息" footer-hide>
			<pay-form :merchantNo = "merchantNo">修改</pay-form>
		</Modal>
	</div>
</template>

<script>
	import {
		payColumns
	} from '@/data/columns.js'
	import payForm from '../components/pay-form.vue'
	import {
		getJDPayInfoList
	} from '@/api/pay'
	export default {
		name: 'pay_list',
		components: {
			payForm
		},
		data() {
			return {
				merchantNo:'',
				payeeName: '',
				maxId: 0,
				pageSize: 10,
				payColumns: payColumns,
				payList: [],
				showPayEditor: false,
				prevId: [0],
				tableLoading: false
			}
		},
		methods: {
			nextPage() {
				if (this.payList.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					this.prevId.push(this.maxId)
					this.getPayInfoList()
				}
			},
			prevPage() {
				if (this.prevId.length > 1) {
					this.prevId.pop()
					this.maxId = this.prevId[this.prevId.length - 1]
					this.getPayInfoList()
				} else {
					this.$Message.warning('这是第一页');
				}
			},
			getPayInfoList() {
				this.tableLoading = true
				getJDPayInfoList(this.payeeName, this.maxId, this.pageSize).then(res => {
					const data = res.data
					this.tableLoading = false
					if (data.success == 1) {
						//console.log(data)
						data.jdPayInfoList.map(item=>{
							if (this.maxId < item.id) {
								this.maxId = item.id
							}
						})
						this.payList = data.jdPayInfoList
					} else {
						this.$Message.error(data.errorMessage)
					}
				}).catch(error => {
					this.tableLoading = false
					alert(error)
				})
			},
			findPayList(payeeName) {
				this.payeeName = payeeName
				this.maxId = 0
				this.prevId = [0]
				this.getPayInfoList()

			},
			payEditor(row) {
				this.merchantNo = row.merchantNo
				this.showPayEditor = true

			},
		
		},
		created() {
			this.getPayInfoList()
		}

	}
</script>

<style>
</style>
