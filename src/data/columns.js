//所属用户列表Columns
export const belongUserColumns = [{
		title: '用户ID',
		key: 'userId',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '用户名',
		key: 'userName',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '用户头像',
		key: 'userLogo',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '用户级别',
		key: 'userLevel',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '真实姓名',
		key: 'realName',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '操作',
		slot: 'action',
		align: 'center',
		width: 100
	}

]

//收款账户列表Columns
export const collectionUserColumns = [{
		title: 'ID',
		key: 'userId',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '商户名',
		key: 'merchants',
		align: 'center',
		ellipsis: true,
	},
	{
		title: 'SystemId',
		key: 'systemId',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '所属用户',
		key: 'belongUser',
		align: 'center',
		ellipsis: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',
		width: 100
	}

]

//我的设备列表Columns
export const rtuColumns = [{
		title: 'ID',
		key: 'rtuId',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '名称/类型/序列号',
		slot: 'name-type-serialNumber',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '收款账号/打款方式',
		slot: 'payAccount-mannerPlay',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '所属客户',
		key: 'belongCustomer',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '二维码',
		key: 'qrCode',
		align: 'center',
		ellipsis: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',
		width: 300
	}

]

//补货列表Columns
export const replenishmentColumns = [{
		title: '日期',
		key: 'date',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '机器编号',
		key: 'rtuNum',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '货道编号',
		key: 'aisleNum',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '补货前',
		key: 'beforeRep',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '补货后',
		key: 'afterRep',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '变量',
		key: 'few',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '用户名',
		key: 'userName',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '姓名',
		key: 'realName',
		align: 'center',
		ellipsis: true,
	},
]

//出货明细列表Columns
export const shippingColumns = [{
		title: '货道',
		key: 'aisle',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '商品名',
		key: 'goodsName',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '总出货',
		key: 'shippingAll',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '购买出货',
		key: 'buyShipping',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '免单出货',
		key: 'luckyShipping',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '现库存',
		key: 'nowInventory',
		align: 'center',
		ellipsis: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',
		width: 100
	}

]

//商品列表Columns
export const goodsColumns = [{
		title: 'ID',
		key: 'goodsId',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '商品名',
		key: 'goodsName',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '类型',
		key: 'goodsType',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '商品图',
		slot: 'goodsImg',
		align: 'center',
		ellipsis: true,
		width: 120
	},
	{
		title: '操作',
		slot: 'action',
		align: 'center',
		width: 100
	}

]

//订单列表Columns
export const orderColumns = [{
		title: '订单ID',
		slot: 'orderId',
		align: 'center',
		tooltip: true,

	},
	{
		title: '消费金额',
		key: 'amount',
		align: 'center',
		ellipsis: true,
		width: 100,
		resizable: true
	},
	{
		title: '收款账号',
		key: 'paymentAccount',
		align: 'center',
		ellipsis: true,
		width: 100,
		resizable: true
	},
	{
		title: '订单状态',
		key: 'orderType',
		align: 'center',
		ellipsis: true,
		width: 100,
		resizable: true

	},
	{
		title: '机器编号',
		key: 'rtuNum',
		align: 'center',
		ellipsis: true,
		width: 100,
		resizable: true
	},
	{
		title: '消费者信息',
		slot: 'customerInfo',
		align: 'left',
		width: 250,
		resizable: true

	},
	{
		title: '购物车详情',
		slot: 'action',
		align: 'center',
	}

]

