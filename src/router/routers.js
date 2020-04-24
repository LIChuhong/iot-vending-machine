//import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export default [{
		path: '/login',
		name: 'login',
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		},
		//component: () => import('@/view/login/login.vue')
		component: resolve => require(['@/view/login/login.vue'], resolve)
	},

	{
		path: '/',
		name: '_home',
		redirect: '/home',
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		//component: resolve => require(['@/components/iot-index'], resolve),
		meta: {
			hideInMenu: true,
			notCache: true
		},
		children: [{
			path: '/home',
			name: 'home',
			meta: {
				hideInMenu: true,
				title: '首页',
				notCache: true,
				icon: 'md-home'
			},
			//component: () => import('@/view/single-page/home')
			component: resolve => require(['@/view/single-page/home'], resolve)
		}]
	},

	{
		path: '/v_rtu_management',
		name: 'v_rtu_management',
		meta: {
			icon: ' iconfont icon-hjgl',
			title: '货机管理'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [
			
			{
				path: 'm_my_rtu',
				name: 'm_my_rtu',
				meta: {
					icon: ' iconfont icon-wdjq',
					title: '我的机器',
					keepAlive: false
				},
				component: resolve => require(['@/view/mVending-machine/m-rtu-management/m-my-rtu/m-my-rtu.vue'], resolve)
				//component: () => import('@/view/vending-machine/org/orgLists/orgLists.vue')
			},
			{
				path: 'my_rtu',
				name: 'my_rtu',
				meta: {
					icon: ' iconfont icon-wdjq',
					title: '我的机器',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/v-rtu-management/my-rtu/my-rtu.vue'], resolve)
				//component: () => import('@/view/vending-machine/org/orgLists/orgLists.vue')
			},
			{
				path: 'add_rtu',
				name: 'add_rtu',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加机器',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/v-rtu-management/add-rtu/add-rtu.vue'], resolve)
				//component: () => import('@/view/vending-machine/org/newOrg/newOrg.vue')
			},

			{
				path: 'replenishment_record',
				name: 'replenishment_record',
				meta: {
					icon: ' iconfont icon-bhjl',
					title: '补货记录',
					keepAlive: true
				},
				component: resolve => require([
					'@/view/vending-machine/v-rtu-management/replenishment-record/replenishment-record.vue'
				], resolve)
				//component: () => import('@/view/vending-machine/org/orgManagement/orgManagement.vue')
			},
			{
				path: 'shipping_detail',
				name: 'shipping_detail',
				meta: {
					icon: ' iconfont icon-chmx',
					title: '出货明细',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/v-rtu-management/shipping-detail/shipping-detail.vue'],
					resolve)
				//component: () => import('@/view/vending-machine/org/orgManagement/orgManagement.vue')
			},
			{
				path: 'm_rtu_test',
				name: 'm_rtu_test',
				meta: {
					icon: ' iconfont icon-csjq',
					title: '测试机器',
					keepAlive: true
				},
				component: resolve => require(['@/view/mVending-machine/m-rtu-test/m-rtu-test.vue'], resolve)
				//component: () => import('@/view/vending-machine/org/orgManagement/orgManagement.vue')
			},
			{
				path: 'create_aisle',
				name: 'create_aisle',
				meta: {
					hideInMenu: true,
					//icon: 'md-infinite',
					title: '创建货道',
					hideInBread: true,
					keepAlive: false
				},
				component: resolve => require(['@/view/mVending-machine/m-rtu-management/create-aisle/create-aisle.vue'], resolve)
				//component: () => import('@/view/vending-machine/org/orgLists/orgLists.vue')
			},
			{
				path: 'proportion',
				name: 'proportion',
				meta: {
					hideInMenu: true,
					//icon: 'md-infinite',
					title: '设置分成',
					hideInBread: true,
					keepAlive: false
				},
				component: resolve => require(['@/view/mVending-machine/m-rtu-management/proportion/proportion.vue'], resolve)
				//component: () => import('@/view/vending-machine/org/orgLists/orgLists.vue')
			},
		]
	},
	{
		path: '/goods_management',
		name: 'goods_management',
		meta: {
			icon: ' iconfont icon-spgl',
			title: '商品管理'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'add_goods',
				name: 'add_goods',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加商品',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/goods-management/add-goods/add-goods.vue'], resolve)
				//component: () => import('@/view/vending-machine/rtu/newrtu/newrtu.vue')
			},

			{
				path: 'goods_list',
				name: 'goods_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '商品列表',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/goods-management/goods-list/goods-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/rtu/rtuLists/rtuLists.vue')
			},
			{
				path: 'add_goods_type',
				name: 'add_goods_type',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加分类',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/goods-management/add-goods-type/add-goods-type.vue'],
					resolve)
				//component: () => import('@/view/vending-machine/rtu/newrtu/newrtu.vue')
			},
			{
				path: 'goods_type_list',
				name: 'goods_type_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '分类列表',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/goods-management/goods-type-list/goods-type-list.vue'],
					resolve)
				//component: () => import('@/view/vending-machine/rtu/rtuLists/rtuLists.vue')
			},

		]
	},
	{
		path: '/order_management',
		name: 'order_management',
		meta: {
			icon: ' iconfont icon-ddgl',
			title: '订单管理',
			
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'order_list',
				name: 'order_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '订单列表',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/order-management/order-list/order-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/pictureFigure/newPictureFigure/newPictureFigure.vue')
			},
			{
				path: 'correct_statistics',
				name: 'correct_statistics',
				meta: {
					icon: 'md-infinite',
					title: '纠正统计',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/order-management/correct-statistics/correct-statistics.vue'],
					resolve)
				//component: () => import('@/view/vending-machine/pictureFigure/newPictureFigure/newPictureFigure.vue')
			},
			{
				path: 'm_order_earnings',
				name: 'm_order_earnings',
				meta: {
					icon: 'md-infinite',
					title: '收益',
					keepAlive: true
				},
				component: resolve => require(['@/view/mVending-machine/m-order-management/m-order-earnings/m-order-earnings.vue'],
					resolve)
				//component: () => import('@/view/vending-machine/setting/menuManagement/menuManagement.vue')
			},
			{
				path: 'm_sales_subsidiary',
				name: 'm_sales_subsidiary',
				meta: {
					icon: 'md-infinite',
					title: '销售明细',
					keepAlive: true
				},
				component: resolve => require([
					'@/view/mVending-machine/m-order-management/m-sales-subsidiary/m-sales-subsidiary.vue'
				], resolve)
				//component: () => import('@/view/vending-machine/setting/addMenu/addMenu.vue')
			},


		],
	},

	{
		path: '/pay_management',
		name: 'pay_management',
		meta: {
			icon: ' iconfont icon-zfgl',
			title: '支付管理'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'pay_list',
				name: 'pay_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '支付列表',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/pay-management/pay-list/pay-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/menuManagement/menuManagement.vue')
			},
			{
				path: 'add_pay',
				name: 'add_pay',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加支付',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/pay-management/add-pay/add-pay.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/addMenu/addMenu.vue')
			},

		]
	},
	{
		path: '/user_management',
		name: 'user_management',
		meta: {
			icon: ' iconfont icon-yhgl',
			title: '用户管理'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'c_add_user',
				name: 'c_add_user',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加用户',
					keepAlive: true
				},
				component: resolve => require(['@/view/components/c-add-user.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/addUser/addUser.vue')
			},
			{
				path: 'c_user_list',
				name: 'c_user_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '用户列表'
				},
				component: resolve => require(['@/view/components/c-user-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/userLists/userLists.vue')
			},
		]
	},

	{
		path: '/cooperation_management',
		name: 'cooperation_management',
		meta: {
			icon: ' iconfont icon-hzgl',
			title: '合作管理'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'c_add_cooperation',
				name: 'c_add_cooperation',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加合作',
					keepAlive: true
				},
				component: resolve => require(['@/view/components/c-add-cooperation.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/userLists/userLists.vue')
			},
			{
				path: 'c_cooperation_list',
				name: 'c_cooperation_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '合作列表',
					keepAlive: true
				},
				component: resolve => require(['@/view/components/c-cooperation-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/addUser/addUser.vue')
			},
		]
	},
	{
		path: '/shop_type',
		name: 'shop_type',
		meta: {
			icon: ' iconfont icon-sdlx',
			title: '商店类型'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'add_shop_type',
				name: 'add_shop_type',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加类型',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/shop-type/add-shop-type/add-shop-type.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/menuManagement/menuManagement.vue')
			},
			{
				path: 'shop_type_list',
				name: 'shop_type_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '类型列表',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/shop-type/shop-type-list/shop-type-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/addMenu/addMenu.vue')
			},

		]
	},

	{
		path: '/ad_management',
		name: 'ad_management',
		meta: {
			icon: ' iconfont icon-gggl',
			title: '广告管理'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'add_ad',
				name: 'add_ad',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加广告',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/ad-management/add-ad/add-ad.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/menuManagement/menuManagement.vue')
			},
			{
				path: 'ad_list',
				name: 'ad_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '广告列表',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/ad-management/ad-list/ad-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/addMenu/addMenu.vue')
			},

		]
	},


	{
		path: '/data_analysis',
		name: 'data_analysis',
		meta: {
			icon: 'md-infinite',
			title: '数据分析'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'curves_in',
				name: 'curves_in',
				meta: {
					icon: 'md-infinite',
					title: '曲线走势',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/data-analysis/curves-in/curves-in.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/addUser/addUser.vue')
			},
			{
				path: 'hot_goods',
				name: 'hot_goods',
				meta: {
					icon: 'md-infinite',
					title: '热销商品',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/data-analysis/hot-goods/hot-goods.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/userLists/userLists.vue')
			},

			{
				path: 'active_users',
				name: 'active_users',
				meta: {
					icon: 'md-infinite',
					title: '活跃用户',
					keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/data-analysis/active-users/active-users.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/userLists/userLists.vue')
			},
		]
	},

	{
		path: '/message',
		name: 'message',
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		meta: {
			hideInBread: true,
			hideInMenu: true
		},
		children: [{
			path: 'message_page',
			name: 'message_page',
			meta: {
				icon: 'md-notifications',
				title: '消息中心',
				keepAlive: true
			},
			//component: () => import('@/view/single-page/message/index.vue')
			component: resolve => require(['@/view/single-page/message/index.vue'], resolve)
		}]
	},

	{
		path: '/401',
		name: 'error_401',
		meta: {
			hideInMenu: true
		},
		//component: () => import('@/view/error-page/401.vue')
		component: resolve => require(['@/view/error-page/401.vue'], resolve)
	},
	{
		path: '/500',
		name: 'error_500',
		meta: {
			hideInMenu: true
		},
		//component: () => import('@/view/error-page/500.vue')
		component: resolve => require(['@/view/error-page/500.vue'], resolve)
	},
	{
		path: '*',
		name: 'error_404',
		meta: {
			hideInMenu: true
		},
		//component: () => import('@/view/error-page/404.vue')
		component: resolve => require(['@/view/error-page/404.vue'], resolve)
	},

	{
		path: '/m_terminal',
		name: 'm_terminal',
		// redirect: '/home',
		meta: {
			//icon: 'md-infinite',
			//title: 'Login - 收益',
			//hideInBread: true,
			hideInMenu: true
		},
		component: resolve => require(['@/components/main'], resolve),
		//component: resolve => require(['@/view/mVending-machine/navigation/navigation.vue'], resolve),
		children: [{
				path: '/m_earnings',
				name: 'm_earnings',
				meta: {
					//icon: 'md-infinite',
					title: '近日收益',
					hideInMenu: true,
					hideInBread: true,
					keepAlive: false
				},
				component: resolve => require(['@/view/mVending-machine/m-earnings/m-earnings.vue'], resolve)

			},
			{
				path: '/m_replenishment',
				name: 'm_replenishment',
				meta: {
					//icon: 'md-infinite',
					title: '补货',
					hideInMenu: true,
					hideInBread: true,
					keepAlive: true
				},
				component: resolve => require(['@/view/mVending-machine/m-replenishment/m-replenishment.vue'], resolve)
			},
			{
				path: '/m_order_dealing',
				name: 'm_order_dealing',
				meta: {
					//icon: 'md-infinite',
					title: '订单处理',
					hideInMenu: true,
					hideInBread: true,
					keepAlive: true
				},
				component: resolve => require(['@/view/mVending-machine/m-order-dealing/m-order-dealing.vue'], resolve)
			},
			{
				path: '/me',
				name: 'me',
				meta: {
					//icon: 'md-infinite',
					title: '用户信息',
					hideInMenu: true,
					hideInBread: true,
					keepAlive: true
				},
				component: resolve => require(['@/view/mVending-machine/me/me.vue'], resolve)
			},


		]

		//component: () => import('@/view/vending-machine/user/addUser/addUser.vue')
	},


]
