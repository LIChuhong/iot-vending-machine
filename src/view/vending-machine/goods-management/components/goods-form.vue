<template>
	<Form ref="goodsModel" :model="goodsModel" :rules="goodsRule" :label-width="80">
		<FormItem label="商品名称" prop="goodsName">
			<Input type="text" v-model="goodsModel.goodsName" placeholder="请输入商品名称"></Input>
		</FormItem>
		<FormItem label="商品类型" prop="goodsType">
			<Select v-model="goodsModel.goodsType" placeholder="请选择商品类型">
				<Option v-for="item in goodsTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
		</FormItem>
		<p style="text-align: center;color: red;font-size: 12px;">建议上传图片大小为100px*100px，图片大小不超过50k的图片</p>
		<FormItem label="商品图片" prop="goodsImg">
			<img style="float: left;margin-right: 16px;" src="../../../../assets/images/雪碧.png" width="100" />

			<Upload multiple style="float: left;" action="//jsonplaceholder.typicode.com/posts/">
				<Button icon="ios-cloud-upload-outline">上传</Button>
			</Upload>

			<!-- <Input type="text" v-model="goodsModel.goodsImg" number></Input> -->
		</FormItem>
		<FormItem style="text-align: center;">
			<Button @click="handleReset('goodsModel')" style="margin-right: 8px">重置</Button>
			<Button type="primary" @click="handleSubmit('goodsModel')">
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
				goodsModel: {
					goodsName: '',
					goodsType: '',
					goodsImg: '',
				},
				goodsRule: [],
				goodsTypeList:[
					{
						value:'1',
						label:'烟'
					}
				]
			}
		}
	}
</script>

<style>
</style>
