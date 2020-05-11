<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in" title="欢迎登录" :bordered="false">
				<div class="form-con">
					<!-- <login-form @on-success-valid="handleSubmit" @on-focus ="focus"></login-form> -->
					<login-form v-if="!showLoginForm1" @on-success-valid="handleSubmit"></login-form>
					<login-form1 v-if="showLoginForm1" @on-success-valid="handleSubmit"></login-form1>
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
	// import LoginForm from '_c/login-form'
	import LoginForm from '_c/login-form'
	import LoginForm1 from '_c/login-form1'
	import {
		mapActions
	} from 'vuex'
	export default {
		components: {
			LoginForm,
			LoginForm1
			
		},
		data() {
			return {
				//msg: "哈哈"
				tips: '',
				showLoginForm1:false,
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
				password,
				verCode
			}) {
				//alert(1)
				this.tips = ''
				this.handleLogin({
					userName,
					password,
					verCode
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
			handleSubmitFunction(userName, password) {
				 // alert(userName+password)
				 var verCode = ''
				this.handleSubmit({userName,password,verCode})
			}


		},
		mounted() {
			//将要给原生调用的方法挂载到 window 上面
			window.handleSubmitFunction = this.handleSubmitFunction
			//this.handleSubmitFunction('superadmin',123,'')
			var ua = navigator.userAgent.toLowerCase()
			// /alert(1)
			// console.log(this.showLoginForm1)
			if (ua.indexOf('zrwlweb') > -1) {
				// console.log(this.showLoginForm1)
				this.showLoginForm1 = true
				//将要给原生调用的方法挂载到 window 上面
			}else{
				// console.log(this.showLoginForm1 + 1)
				 // this.showLoginForm1 = false
				 this.showLoginForm1 = false
			}

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
