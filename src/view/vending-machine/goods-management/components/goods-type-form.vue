<template>
	<div>
		<Form ref="goodsType" :model="goodsType" :rules="goodsTypeRule" :label-width="110">
			<FormItem label="商品类型名称" prop="commodityTypeName">
				<Input type="text" :maxlength="30" v-model="goodsType.commodityTypeName" placeholder="请输入商品类型名称">
				</Input>
			</FormItem>
			<FormItem style="text-align: center;">
				<Button type="primary" @click="handleSubmit('goodsType')">
					<slot></slot>
				</Button>
			</FormItem>
		</Form>
		<Spin v-show="showSpin" class="show-spin-style">
			<Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
			<!-- <div>复制中...</div> -->
		</Spin>
	</div>
</template>

<script>
	import {
		addCommodityType,
		updateCommodityType
	} from '@/api/commodity'
	export default {
		name: 'copy_rtu',
		props: ['goodsTypeInfo'],
		data() {
			return {
				showSpin: false,
				goodsType: {
					commodityTypeName: ''
				},
				goodsTypeRule: {
					commodityTypeName: [{
						required: true,
						//type: 'number',
						message: '请输入商品类型名称',
						trigger: 'blur'
					}]
				}

			}
		},
		watch:{
			goodsTypeInfo(val){
				if(val.id){
					this.goodsType.commodityTypeName = val.commodityTypeName
					this.goodsType.id =  val.id
				}
			}
		},
		methods: {
			handleSubmit(name) {

				this.$refs[name].validate((valid) => {
					if (valid) {
						// if (this.rtuNumber) {
						// this.showSpin = true
						// alert(1)
						if(this.goodsType.id != null && this.goodsType.id != ''){
							// alert(2)
							this.goodsType.id = this.goodsTypeInfo.id
							updateCommodityType(this.goodsType).then(res => {
								const data = res.data
								this.showSpin = false
								if (data.success == 1) {
									this.$Message.success('修改成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})
						}else{
							// alert(3)
							addCommodityType(this.goodsType).then(res => {
								const data = res.data
								this.showSpin = false
								if (data.success == 1) {
									this.$Message.success('添加成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								this.showSpin = false
								alert(error)
							})
						}
						
						// }

					} else {
						//this.$Message.error('Fail!');
					}
				})
			},

		},

	}
</script>

<style>
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
</style>
