<template>
	<company-form style="width: 50%;margin: 0 auto;">添加</company-form>
</template>

<script>
	import companyForm from '../components/company-form.vue'
	export default{
		name:'add_company',
		components: {
			companyForm
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
