<template>
	<div style="height: 100%;">
		<Layout style="height: 100%;" class="main" v-if="show == 'pc'">
			<Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
				<side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage"
				 :menu-list="menuList">
					<!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
					<div class="logo-con">
						<img v-show="!collapsed" :src="maxLogo" key="max-logo" />
						<img v-show="collapsed" :src="minLogo" key="min-logo" />
					</div>
				</side-menu>
			</Sider>
			<Layout>
				<Header class="header-con">
					<header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
						<user :message-unread-count="unreadCount" :user-avatar="userAvatar" />
						<language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local" />
						<error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage"
						 :count="errorCount"></error-store>
						<fullscreen v-model="isFullscreen" style="margin-right: 10px;" />
					</header-bar>
				</Header>
				<Content class="main-content-con">
					<Layout class="main-layout-con">
						<div class="tag-nav-wrapper">
							<tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag" />
						</div>
						<Content class="content-wrapper">

							<!-- <router-view /> -->
							<keep-alive>
								<router-view v-if="$route.meta.keepAlive"></router-view>
							</keep-alive>
							<router-view v-if="!$route.meta.keepAlive"></router-view>
							<ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
						</Content>
					</Layout>
				</Content>
			</Layout>
		</Layout>
		<Layout v-if="show == 'mobile'" style="padding: 0;background: #f5f7f9;">
			<Layout>

				<Header style="color: #FFFFFF;text-align: center;position: relative;">
					<div v-if="replenishment" style="position: absolute;left: 0.625rem;" @click="handleDrawer">
						<Icon type="ios-menu" size="45" />
					</div>


					<span style="font-size: 1.25rem;">{{menuText}}</span>
					<div style="position: absolute;right: 0.625rem;top:0">
						<user :message-unread-count="unreadCount" :user-avatar="userAvatar" />
					</div>
				</Header>
			</Layout>
			<Layout>
				<Content style="position: absolute;width: 100%;bottom:3.125rem;top:3.125rem;overflow: auto;">
					
					<keep-alive>
						<router-view v-if="$route.meta.keepAlive"></router-view>
					</keep-alive>
					<router-view v-if="!$route.meta.keepAlive"></router-view>

				</Content>
			</Layout>
			<Layout>
				<!-- <Footer class="foot-style"> -->
				<div class="foot-style">
					<Menu mode="horizontal" :active-name="activeName" ref="activeName" @on-select="turnToPage">
						<MenuItem v-if="replenishment" v-for="item in mMenuList" :key="item" :name="item.name" :to="item.to" class="foot-menu-style">
						<div>
							<Icon size="20" :type="item.iconType" />
						</div>
						<span>{{item.menuText}}</span>
						</MenuItem>
					</Menu>
				</div>
				<!-- </Footer> -->
			</Layout>
			<Drawer width="240" placement="left" :closable="false" v-model="drawerValue" class="navDrawer">
				<template slot="header">
					<div style="height:3.125rem;text-align: center;">
						<img style="height: 100%;" :src="maxLogo" key="max-logo" />
					</div>
				</template>

				<Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
					<side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage"
					 :menu-list="menuList">
						<!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->

					</side-menu>
				</Sider>
			</Drawer>
		</Layout>
	</div>
