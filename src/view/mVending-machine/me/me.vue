<!-- 用户组件 -->
<template>
	<div>
		<List border>
			<template slot="header">
				<div style="overflow: hidden;">
					<div style="float: left;">
						<h2>{{userInfo.userName}}</h2>
						<p>{{userInfo.realName}}-{{userInfo.orgName}}</p>
					</div>
					<div style="float: right;">
						<Avatar :src="userInfo.userHeadImgUrl" size="80" />
					</div>
				</div>
			</template>
			<ListItem v-for="item in meMenuList" :key="item">
				<ListItemMeta :title="item.name">
					<template slot="avatar">
						<Avatar :icon="item.icon" />
					</template>
				</ListItemMeta>
				<template slot="action">
					<div @click="actionPlay(item)">
						<Icon type="ios-arrow-forward" size="30" />
					</div>
				</template>
			</ListItem>

		</List>
		<Modal title='修改密码' v-model="showPwd" footer-hide>
			<reset-pwd v-if="showPwd" :vmUserId ="vmUserId"></reset-pwd>
		</Modal>
	</div>
</template>

<script>
	import ResetPwd from '@/view/mVending-machine/m-user-management/components/reset-pwd.vue'
	export default {
		components:{
			ResetPwd
		},
		data() {
			return {
				vmUserId:null,//用户ID
				showPwd:false,
				userInfo: this.$store.state.user.userInfo,//用户信息
				meMenuList: [{
						name: '修改密码',
						icon: 'ios-key',

					},
					// {
					// 	name:'修改售后电话',
					// 	icon:'ios-key',
					// },
					// {
					// 	name:'修改加盟热线',
					// 	icon:'ios-key',
					// }
				]
			}
		},
		computed:{
			
		},
		methods: {
			actionPlay(item) {
				if (item.name === '修改密码') {
					this.vmUserId = this.userInfo.id
					//console.log(this.vmUserId)
					this.showPwd = true
				}
			}
		}
	}
</script>

<style>
</style>
