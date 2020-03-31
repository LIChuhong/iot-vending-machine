<template>
	<my-rtu v-if="showMyRtu"></my-rtu>
	<m-my-rtu v-else @setScroll="setScroll"></m-my-rtu>
</template>

<script>
	import mMyRtu from '@/view/mVending-machine/m-rtu-management/m-my-rtu/m-my-rtu.vue'
	import MyRtu from '@/view/vending-machine/v-rtu-management/my-rtu/my-rtu.vue'
	import data from '@/data/data'
	export default {
		name: 'c_my_rtu',
		components: {
			mMyRtu,
			MyRtu
		},
		data() {
			return {
				showMyRtu: true,
				scrollTop: 0
			}
		},
		methods: {
			setScroll(val) {
				//console.log(val)
				this.scrollTop = val
			}
		},
		mounted() {},
		created() {
			if (data.interface == 1 || data.interface == 2) {//判断显示手机端还是电脑端
				this.showMyRtu = false
			}

		},
		//在页面离开时记录滚动位置

		

		//进入该页面时，用之前保存的滚动位置赋值
		// beforeRouteEnter(to, from, next) {
		// 	//console.log(this.scrollTop)
		// 	next(vm => {
		// 		console.log(vm)
		// 		document.body.scrollTop = vm.scrollTop
		// 	})
		// },


	}
</script>

<style>
</style>
