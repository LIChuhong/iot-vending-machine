<template>
	<div>
		<Form ref="goodsModel" :model="goodsModel" :rules="goodsRule" :label-width="80">
			<FormItem label="商品名称" prop="commodityName">
				<Input type="text" :maxlength="30" v-model="goodsModel.commodityName" placeholder="请输入商品名称"></Input>
			</FormItem>
			<FormItem label="商品类别" prop="commodityTypeId">
				<Select v-model="goodsModel.commodityTypeId" placeholder="请选择商品类别">
					<Option v-for="item in goodsTypeList" :value="item.id" :key="item.id">{{ item.commodityTypeName}}</Option>
				</Select>
			</FormItem>

			<FormItem label="商品图片" prop="commodityImgUrl">
				<Upload type="drag" ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
				 :max-size="50" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadAction" style="display: inline-block;width:100px;float: left;"
				 :headers="uploadHeaders" :on-error="handleError">
					<div style="width: 100px;height:100px;line-height: 100px;">
						<Icon type="ios-camera" size="20"></Icon>
						<img :src="goodsModel.commodityImgUrl" style="height: 100%;width: 100%;position: absolute;top:0;left: 0;" />
					</div>
				</Upload>
				<p style="text-align: center;color: red;font-size: 12px;">建议上传图片大小为100px*100px，图片大小不超过50k的图片</p>

			</FormItem>

			<FormItem style="text-align: center;">
				<Button type="primary" @click="handleSubmit('goodsModel')">
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
		getCommodityTypeList,
		addCommodity,
		getCommodity,
		updateCommodity
	} from '@/api/commodity'
	import data from '@/data/data'
	export default {
		name: 'goods_form',
		props:['goodsId'],
		data() {
			return {
				showSpin: false,
				uploadAction: this.$config.baseUrl.dev + '/api2.0/uploadFiles',
				uploadHeaders: {
					From: data.interface,
					Token: this.$store.state.user.token,
					Dir: '/uploadFile/commodityImages/'
				},
				goodsModel: {
					commodityName: '',
					commodityTypeId: '',
					commodityImgUrl: '/uploadFile/defaultImages/commodity.png',
				},
				goodsRule: {
					commodityName: [{
						required: true,
						//type: 'number',
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					commodityTypeId: [{
						required: true,
						type: 'number',
						message: '请选择商品类别',
						trigger: 'blur'
					}],

				},
				goodsTypeList: []
			}
		},
		watch:{
			goodsId(val){
				this.getGoodsInfo()
			}
		},

		methods: {
			getGoodsInfo(){
				if(this.goodsId){
					getCommodity(this.goodsId).then(res=>{
						const data = res.data
						if(data.success == 1){
							this.goodsModel = data.commodity
						}else{
							this.$Message.error(data.errorMessage)
						}
					}).catch(error=>{
						alert(error)
					})
				}
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						// if (this.rtuNumber) {
						this.showSpin = true
						if(this.goodsId){
							updateCommodity(this.goodsModel).then(res => {
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
							addCommodity(this.goodsModel).then(res => {
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
						

					} else {
						this.$Message.error('Fail!');
					}
				})
			},

			handleSuccess(response) {
				//console.log(response)
				if (response.success == 1) {
					this.goodsModel.commodityImgUrl = response.srcList.toString()
				} else {
					this.$Message.error(response.errorMessage);
				}
			},
			handleError(error){
				this.$Message.error(error);
			},
			handleFormatError(file) {
				this.$Message.warning('上传格式错误，请选择jpg/jpeg/png图片');
			},
			handleMaxSize(file) {
				this.$Message.warning('上传图片过大，请选择少于50kb的图片上传');
			},
		},
		created() {
			getCommodityTypeList().then(res => {
				const data = res.data
				if (data.success == 1) {
					this.goodsTypeList = data.commodityTypeList
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
