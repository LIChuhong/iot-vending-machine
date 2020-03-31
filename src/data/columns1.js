//商品类型列表
export const goodsTypeListColumns = [{
		title: 'ID',
		key: 'id',
		align: 'center',
		//width:80
		//tooltip: true,
	},
	{
		title: '类型名称',
		key: 'commodityTypeName',
		align: 'center',
		//tooltip: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',

	}
]
//商店类型列表
export const shopTypeListColumns = [{
		title: 'ID',
		key: 'id',
		align: 'center',
		//width:80
		//tooltip: true,
	},
	{
		title: '类型名称',
		key: 'shopTypeName',
		align: 'center',
		//tooltip: true,
	},
	{
		title: '页面名称',
		key: 'pageName',
		align: 'center',
		//tooltip: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',

	}
]
//分成列表
export const proportionColumns = [{
		edit: true,
		title: '收款用户',
		key: 'realName',
		align: 'center',


		//width:80
		//tooltip: true,
	},
	{
		edit: true,
		title: '分账账号',
		key: 'eMail',
		align: 'center',


		//tooltip: true,
	},
	{
		edit: true,
		title: '分成比例',
		key: 'proportion',
		align: 'center',

	},

	{
		title: '操作',
		key: 'action',
		align: 'center',
		width: 70
	}
]

export const adColumns =[{
		title: 'ID',
		key: 'id',
		align: 'center',
		//width:80
		//tooltip: true,
	},
	{
		title: '广告名称',
		key: 'adName',
		align: 'center',
		//tooltip: true,
	},
	{
		title: '类型',
		slot: 'adType',
		align: 'center',
		//tooltip: true,
	},
	{
		title: '切换间隔(s)',
		key: 'playInvTime',
		align: 'center',
		//tooltip: true,
	},

	{
		title: '操作',
		slot: 'action',
		align: 'center',

	}]