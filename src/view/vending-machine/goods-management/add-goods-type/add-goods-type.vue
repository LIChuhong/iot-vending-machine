<template>
	<goods-type-form style="width: 50%;margin: 0 auto;">添加</goods-type-form>
</template>

<script>
	import GoodsTypeForm from '../components/goods-type-form.vue'
	export default{
		name:'add_goods_type',
		components:{
			GoodsTypeForm
		},
		data(){
			return{
				
			}
		},
		created() {
			this.$route.meta.keepAlive = true
			
		},
	}
</script>

<style>
</style>
