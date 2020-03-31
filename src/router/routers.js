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
			// {
			// 	path: 'c_my_rtu',
			// 	name: 'c_my_rtu',
			// 	meta: {
			// 		icon: 'md-infinite',
			// 		title: '我的机器',
			// 		keepAlive: true
			// 	},
			// 	component: resolve => require(['@/view/components/c-my-rtu.vue'], resolve)
			// 	//component: () => import('@/view/vending-machine/org/orgLists/orgLists.vue')
			// },
			{
				path: 'm_my_rtu',
				name: 'm_my_rtu',
				meta: {
					icon: ' iconfont icon-wdjq',
					title: '我的机器',
					keepAlive: true
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
					//keepAlive: true
				},
				component: resolve => require(['@/view/vending-machine/v-rtu-management/my-rtu/my-rtu.vue'], resolve)
				//component: () => import('@/view/vending-machine/org/orgLists/orgLists.vue')
			},
			{
				path: 'add_rtu',
				name: 'add_rtu',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加机器'
				},
				component: resolve => require(['@/view/vending-machine/v-rtu-management/add-rtu/add-rtu.vue'], resolve)
				//component: () => import('@/view/vending-machine/org/newOrg/newOrg.vue')
			},

			{
				path: 'replenishment_record',
				name: 'replenishment_record',
				meta: {
					icon: ' iconfont icon-bhjl',
					title: '补货记录'
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
					title: '出货明细'
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
					title: '测试机器'
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
					hideInBread: true
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
					hideInBread: true
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
					title: '添加商品'
				},
				component: resolve => require(['@/view/vending-machine/goods-management/add-goods/add-goods.vue'], resolve)
				//component: () => import('@/view/vending-machine/rtu/newrtu/newrtu.vue')
			},

			{
				path: 'goods_list',
				name: 'goods_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '商品列表'
				},
				component: resolve => require(['@/view/vending-machine/goods-management/goods-list/goods-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/rtu/rtuLists/rtuLists.vue')
			},
			{
				path: 'add_goods_type',
				name: 'add_goods_type',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加分类'
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
					title: '分类列表'
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
			title: '订单管理'
		},
		//component: Main,
		component: resolve => require(['@/components/main'], resolve),
		children: [{
				path: 'order_list',
				name: 'order_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '订单列表'
				},
				component: resolve => require(['@/view/vending-machine/order-management/order-list/order-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/pictureFigure/newPictureFigure/newPictureFigure.vue')
			},
			{
				path: 'correct_statistics',
				name: 'correct_statistics',
				meta: {
					icon: 'md-infinite',
					title: '纠正统计'
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
					title: '收益'
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
					title: '销售明细'
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
					title: '支付列表'
				},
				component: resolve => require(['@/view/vending-machine/pay-management/pay-list/pay-list.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/menuManagement/menuManagement.vue')
			},
			{
				path: 'add_pay',
				name: 'add_pay',
				meta: {
					icon: ' iconfont icon-tj',
					title: '添加支付'
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
					title: '添加用户'
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
					title: '添加合作'
				},
				component: resolve => require(['@/view/components/c-add-cooperation.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/userLists/userLists.vue')
			},
			{
				path: 'c_cooperation_list',
				name: 'c_cooperation_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '合作列表'
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
					title: '添加类型'
				},
				component: resolve => require(['@/view/vending-machine/shop-type/add-shop-type/add-shop-type.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/menuManagement/menuManagement.vue')
			},
			{
				path: 'shop_type_list',
				name: 'shop_type_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '类型列表'
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
					title: '添加广告'
				},
				component: resolve => require(['@/view/vending-machine/ad-management/add-ad/add-ad.vue'], resolve)
				//component: () => import('@/view/vending-machine/setting/menuManagement/menuManagement.vue')
			},
			{
				path: 'ad_list',
				name: 'ad_list',
				meta: {
					icon: ' iconfont icon-lb',
					title: '广告列表'
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
					title: '曲线走势'
				},
				component: resolve => require(['@/view/vending-machine/data-analysis/curves-in/curves-in.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/addUser/addUser.vue')
			},
			{
				path: 'hot_goods',
				name: 'hot_goods',
				meta: {
					icon: 'md-infinite',
					title: '热销商品'
				},
				component: resolve => require(['@/view/vending-machine/data-analysis/hot-goods/hot-goods.vue'], resolve)
				//component: () => import('@/view/vending-machine/user/userLists/userLists.vue')
			},

			{
				path: 'active_users',
				name: 'active_users',
				meta: {
					icon: 'md-infinite',
					title: '活跃用户'
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
	  children: [
	    {
	      path: 'message_page',
	      name: 'message_page',
	      meta: {
	        icon: 'md-notifications',
	        title: '消息中心'
	      },
	      //component: () => import('@/view/single-page/message/index.vue')
				component: resolve => require(['@/view/single-page/message/index.vue'], resolve)
	    }
	  ]
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
					hideInBread: true
				},
				component: resolve => require(['@/view/mVending-machine/m-earnings/m-earnings.vue'], resolve)

			},
			{
				path: '/m_replenishment',
				name: 'm_replenishment',
				meta: {
					//icon: 'md-infinite',
					title: '补货',
					hideInMenu: true
				},
				component: resolve => require(['@/view/mVending-machine/m-replenishment/m-replenishment.vue'], resolve)
			},
			{
				path: '/m_order_dealing',
				name: 'm_order_dealing',
				meta: {
					//icon: 'md-infinite',
					title: '订单处理',
					hideInMenu: true
				},
				component: resolve => require(['@/view/mVending-machine/m-order-dealing/m-order-dealing.vue'], resolve)
			},
			{
				path: '/me',
				name: 'me',
				meta: {
					//icon: 'md-infinite',
					title: '用户信息',
					hideInMenu: true
				},
				component: resolve => require(['@/view/mVending-machine/me/me.vue'], resolve)
			},


		]

		//component: () => import('@/view/vending-machine/user/addUser/addUser.vue')
	},


	{
		path: '/m_replenishment_record',
		name: 'm_replenishment_record',
		meta: {
			//icon: 'md-infinite',
			//title: 'Login - 补货',
			hideInMenu: true
		},
		component: resolve => require(['@/components/main'], resolve),
		//component: resolve => require(['@/view/mVending-machine/navigation/navigation.vue'], resolve),
		children: [{
			path: '/m_replenishment_record',
			name: 'm_replenishment_record',
			meta: {
				//icon: 'md-infinite',
				title: 'Login - 补货记录',
				hideInMenu: true
			},
			component: resolve => require(['@/view/mVending-machine/m-replenishment-record/m-replenishment-record.vue'],
				resolve)
		}, ]
	},

	{
		path: '/m_shipping_detail',
		name: 'm_shipping_detail',
		meta: {
			//icon: 'md-infinite',
			//title: 'Login - 补货',
			hideInMenu: true
		},
		component: resolve => require(['@/components/main'], resolve),
		//component: resolve => require(['@/view/mVending-machine/navigation/navigation.vue'], resolve),
		children: [{
			path: '/m_shipping_detail',
			name: 'm_shipping_detail',
			meta: {
				//icon: 'md-infinite',
				title: 'Login - 出货明细',
				hideInMenu: true
			},
			component: resolve => require(['@/view/mVending-machine/m-shipping-detail/m-shipping-detail.vue'], resolve)
		}, ]
	},

// 	{
// 		path: '/m_rtu_test',
// 		name: 'm_rtu_test',
// 		meta: {
// 			//icon: 'md-infinite',
// 			//title: 'Login - 补货',
// 			hideInMenu: true
// 		},
// 		component: resolve => require(['@/components/main'], resolve),
// 		//component: resolve => require(['@/view/mVending-machine/navigation/navigation.vue'], resolve),
// 		children: [{
// 			path: '/m_rtu_test',
// 			name: 'm_rtu_test',
// 			meta: {
// 				//icon: 'md-infinite',
// 				title: 'Login - 机器测试',
// 				hideInMenu: true
// 			},
// 			component: resolve => require(['@/view/mVending-machine/m-rtu-test/m-rtu-test.vue'], resolve)
// 		}, ]
// 	},
// 
// 	{
// 		path: '/m_create_rtu',
// 		name: 'm_create_rtu',
// 		meta: {
// 			//icon: 'md-infinite',
// 			//title: 'Login - 补货',
// 			hideInMenu: true
// 		},
// 		component: resolve => require(['@/components/main'], resolve),
// 		//component: resolve => require(['@/view/mVending-machine/navigation/navigation.vue'], resolve),
// 		children: [{
// 			path: '/m_create_rtu',
// 			name: 'm_create_rtu',
// 			meta: {
// 				//icon: 'md-infinite',
// 				title: 'Login - 创建机器',
// 				hideInMenu: true
// 			},
// 			component: resolve => require(['@/view/mVending-machine/m-create-rtu/m-create-rtu.vue'], resolve)
// 		}, ]
// 	},
// 
// 	{
// 		path: '/m_monitor_online',
// 		name: 'm_monitor_online',
// 		meta: {
// 			//icon: 'md-infinite',
// 			//title: 'Login - 补货',
// 			hideInMenu: true
// 		},
// 		component: resolve => require(['@/components/main'], resolve),
// 		//component: resolve => require(['@/view/mVending-machine/navigation/navigation.vue'], resolve),
// 		children: [{
// 			path: '/m_monitor_online',
// 			name: 'm_monitor_online',
// 			meta: {
// 				//icon: 'md-infinite',
// 				title: 'Login - 检测在线',
// 				hideInMenu: true
// 			},
// 			component: resolve => require(['@/view/mVending-machine/m-monitor-online/m-monitor-online.vue'], resolve)
// 		}, ]
// 	},
// 
]

