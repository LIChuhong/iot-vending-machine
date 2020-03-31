<template>
	<div>

		<div>
			<Table show-summary sum-text="合计" size="small" border :columns="proportionColumns" :data="proportionList" :loading="proportionTableLoading">
				<template slot="footer">
					<div style="overflow: hidden;padding: 0.625rem 0.625rem">
						<Button style="float: left;" type="primary" size="small" icon="md-add" @click="addPayee">添加</Button>
						<Button style="float: right;" type="primary" size="small" @click="setProportion('设置成功')">设置</Button></div>
					<!-- <Button type="success" icon="md-key" size="small" @click="userDel(row)"></Button> -->
				</template>
			</Table>
		</div>
	</div>
</template>

<script>
	import {
		proportionColumns
	} from '@/data/columns1'
	import {
		getProportionsList,
		updateRtuProportions
	} from '@/api/rtu'
	export default {
		name: 'proportion',
		props: ['rtuNumber'],
		data() {
			return {
				proportionColumns: [],
				proportionList: [],
				proportionTableLoading: false,
				//rtuNumber: this.$route.query.rtuNumber,
			}
		},
		methods: {
			setProportion(tips) {
				let num = 0
				let eMailNum = 0
				let name = ''
				let proportionsList = []
				let list = this.proportionList
				for(var i = 0;i<list.length;i++){
					if(list[i].eMail != '' && list[i].realName != '' && list[i].proportion != ''){
						if (name != list[i].eMail) {
							name = list[i].eMail
						} else {
							eMailNum++
						}
						num += parseFloat(list[i].proportion)
						list[i].proportion = parseFloat(list[i].proportion)
						proportionsList.push(list[i])
					}
				}
				if (num > 1 || num < 0) {
					this.$Message.warning('分成比例总和不能大于1或少于0，请重新设置')
				} else if (eMailNum > 0) {
					this.$Message.warning('分账账号不能相同，请重新设置')
				} else {
					const rtuProportions = {
						rtuNumber: this.rtuNumber,
						proportionsList: proportionsList
					}

					updateRtuProportions(rtuProportions).then(res => {
						const data = res.data
						if (data.success == 1) {
							this.$Message.success(tips)
						} else {
							this.$Message.error(data.errorMessage)
						}
					}).catch(error => {
						alert(error)
					})
				}

			},
			addPayee() {
				this.proportionList.push({
					"eMail": '',
					"realName": "",
					"proportion": '',
					"platform": false,
					"$isEdit": true
				})
			},
			delproportion(row, index) {

				this.proportionList.splice(index, 1)
				//console.log(this.proportionList)
			}

		},
		mounted() {
			this.proportionColumns = proportionColumns.map(res => {
				if (res.edit) {
					res.render = (h, {
						column,
						row,
						index
					}) => {
						if (row.$isEdit) {
							let type = 'text'
							if (column.key == 'proportion') {
								type = 'number'
							}
							return h('Input', {
								props: {
									type: type,
									value: row[column.key]
								},
								on: {
									'on-blur': event => {
										this.proportionList[index][column.key] = event.target.value;
									},
								}
							});
						} else {
							return h('div', row[res.key]);
						}

					}
				} else {
					res.render = (h, {
						column,
						row,
						index
					}) => {
						if (this.$store.state.user.userInfo.orgId == "0" && this.$store.state.user.userInfo.level == 0) {

							if (row.$isEdit) {
								return h('Radio', {
									props: {
										value: row.platform
									},
									on: {
										'on-change': value => {
											row.platform = value;
											//console.log(this.proportionList[index])
										}
									}

								});
							} else {
								return h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.delproportion(row, index)
										}
									}
								}, '删除')
							}
						} else if (!row.platform) {
							return h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.delproportion(row, index)
									}
								}
							}, '删除')
						}

					}
				}
				//console.log(res)
				return res;
			})
		},
		created() {
			getProportionsList(this.rtuNumber).then(res => {
				const data = res.data
				
				if (data.success == 1) {
					if (data.proportionsList) {
						//console.log(dat)
						const list = data.proportionsList
						for(var i =0 ; i< list.length ;i++){
							if(list[i] != null){
								list[i].$isEdit = false
								this.proportionList.push(list[i])
							}
						}

// 						this.proportionList = data.proportionsList.map(item => {
// 							if (item != null) {
// 								console.log(item)
// 								item.$isEdit = false
// 								return item
// 							}else{
// 								
// 							}
// 
// 
// 						})
					}

					//console.log(this.proportionList)
				} else {
					this.$Message.error(data.errorMessage)
				}
			}).catch(error => {
				alert(error)
			})
		}
	}
</script>

<style>
</style>
