<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Input v-model="payeeName" search enter-button placeholder="请输入收款人关键字" @on-search="findPayList" style="width: 60%;float: left;" />
		</div>
		<Table class="payChildTableStyle" border :loading="tableLoading" size="small" :columns="payColumns" :data="payList">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" @click="choosePayIdInfo(row)">选择</Button>
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
		payChildColumns
	} from '@/data/columns.js'
	
	import {
		getJDPayInfoList
	} from '@/api/pay'
	export default {
		name: 'pay_child_list',
		data() {
			return {
				merchantNo:'',//商户号
				payeeName: '',//收款人
				maxId: 0,
				pageSize: 10,
				payColumns: payChildColumns,
				payList: [],//支付列表
				prevId: [0],
				tableLoading: false,
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
			getPayInfoList() {//获取支付列表
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
					alert(error)
					this.tableLoading = false
				})
			},
			findPayList() {//查找支付
				this.maxId = 0
				this.prevId = [0]
				this.getPayInfoList()

			},
			choosePayIdInfo(row) {//获取支付信息
				this.$emit('getPayIdInfo',row)

			},
		
		},
		created() {
			this.getPayInfoList()
		}

	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.payChildTableStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
	}
	
</style>