</template>
<script>
	import SideMenu from './components/side-menu'
	import HeaderBar from './components/header-bar'
	import TagsNav from './components/tags-nav'
	import User from './components/user'
	import ABackTop from './components/a-back-top'
	import Fullscreen from './components/fullscreen'
	import Language from './components/language'
	import ErrorStore from './components/error-store'
	import {
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		getNewTagList,
		routeEqual
	} from '@/libs/util'
	import routers from '@/router/routers'
	import minLogo from '@/assets/images/logo-min.jpg'
	import maxLogo from '@/assets/images/logo.png'
	import data from '@/data/data'
	import {
		setToken
	} from '@/libs/util'
	//import mReplenishment from '@/view/mVending-machine/m-replenishment/m-replenishment.vue'
	import './main.less'
	export default {
		name: 'Main',
		components: {
			SideMenu,
			HeaderBar,
			Language,
			TagsNav,
			Fullscreen,
			ErrorStore,
			User,
			ABackTop,
			//mReplenishment
		},
		data() {
			return {
				//unreadCount:this.$store.state.user.unreadCount,
				replenishment: true,
				collapsed: false,
				minLogo,
				maxLogo:this.$store.state.user.userInfo.orgLogoUrl,
				isFullscreen: false,
				show: 'pc',
				drawerValue: false,
				theme1: 'dark',
				activeName: 'm_earnings',
				menuText: '近日收益',
				mMenuList: [{
						menuText: '近日收益',
						name: 'm_earnings',
						to: '/m_earnings',
						iconType: ' iconfont icon-sy'
					},
					{
						menuText: '补货',
						name: 'm_replenishment',
						to: '/m_replenishment',
						iconType: ' iconfont icon-bh'
					},
					{
						menuText: '订单处理',
						name: 'm_order_dealing',
						to: '/m_order_dealing',
						iconType: ' iconfont icon-ddcl'
					},
					{
						menuText: '我',
						name: 'me',
						to: '/me',
						iconType: ' iconfont icon-w'
					}
				],
			}
		},
		created() {
			//console.log(data.interface)
			if (data.interface == 1 || data.interface == 2) {
				this.show = 'mobile'
				if (this.$store.state.user.userInfo.userRolesId == 3) {
					this.replenishment = false
				}
				//console.log(this.$store.state.user.userInfo)
			} else {
				this.show = 'pc'
			}
			//console.log(this.showPc)

		},
		computed: {

			...mapGetters([
				'errorCount'
			]),
			tagNavList() {
				return this.$store.state.app.tagNavList
			},
			tagRouter() {
				return this.$store.state.app.tagRouter
			},
			userAvatar() {
				return this.$store.state.user.avatarImgPath
			},
			cacheList() {
				const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache))
					.map(item => item.name) : []
				]
				return list
			},
			menuList() {
				
				return this.$store.getters.menuList
			},
			local() {
				return this.$store.state.app.local
			},
			hasReadErrorPage() {
				return this.$store.state.app.hasReadErrorPage
			},
			unreadCount() {
				return this.$store.state.user.unreadCount
			}
			
		},
		methods: {
			...mapMutations([
				'setBreadCrumb',
				'setTagNavList',
				'addTag',
				'setLocal',
				'setHomeRoute',
				'closeTag'
			]),
			...mapActions([
				'handleLogin',
				//'getUnreadMessageCount',
				'setMenuList'
			]),
			updateTokenFunction(str) {
				setToken(str)
			},
			turnToPage(route) {
				let {
					name,
					params,
					query
				} = {}
				if (typeof route === 'string') name = route
				else {
					name = route.name
					params = route.params
					query = route.query
				}
				if (name.indexOf('isTurnByHref_') > -1) {
					window.open(name.split('_')[1])
					return
				}
				
				this.$router.push({
					name,
					params,
					query
				})
				// this.$router.replace({
				// 	name,
				// 	params,
				// 	query
				// })
				// 
			},
			handleCollapsedChange(state) {
				this.collapsed = state
			},
			handleCloseTag(res, type, route) {
				if (type !== 'others') {
					if (type === 'all') {
						this.turnToPage(this.$config.homeName)
					} else {
						if (routeEqual(this.$route, route)) {
							//console.log(this.$route + 1)
							this.$route.meta.keepAlive = false
							this.closeTag(route)
						}
					}
				}
				this.setTagNavList(res)
			},
			handleClick(item) {
				//console.log(item)
				this.turnToPage(item)
			},
			handleDrawer() {
				this.drawerValue = true
			},

		},
		watch: {
			'$route'(newRoute) {
				const {
					name,
					query,
					params,
					meta
				} = newRoute
				this.addTag({
					route: {
						name,
						query,
						params,
						meta
					},
					type: 'push'
				})
				if (this.show == 'mobile') {
					this.drawerValue = false
					this.activeName = newRoute.name
					this.menuText = newRoute.meta.title
				}
				//console.log(newRoute)
				this.setBreadCrumb(newRoute)
				this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
				this.$refs.sideMenu.updateOpenName(newRoute.name)
			}
		},
		mounted() {
			/**
			 * @description 初始化设置面包屑导航和标签导航
			 */
			window.updateTokenFunction = this.updateTokenFunction
			this.setTagNavList()
			this.setHomeRoute(routers)
			const {
				name,
				params,
				query,
				meta
			} = this.$route
			if (this.show == 'mobile') {
				if (this.$store.state.user.userInfo.userRolesId == 3) {
					this.$router.push({
						name: 'm_replenishment'
					})
				}else{
					this.$refs.activeName.updateActiveName()
				}
				this.activeName = this.$route.path.slice(1)
				this.menuText = this.$route.meta.title


			}
			this.addTag({
				route: {
					name,
					params,
					query,
					meta
				}
			})
			//console.log(this.$route)
			this.setBreadCrumb(this.$route)
			// 设置初始语言
			this.setLocal(this.$i18n.locale)
			// 如果当前打开页面不在标签栏中，跳到homeName页
			if (!this.tagNavList.find(item => item.name === this.$route.name)) {
				this.$router.push({
					name: this.$config.homeName
				})
			}
			// 获取未读消息条数
			//this.getUnreadMessageCount()
			this.setMenuList()
		}

	}
</script>
<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.navDrawer .ivu-drawer-header {
			padding: 0;
			border-bottom: 0px;
			background: #515a6e;
		}

		.navDrawer .ivu-drawer-body {
			background: #515a6e;
			overflow: hidden;

		}
	}
</style>
