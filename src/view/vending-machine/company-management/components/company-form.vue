<template>
	<Form ref="companyModel" :model="companyModel" :rules="companyRule" :label-width="80">
		<FormItem label="公司名称" prop="companyName">
			<Input type="text" v-model="companyModel.companyName" placeholder="请输入商品名称"></Input>
		</FormItem>
		<p style="text-align: center;color: red;font-size: 12px;">建议上传图片大小为100px*100px，图片大小不超过50k的图片</p>
		<FormItem label="公司Logo" prop="companyLogo">
			<img style="float: left;margin-right: 16px;" src="../../../../assets/images/雪碧.png" width="50" />

			<Upload multiple style="float: left;" action="//jsonplaceholder.typicode.com/posts/">
				<Button icon="ios-cloud-upload-outline">上传</Button>
			</Upload>

			<!-- <Input type="text" v-model="companyModel.goodsImg" number></Input> -->
		</FormItem>
		<FormItem label="游戏Logo" prop="gameLogo">
			<img style="float: left;margin-right: 16px;" src="../../../../assets/images/雪碧.png" width="50" />
		
			<Upload multiple style="float: left;" action="//jsonplaceholder.typicode.com/posts/">
				<Button icon="ios-cloud-upload-outline">上传</Button>
			</Upload>
		
			<!-- <Input type="text" v-model="companyModel.goodsImg" number></Input> -->
		</FormItem>
		<FormItem label="公司网址" prop="companyUrl">
			<Input type="text" v-model="companyModel.companyUrl" placeholder="请输入商品名称"></Input>
		</FormItem>
		<FormItem label="公司邮箱" prop="companyEmail">
			<Input type="text" v-model="companyModel.companyEmail" placeholder="请输入商品名称"></Input>
		</FormItem>
		<FormItem label="客服电话" prop="companyTel">
			<Input type="text" v-model="companyModel.companyTel" placeholder="请输入商品名称"></Input>
		</FormItem>
		<FormItem label="版权信息" prop="copyright">
			<Input type="text" v-model="companyModel.copyright" placeholder="请输入商品名称"></Input>
		</FormItem>
		<FormItem label="品牌名称" prop="brandName">
			<Input type="text" v-model="companyModel.brandName" placeholder="请输入商品名称"></Input>
		</FormItem>
		<FormItem style="text-align: center;">
			<Button @click="handleReset('companyModel')" style="margin-right: 8px">重置</Button>
			<Button type="primary" @click="handleSubmit('companyModel')">
				<slot></slot>
			</Button>
		</FormItem>
	</Form>
</template>

<script>
	export default {
		name: 'goods_form',
		data() {
			return {
				companyModel: {
					companyName: '',//公司名称
					companyLogo: '',//公司logo
					gameLogo: '',//游戏logo
					companyUrl: '',//公司地址
					companyEmail: '',//公司电话
					companyTel: '',//客服电话
					copyright: '',//版权信息
					brandName: '',//品牌名称
					
				},
				companyRule: [],
				
			}
		}
	}
</script>

<style>
</style>
