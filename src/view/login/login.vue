<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in" title="欢迎登录" :bordered="false">
				<div class="form-con">
					<login-form @on-success-valid="handleSubmit" @on-focus ="focus"></login-form>
				</div>
				<p style="color: #FF0000;text-align: center;">{{tips}}</p>
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
				tips: ''
			}
		},
		methods: {
			...mapActions([
				'handleLogin',
				'getUserInfo'
			]),
			focus(val){
				this.tips = ''
			},
			handleSubmit({
				userName,
				password
			}) {
				//alert(1)
				this.tips = ''
				this.handleLogin({
					userName,
					password
				}).then(res => {
					//console.log()
					const data1 = res.data
					if (data1.success == 1) {
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
							if(res.success == 1){
								if (data.interface == 1 || data.interface == 2) {
									this.$router.push({
										name: this.$config.mHomeName
									})
								} else {
									this.$router.push({
										name: this.$config.homeName
									})
								}
							}else{
								this.tips = res.errorMessage
							}
							
						}).catch(error=>{
							this.tips = error
						})
					} else {
						//this.$Message.error
						this.tips = data1.errorMessage
					}

				}).catch(error=>{
					this.tips = error
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
