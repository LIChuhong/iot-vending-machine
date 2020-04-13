<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in" title="欢迎登录" :bordered="false">
				<div class="form-con">
					<login-form @on-success-valid="handleSubmit"></login-form>

				</div>
				<!-- <Spin fix>
					<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
					<div>登录中...</div>
				</Spin> -->
			</Card>
		</div>
	</div>
</template>

<script>
	import data from '@/data/data'
	import LoginForm from '_c/login-form'
	import {
		mapActions
	} from 'vuex'
	export default {
		components: {
			LoginForm
		},
		data() {
			return {
				//msg: "哈哈"
			}
		},
		methods: {
			...mapActions([
				'handleLogin',
				'getUserInfo'
			]),

			handleSubmit({
				userName,
				password
			}) {
				//alert(1)
				this.handleLogin({
					userName,
					password
				}).then(res => {
					var ua = navigator.userAgent.toLowerCase()
					if (ua.indexOf('zrwlweb') > -1) {
						try {
							$App.saveUserKey(userName, password)
						} catch (e) {
							//TODO handle the exception
							//alert(e)
						}
					}
					this.getUserInfo().then(res => {
						if (data.interface == 1 || data.interface == 2) {

							//$App.saveUserKey(userName, password)

							this.$router.push({
								name: this.$config.mHomeName
								// name:one
							})
						} else {
							this.$router.push({
								name: this.$config.homeName
								// name:one
							})
						}
					})
				})
			},


		},
		mounted() {

			//window.updateTokenFunction = this.updateTokenFunction
		}



	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:780px) {
		.login {
			width: 100%;
			height: 100%;
		}

		.login-con {
			/* width: 200px; */
			right: 5%;
			margin: 0 5% 0 5%;
		}
	}
</style>
