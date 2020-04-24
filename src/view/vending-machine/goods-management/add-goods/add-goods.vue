<template>
	<goods-form style="width: 50%;margin: 0 auto;">
		<slot>添加</slot>
	</goods-form>
</template>

<script>
	import goodsForm from '../components/goods-form.vue'
	export default{
		name:'add_goods',
		components: {
			goodsForm
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
