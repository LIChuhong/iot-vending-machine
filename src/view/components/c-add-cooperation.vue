<template>
	<div class="cooperStyle">
	<m-add-cooperation ></m-add-cooperation>
	</div>
</template>

<script>
	import mAddCooperation from '@/view/mVending-machine/m-cooper-management/m-add-cooperation/m-add-cooperation.vue'
	export default {
		name: 'c_add_cooperation',
		components: {
			mAddCooperation
		},

	}
</script>

<style>
	.cooperStyle {
		width: 60%;
		margin: 0 auto;
	}
	@media screen and (min-width:300px) and (max-width:900px) {
		.cooperStyle {
			width: 100%;
		}
	}
</style>