//订单购物车列表Columns
export const shoppingColumns = [{
		title: '商品名称',
		slot: 'goodsName',
		align: 'center',
	},
	{
		title: '单价',
		key: 'price',
		align: 'center',
		ellipsis: true,
		width: 100,
		resizable: true
	},
	{
		title: '成本价',
		key: 'cost',
		align: 'center',
		ellipsis: true,
		width: 100,
		resizable: true
	},
	{
		title: '购买数量',
		key: 'buyNum',
		align: 'center',
		ellipsis: true,
		width: 100,
		resizable: true

	},
	{
		title: '已出货',
		key: 'shipment',
		align: 'center',
		ellipsis: true,
		width: 100,
		resizable: true
	},
	{
		title: '未完成',
		key: 'failure',
		align: 'center',
		width: 100,
		resizable: true

	},
	{
		title: '总价',
		key: 'totalPrice',
		align: 'center',
		width: 100,
		resizable: true

	},
	{
		title: '总成本',
		key: 'totalCost',
		align: 'center',
		width: 100,
		resizable: true

	},
	{
		title: '应退金额',
		key: 'refund',
		align: 'center',
		width: 100,
		resizable: true

	},
	{
		title: '货道',
		key: 'aisle',
		align: 'center',
		width: 100,
		resizable: true

	}

]

//利益列表Columns
export const earningsColumns = [{
		title: '日期',
		slot: 'date',
		align: 'center',
	},
	{
		title: '订单数',
		key: 'orders',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '收入',
		key: 'income',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '成本',
		key: 'cost',
		align: 'center',
		ellipsis: true,

	},

	{
		title: '利润',
		key: 'profits',
		align: 'center',


	}

]

//销售明细列表Columns
export const salesColumns = [{
		title: '货道',
		key: 'aisle',
		align: 'center',
		width: 80,
	},
	{
		title: '商品名',
		key: 'goodsName',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '总收入',
		key: 'totalRevenue',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '总成本',
		key: 'totalCost',
		align: 'center',
		ellipsis: true,

	},
	{
		title: '总利润',
		key: 'totalProfits',
		align: 'center',

	},
	{
		title: '购买收入',
		key: 'buyRevenue',
		align: 'center',

	},
	{
		title: '购买成本',
		key: 'buyCost',
		align: 'center',

	},
	{
		title: '购买利润',
		key: 'buyProfits',
		align: 'center',

	},
	{
		title: '免单收入',
		key: 'luckyRevenue',
		align: 'center',

	},
	{
		title: '免单成本',
		key: 'luckyCost',
		align: 'center',

	},
	{
		title: '免单利润',
		key: 'luckyProfits',
		align: 'center',

	},
	{
		title: '免单次数',
		key: 'luckyNum',
		align: 'center',

	},

]

//用户列表Columns
export const userColumns = [{
		title: '用户ID',
		key: 'userId',
		align: 'center',
		ellipsis: true,
		width: 100

	},
	{
		title: '用户名',
		key: 'userName',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '用户头像',
		slot: 'userLogo',
		align: 'center',
		ellipsis: true,
		width: 100
	},
	{
		title: '真实姓名',
		key: 'realName',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '用户级别',
		key: 'userType',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '创建时间',
		key: 'createTime',
		align: 'center',
		ellipsis: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',
		width: 200
	}

]

//支付列表Columns
export const payColumns = [{
		title: 'ID',
		key: 'payId',
		align: 'center',
		ellipsis: true,
		width: 100

	},
	{
		title: '商户号',
		key: 'merchantsNum',
		align: 'center',
		ellipsis: true,
	},
	
	{
		title: 'SystemId',
		key: 'systemId',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '所属用户',
		key: 'belongUser',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '登录邮箱',
		key: 'email',
		align: 'center',
		ellipsis: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',
		width: 200
	}

]

//公司列表Columns
export const companyColumns = [{
		title: 'ID',
		key: 'companyId',
		align: 'center',
		ellipsis: true,
		width: 100

	},
	{
		title: '公司名称',
		key: 'companyName',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '公司Logo',
		slot: 'companyLogo',
		align: 'center',
		ellipsis: true,
		width: 100
	},
	{
		title: '公司网址',
		key: 'companyUrl',
		align: 'center',
		ellipsis: true,
	},
	{
		title: '品牌名',
		key: 'brandName',
		align: 'center',
		ellipsis: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',
		width: 200
	}

]