// export default [
//   {
//     path: '/login',
//     name: 'login',
//     meta: {
//       title: 'Login - 登录',
//       hideInMenu: true
//     },
//     component: () => import('@/view/login/login.vue')
//   },
//   {
//     path: '/',
//     name: '_home',
//     redirect: '/home',
//     component: Main,
//     meta: {
//       hideInMenu: true,
//       notCache: true
//     },
//     children: [
//       {
//         path: '/home',
//         name: 'home',
//         meta: {
//           hideInMenu: true,
//           title: '首页',
//           notCache: true,
//           icon: 'md-home'
//         },
//         component: () => import('@/view/single-page/home')
//       }
//     ]
//   },
//   {
//     path: '',
//     name: 'doc',
//     meta: {
//       title: '文档',
//       href: 'https://lison16.github.io/iview-admin-doc/#/',
//       icon: 'ios-book'
//     }
//   },
//   {
//     path: '/join',
//     name: 'join',
//     component: Main,
//     meta: {
//       hideInBread: true
//     },
//     children: [
//       {
//         path: 'join_page',
//         name: 'join_page',
//         meta: {
//           icon: '_qq',
//           title: 'QQ群'
//         },
//         component: () => import('@/view/join-page.vue')
//       }
//     ]
//   },
//   {
//     path: '/message',
//     name: 'message',
//     component: Main,
//     meta: {
//       hideInBread: true,
//       hideInMenu: true
//     },
//     children: [
//       {
//         path: 'message_page',
//         name: 'message_page',
//         meta: {
//           icon: 'md-notifications',
//           title: '消息中心'
//         },
//         component: () => import('@/view/single-page/message/index.vue')
//       }
//     ]
//   },
//   {
//     path: '/components',
//     name: 'components',
//     meta: {
//       icon: 'logo-buffer',
//       title: '组件'
//     },
//     component: Main,
//     children: [
//       {
//         path: 'tree_select_page',
//         name: 'tree_select_page',
//         meta: {
//           icon: 'md-arrow-dropdown-circle',
//           title: '树状下拉选择器'
//         },
//         component: () => import('@/view/components/tree-select/index.vue')
//       },
//       {
//         path: 'count_to_page',
//         name: 'count_to_page',
//         meta: {
//           icon: 'md-trending-up',
//           title: '数字渐变'
//         },
//         component: () => import('@/view/components/count-to/count-to.vue')
//       },
//       {
//         path: 'drag_list_page',
//         name: 'drag_list_page',
//         meta: {
//           icon: 'ios-infinite',
//           title: '拖拽列表'
//         },
//         component: () => import('@/view/components/drag-list/drag-list.vue')
//       },
//       {
//         path: 'drag_drawer_page',
//         name: 'drag_drawer_page',
//         meta: {
//           icon: 'md-list',
//           title: '可拖拽抽屉'
//         },
//         component: () => import('@/view/components/drag-drawer')
//       },
//       {
//         path: 'org_tree_page',
//         name: 'org_tree_page',
//         meta: {
//           icon: 'ios-people',
//           title: '组织结构树'
//         },
//         component: () => import('@/view/components/org-tree')
//       },
//       {
//         path: 'tree_table_page',
//         name: 'tree_table_page',
//         meta: {
//           icon: 'md-git-branch',
//           title: '树状表格'
//         },
//         component: () => import('@/view/components/tree-table/index.vue')
//       },
//       {
//         path: 'cropper_page',
//         name: 'cropper_page',
//         meta: {
//           icon: 'md-crop',
//           title: '图片裁剪'
//         },
//         component: () => import('@/view/components/cropper/cropper.vue')
//       },
//       {
//         path: 'tables_page',
//         name: 'tables_page',
//         meta: {
//           icon: 'md-grid',
//           title: '多功能表格'
//         },
//         component: () => import('@/view/components/tables/tables.vue')
//       },
//       {
//         path: 'split_pane_page',
//         name: 'split_pane_page',
//         meta: {
//           icon: 'md-pause',
//           title: '分割窗口'
//         },
//         component: () => import('@/view/components/split-pane/split-pane.vue')
//       },
//       {
//         path: 'markdown_page',
//         name: 'markdown_page',
//         meta: {
//           icon: 'logo-markdown',
//           title: 'Markdown编辑器'
//         },
//         component: () => import('@/view/components/markdown/markdown.vue')
//       },
//       {
//         path: 'editor_page',
//         name: 'editor_page',
//         meta: {
//           icon: 'ios-create',
//           title: '富文本编辑器'
//         },
//         component: () => import('@/view/components/editor/editor.vue')
//       },
//       {
//         path: 'icons_page',
//         name: 'icons_page',
//         meta: {
//           icon: '_bear',
//           title: '自定义图标'
//         },
//         component: () => import('@/view/components/icons/icons.vue')
//       }
//     ]
//   },
//   {
//     path: '/update',
//     name: 'update',
//     meta: {
//       icon: 'md-cloud-upload',
//       title: '数据上传'
//     },
//     component: Main,
//     children: [
//       {
//         path: 'update_table_page',
//         name: 'update_table_page',
//         meta: {
//           icon: 'ios-document',
//           title: '上传Csv'
//         },
//         component: () => import('@/view/update/update-table.vue')
//       },
//       {
//         path: 'update_paste_page',
//         name: 'update_paste_page',
//         meta: {
//           icon: 'md-clipboard',
//           title: '粘贴表格数据'
//         },
//         component: () => import('@/view/update/update-paste.vue')
//       }
//     ]
//   },
//   {
//     path: '/excel',
//     name: 'excel',
//     meta: {
//       icon: 'ios-stats',
//       title: 'EXCEL导入导出'
//     },
//     component: Main,
//     children: [
//       {
//         path: 'upload-excel',
//         name: 'upload-excel',
//         meta: {
//           icon: 'md-add',
//           title: '导入EXCEL'
//         },
//         component: () => import('@/view/excel/upload-excel.vue')
//       },
//       {
//         path: 'export-excel',
//         name: 'export-excel',
//         meta: {
//           icon: 'md-download',
//           title: '导出EXCEL'
//         },
//         component: () => import('@/view/excel/export-excel.vue')
//       }
//     ]
//   },
//   {
//     path: '/tools_methods',
//     name: 'tools_methods',
//     meta: {
//       hideInBread: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'tools_methods_page',
//         name: 'tools_methods_page',
//         meta: {
//           icon: 'ios-hammer',
//           title: '工具方法',
//           beforeCloseName: 'before_close_normal'
//         },
//         component: () => import('@/view/tools-methods/tools-methods.vue')
//       }
//     ]
//   },
//   {
//     path: '/i18n',
//     name: 'i18n',
//     meta: {
//       hideInBread: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'i18n_page',
//         name: 'i18n_page',
//         meta: {
//           icon: 'md-planet',
//           title: 'i18n - {{ i18n_page }}'
//         },
//         component: () => import('@/view/i18n/i18n-page.vue')
//       }
//     ]
//   },
//   {
//     path: '/error_store',
//     name: 'error_store',
//     meta: {
//       hideInBread: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'error_store_page',
//         name: 'error_store_page',
//         meta: {
//           icon: 'ios-bug',
//           title: '错误收集'
//         },
//         component: () => import('@/view/error-store/error-store.vue')
//       }
//     ]
//   },
//   {
//     path: '/error_logger',
//     name: 'error_logger',
//     meta: {
//       hideInBread: true,
//       hideInMenu: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'error_logger_page',
//         name: 'error_logger_page',
//         meta: {
//           icon: 'ios-bug',
//           title: '错误收集'
//         },
//         component: () => import('@/view/single-page/error-logger.vue')
//       }
//     ]
//   },
//   {
//     path: '/directive',
//     name: 'directive',
//     meta: {
//       hideInBread: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'directive_page',
//         name: 'directive_page',
//         meta: {
//           icon: 'ios-navigate',
//           title: '指令'
//         },
//         component: () => import('@/view/directive/directive.vue')
//       }
//     ]
//   },
//   {
//     path: '/multilevel',
//     name: 'multilevel',
//     meta: {
//       icon: 'md-menu',
//       title: '多级菜单'
//     },
//     component: Main,
//     children: [
//       {
//         path: 'level_2_1',
//         name: 'level_2_1',
//         meta: {
//           icon: 'md-funnel',
//           title: '二级-1'
//         },
//         component: () => import('@/view/multilevel/level-2-1.vue')
//       },
//       {
//         path: 'level_2_2',
//         name: 'level_2_2',
//         meta: {
//           access: ['super_admin'],
//           icon: 'md-funnel',
//           showAlways: true,
//           title: '二级-2'
//         },
//         component: parentView,
//         children: [
//           {
//             path: 'level_2_2_1',
//             name: 'level_2_2_1',
//             meta: {
//               icon: 'md-funnel',
//               title: '三级'
//             },
//             component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
//           },
//           {
//             path: 'level_2_2_2',
//             name: 'level_2_2_2',
//             meta: {
//               icon: 'md-funnel',
//               title: '三级'
//             },
//             component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//           }
//         ]
//       },
//       {
//         path: 'level_2_3',
//         name: 'level_2_3',
//         meta: {
//           icon: 'md-funnel',
//           title: '二级-3'
//         },
//         component: () => import('@/view/multilevel/level-2-3.vue')
//       }
//     ]
//   },
//   {
//     path: '/argu',
//     name: 'argu',
//     meta: {
//       hideInMenu: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'params/:id',
//         name: 'params',
//         meta: {
//           icon: 'md-flower',
//           title: route => `{{ params }}-${route.params.id}`,
//           notCache: true,
//           beforeCloseName: 'before_close_normal'
//         },
//         component: () => import('@/view/argu-page/params.vue')
//       },
//       {
//         path: 'query',
//         name: 'query',
//         meta: {
//           icon: 'md-flower',
//           title: route => `{{ query }}-${route.query.id}`,
//           notCache: true
//         },
//         component: () => import('@/view/argu-page/query.vue')
//       }
//     ]
//   },
//   {
//     path: '/401',
//     name: 'error_401',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/401.vue')
//   },
//   {
//     path: '/500',
//     name: 'error_500',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/500.vue')
//   },
//   {
//     path: '*',
//     name: 'error_404',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/404.vue')
//   }
// ]
//
