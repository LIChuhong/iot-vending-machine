<template>
	<div id="app">

		<router-view />
		<!-- <keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view> -->

	</div>
</template>

<script>
	import data from '@/data/data'
	import { setToken } from '@/libs/util'
	export default {
		name: 'App',
		data() {
			return {
				//msg: "哈哈"
			}
		},
		methods: {
			// showAndroidToast() {
			// 	$App.showToast("哈哈，我是js调用的")
			// },
			_isMobile() {
				// let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
				let screenWidth = screen.width
				let screenHeight = screen.height
				let flag = screenWidth < screenHeight
				return flag;
			},
			// updateTokenFunction(str) {
			// 	setToken(str)
			// 	
			// }
		},
		mounted() {
			//将要给原生调用的方法挂载到 window 上面
			//window.updateTokenFunction = this.updateTokenFunction
			//alert(1)
		},
		created() {
			//var show = this.currentTarget.previousElementSibling.innerHTML
			//alert(show)

			if (this._isMobile()) {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					//Ios
					data.interface = 2
				} else if (/(Android)/i.test(navigator.userAgent)) {
					//Android终端
					data.interface = 1
					//window.location = 'http://www.xyfan.top/app.apk'
				}
				//data.interface = 1
				//alert(data.interface);
				//this.$router.replace('/mLogin');
			} else {
				data.interface = 0
				//alert(data.interface);
				//this.$router.replace('/login');
			}
		},
	}
</script>

<style lang="less">
	.size {
		width: 100%;
		height: 100%;
	}

	html,
	body {
		.size;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	#app {
		.size;
	}
</style>
