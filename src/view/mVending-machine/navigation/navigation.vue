<template>
	<Layout style="padding: 0;background: #f5f7f9;">
		<!-- <Sider> -->
		<Layout>
			<Header style="color: #FFFFFF;text-align: center;position: relative;">
				<div style="position: absolute;left: 0.625rem;" @click="handleDrawer">
					<Icon type="ios-menu" size="45" />
				</div>

				<h2>{{menuText}}</h2>
			</Header>
		</Layout>
		<Layout>
			<Content style="position: absolute;width: 100%;bottom:3.125rem;top:3.125rem;overflow: auto;">
				<!-- <keep-alive :include="cacheList"> -->

				<router-view />

				<!-- </keep-alive> -->
			</Content>
		</Layout>
		<Layout>
			<!-- <Footer class="foot-style"> -->
			<div class="foot-style">
				<Menu mode="horizontal" :active-name="activeName" ref="activeName" @on-select="onSelect">
					<MenuItem v-for="item in mMenuList" :key="item" :name="item.name" :to="item.to" class="foot-menu-style">
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
				<div style="height:1.3125rem;text-align: center;">
					<p>自然物联</p>
				</div>
			</template>
			<Menu mode="vertical" :active-name="activeName" @on-select="onSelect">
				<Submenu :name="item.name" v-for="item in mLMenuList" :key="item">
					<template slot="title">
						<Icon type="ios-cog" />
						{{item.title}}
					</template>
					<MenuItem v-for="i in item.children" :key="i" :name="item.name" :to="i.to" style="overflow: hidden;">
					<Icon size="20" :type="i.iconType" /><span>{{i.menuText}}</span>
					<Icon size="20" type="ios-arrow-forward" style="float: right;" />
					</MenuItem>
				</Submenu>
			</Menu>
		</Drawer>
	</Layout>

</template>

<script>
	export default {
		data() {
			return {
				drawerValue: false,
				theme1: 'dark',
				activeName: 'm_earnings',
				menuText: '收益',
				mMenuList: [{
						menuText: '收益',
						name: 'm_earnings',
						to: '/m_earnings',
						iconType: 'ios-happy'
					},
					{
						menuText: '补货',
						name: 'm_replenishment',
						to: '/m_replenishment',
						iconType: 'ios-happy'
					},
					{
						menuText: '订单处理',
						name: 'm_order_dealing',
						to: '/m_order_dealing',
						iconType: 'ios-happy'
					},
					{
						menuText: '我',
						name: 'me',
						to: '/me',
						iconType: 'ios-happy'
					}
				],
				mLMenuList: [{
						title: '货机管理',
						name: '1',
						children: [{
								menuText: '补货记录',
								name: 'm_replenishment_record',
								to: '/m_replenishment_record',
								iconType: 'ios-happy'
							},
							{
								menuText: '出货明细',
								name: 'm_shipping_detail',
								to: '/m_shipping_detail',
								iconType: 'ios-happy'
							},
							{
								menuText: '机器测试',
								name: 'm_rtu_test',
								to: '/m_rtu_test',
								iconType: 'ios-happy'
							},
							{
								menuText: '创建机器',
								name: 'm_create_rtu',
								to: '/m_create_rtu',
								iconType: 'ios-happy'
							},
							{
								menuText: '检测在线',
								name: 'm_monitor_online',
								to: '/m_monitor_online',
								iconType: 'ios-happy'
							},
						],
					},
					{
						title: '订单管理',
						name:'2',
						children:[{
							menuText: '收益',
							name: 'm_monitor_online',
							to: '/m_monitor_online',
							iconType: 'ios-happy'
						},
						{
							menuText: '销售明细',
							name: 'm_monitor_online',
							to: '/m_monitor_online',
							iconType: 'ios-happy'
						},
						]
					}

				]
			}
		},
		watch: {},
		methods: {
			handleDrawer() {
				this.drawerValue = true
			},
			changeMenuText(list, val) {
				var test = false
				list.map(item => {
					if (item.name == val) {
						this.menuText = item.menuText
						test = true
					}
				})
				return test

			},
			onSelect(val) {
				this.drawerValue = false
				this.activeName = val
				var test = this.changeMenuText(this.mMenuList, val)
				if (!test) {
					this.changeMenuText(this.mLMenuList, val)
				}
				this.$router.push({
					name: val,
				})

			}
		},
		mounted() {
			this.$nextTick(() => {
				if (this.$route.path.slice(1) == "") {
					this.activeName = 'm_earnings'
				} else {
					this.activeName = this.$route.path.slice(1)
				}
				var test = this.changeMenuText(this.mMenuList, this.activeName)
				if (!test) {
					this.changeMenuText(this.mLMenuList, this.activeName)
				}
				this.$refs.activeName.updateActiveName()
			})
		},

	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {

		.ivu-layout-header {
			height: 50px;
			line-height: 50px;
		}

		.foot-menu-style {
			padding: 0 0;

		}

		.foot-style .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
			color: #fff;

		}

		.foot-style .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
			color: #2D8cF0;
			border-bottom: 0px solid #515a6e;
		}

		.foot-style .ivu-menu-dark {
			/* background: #001529; */
		}

		.foot-style .ivu-menu-horizontal {
			height: 50px;
			line-height: 10px
		}

		.foot-style .ivu-menu {
			/* color: #515a6e; */
			background: #515a6e;
			font-size: 14px;
			position: fixed;
			bottom: 0;
			width: 100%;
			z-index: 900;
			/* top: 3.125rem; */
			left: 0
		}

		.foot-style .ivu-menu .ivu-icon {
			padding: 0.3125rem;
		}

		.foot-style .ivu-menu-item {

			font-size: 14px;
			position: relative;
			width: 25%;
			padding: 0;
			text-align: center;
		}

		.navDrawer .ivu-drawer-body {
			padding: 0;
		}

		.navDrawer .ivu-menu-vertical .ivu-menu-item {
			width: 100%;
			border-bottom: 0.0625rem solid #e8eaec;
		}

		.navDrawer .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
			width: 0;
		}
	}
	
</style>
