<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in" title="欢迎登录" :bordered="false">
				<div class="form-con">
					<login-form @on-success-valid="handleSubmit"></login-form>
					<!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
					<!-- {{msg}} -->
					
					
				</div>
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
					//alert(2)
					this.getUserInfo().then(res => {
						
						// this.$router.push({
						//   name: this.$config.homeName
						// })
						//console.log(this.$config.homeName)
						//MainActivity.saveUserKey('user1','123')
						//console.log(1)
						if (data.interface == 1 || data.interface == 2) {
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
