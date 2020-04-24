<template>
	<rtu-form class="addRtuStyle">添加</rtu-form>
</template>

<script>
	import RtuForm from'../components/rtu-form.vue'
	export default{
		name:'add_rtu',
		components:{
			RtuForm
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
	.addRtuStyle{
		width: 50%;
		margin: 0 auto;
		
	}
	@media screen and (min-width:300px) and (max-width:900px) {
		.addRtuStyle{
			width: 90%;
			margin: 0 auto;
			padding-top: 0.3125rem;
			
		}
	}
</style>
