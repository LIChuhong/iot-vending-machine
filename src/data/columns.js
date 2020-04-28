// 所属用户列表Columns
export const belongUserColumns = [{
  title: '用户ID',
  key: 'userId',
  align: 'center',
  ellipsis: true

},
{
  title: '用户名',
  key: 'userName',
  align: 'center',
  ellipsis: true
},
{
  title: '用户头像',
  key: 'userLogo',
  align: 'center',
  ellipsis: true
},
{
  title: '用户级别',
  key: 'userLevel',
  align: 'center',
  ellipsis: true
},
{
  title: '真实姓名',
  key: 'realName',
  align: 'center',
  ellipsis: true
},
{
  title: '操作',
  slot: 'action',
  align: 'center',
  width: 100
}

]

// 收款账户列表Columns
export const collectionUserColumns = [{
  title: 'ID',
  key: 'userId',
  align: 'center',
  ellipsis: true

},
{
  title: '商户名',
  key: 'merchants',
  align: 'center',
  ellipsis: true
},
{
  title: 'SystemId',
  key: 'systemId',
  align: 'center',
  ellipsis: true
},
{
  title: '所属用户',
  key: 'belongUser',
  align: 'center',
  ellipsis: true
},

{
  title: '操作',
  slot: 'action',
  align: 'center',
  width: 100
}

]

// 我的设备列表Columns
export const rtuColumns = [{
  title: 'ID',
  key: 'id',
  align: 'center',
  ellipsis: true,
  width: 80

},
{
  title: '机器编号',
  key: 'rtuNumber',
  align: 'center',
  ellipsis: true,
  width: 100

},
{
  title: '名称/序列号',
  slot: 'name-type-serialNumber',
  align: 'center',
  tooltip: true
},
{
  title: '收款人/收款账号',
  slot: 'payeeName-payId',
  align: 'center',
  tooltip: true,
  width: 100
},
{
  title: '所属商家/电话',
  slot: 'orgName-tel',
  align: 'center',
  tooltip: true
},
{
  title: '二维码',
  slot: 'qrCode',
  align: 'center',
  tooltip: true,
  width: 80
},

{
  title: '操作',
  slot: 'action',
  align: 'center',
  width: 280
}

]

// 补货列表Columns
export const replenishmentColumns = [{
  title: '日期',
  key: 'addTime',
  align: 'center'
  // tooltip: true,

},
{
  title: '机器编号',
  key: 'rtuNumber',
  align: 'center',
  tooltip: true
},
{
  title: '货道',
  key: 'cargoNo',
  align: 'center',
  tooltip: true
},
{
  title: '补货前/后',
  slot: 'stock',
  align: 'center',
  tooltip: true
},
  // {
  // 	title: '补货后',
  // 	key: 'afterRep',
  // 	align: 'center',
  // 	ellipsis: true,
  // },
{
  title: '变量',
  slot: 'few',
  align: 'center',
  tooltip: true
},
{
  title: '用户名',
  key: 'userName',
  align: 'center',
  tooltip: true
},
{
  title: '姓名',
  key: 'realName',
  align: 'center',
  tooltip: true
}
]

// 出货明细列表Columns
export const shippingColumns = [{
  title: '货道',
  key: 'cargoNo',
  align: 'center',
  tooltip: true

},
{
  title: '商品名',
  key: 'commodityName',
  align: 'center',
  tooltip: true
},
{
  title: '总出货',
  key: 'totalFinishedCount',
  align: 'center',
  tooltip: true
},

{
  title: '现库存',
  key: 'nowStock',
  align: 'center',
  tooltip: true
},

{
  title: '操作',
  slot: 'action',
  align: 'center',
  width: 100
}

]

// 商品列表Columns
export const goodsColumns = [{
  title: 'ID',
  key: 'id',
  align: 'center',
  ellipsis: true

},
{
  title: '商品名',
  key: 'commodityName',
  align: 'center',
  ellipsis: true
},
{
  title: '类型',
  key: 'commodityTypeName',
  align: 'center',
  ellipsis: true
},
{
  title: '商品图',
  slot: 'commodityImgUrl',
  align: 'center',
  ellipsis: true
},
{
  title: '操作',
  slot: 'action',
  align: 'center'
}

]
// 商品子列表Columns
export const goodsChildColumns = [{
  title: 'ID',
  key: 'id',
  align: 'center',
  ellipsis: true,
  width: 50

},
{
  title: '商品名',
  key: 'commodityName',
  align: 'center',
  tooltip: true
},

{
  title: '商品图',
  slot: 'commodityImgUrl',
  align: 'center',
  ellipsis: true
},
{
  title: '操作',
  slot: 'action',
  align: 'center'
}

]

// 订单列表Columns
export const orderColumns = [{
  title: '订单ID',
  slot: 'orderId',
  align: 'center',
  tooltip: true

},
{
  title: '消费金额',
  key: 'payTotalAmount',
  align: 'center',
  ellipsis: true,
  width: 100,
  resizable: true
},
{
  title: '收款账号',
  key: 'collAccount',
  align: 'center',
  ellipsis: true,
  width: 100,
  resizable: true
},
{
  title: '订单状态',
  key: 'orderStateName',
  align: 'center',
  ellipsis: true,
  width: 100,
  resizable: true

},
{
  title: '机器编号',
  key: 'rtuNumber',
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
  align: 'center'
}

]

// 订单购物车列表Columns
export const shoppingColumns = [{
  title: '商品名称',
  key: 'commodityName',
  align: 'center'
},
{
  title: '单价',
  slot: 'price',
  align: 'center',
  ellipsis: true,
  width: 100,
  resizable: true
},
{
  title: '成本价',
  slot: 'costPrice',
  align: 'center',
  ellipsis: true,
  width: 100,
  resizable: true
},
{
  title: '购买数量',
  key: 'buyCount',
  align: 'center',
  ellipsis: true,
  width: 100,
  resizable: true

},
{
  title: '已出货',
  key: 'finishCount',
  align: 'center',
  ellipsis: true,
  width: 100,
  resizable: true
},
{
  title: '未完成',
  slot: 'failureCount',
  align: 'center',
  width: 100,
  resizable: true

},
{
  title: '总价',
  slot: 'totalPrice',
  align: 'center',
  width: 100,
  resizable: true

},
{
  title: '总成本',
  slot: 'totalCostPrice',
  align: 'center',
  width: 100,
  resizable: true

},
// 	{
// 		title: '应退金额',
// 		slot: 'refund',
// 		align: 'center',
// 		width: 100,
// 		resizable: true
//
// 	},
{
  title: '货道',
  key: 'cargoNo',
  align: 'center',
  width: 100,
  resizable: true

},
{
  title: '操作',
  slot: 'action',
  align: 'center',
  width: 100
  // resizable: true

}

]

// 利益列表Columns
export const earningsColumns = [{
  title: '日期',
  key: 'day',
  align: 'center'
},
{
  title: '订单数',
  key: 'totalCount',
  align: 'center',
  ellipsis: true

},
{
  title: '收入',
  key: 'totalAmount',
  align: 'center',
  ellipsis: true

},
{
  title: '成本',
  key: 'totalCostAmount',
  align: 'center',
  ellipsis: true

},

{
  title: '利润',
  key: 'profits',
  align: 'center'

}

]

// 销售明细列表Columns
export const salesColumns = [{
  title: '货道',
  key: 'aisle',
  align: 'center',
  width: 80
},
{
  title: '商品名',
  key: 'goodsName',
  align: 'center',
  ellipsis: true

},
{
  title: '总收入',
  key: 'totalRevenue',
  align: 'center',
  ellipsis: true

},
{
  title: '总成本',
  key: 'totalCost',
  align: 'center',
  ellipsis: true

},
{
  title: '总利润',
  key: 'totalProfits',
  align: 'center'

}
]

// 用户列表Columns
export const userColumns = [{
  title: 'ID',
  key: 'id',
  align: 'center',
  tooltip: true,
  width: 80

},
{
  title: '用户名',
  key: 'userName',
  align: 'center',
  tooltip: true
},

{
  title: '真实姓名',
  key: 'realName',
  align: 'center',
  tooltip: true
},
{
  title: '用户级别',
  key: 'userRolesName',
  align: 'center',
  tooltip: true
},
{
  title: '用户头像',
  slot: 'userHeadImgUrl',
  align: 'center',
  // tooltip: true,
  width: 100
},
{
  title: '创建时间',
  key: 'createTime',
  align: 'center',
  tooltip: true
},

{
  title: '操作',
  slot: 'action',
  align: 'center',
  width: 230
}

]

// 手机端用户列表Columns
export const mUserColumns = [{
  title: 'ID',
  key: 'id',
  align: 'center',
  tooltip: true,
  // width: 100
  width: 50

},
{
  title: '用户名',
  key: 'userName',
  align: 'center',
  tooltip: true
},

{
  title: '真实姓名',
  key: 'realName',
  align: 'center',
  tooltip: true
},

{
  title: '操作',
  slot: 'action',
  align: 'center'
  // width: 150
}

]

// 支付列表Columns
export const payColumns = [{
  title: 'ID',
  key: 'id',
  align: 'center',
  tooltip: true,
  width: 80

},
{
  title: '商户号',
  key: 'merchantNo',
  align: 'center',
  tooltip: true
},

{
  title: 'SystemId',
  key: 'systemId',
  align: 'center',
  tooltip: true
},
{
  title: '收款人',
  key: 'payeeName',
  align: 'center',
  tooltip: true
},
{
  title: '登录邮箱',
  key: 'eMail',
  align: 'center',
  tooltip: true
},

{
  title: '操作',
  slot: 'action',
  align: 'center',
  width: 100
}
]

// 支付查询列表Columns
export const payChildColumns = [{
  title: 'ID',
  key: 'id',
  align: 'center',
  tooltip: true
  // width: 80

},
{
  title: '商户号',
  key: 'merchantNo',
  align: 'center',
  tooltip: true
},
{
  title: '收款人',
  key: 'payeeName',
  align: 'center',
  tooltip: true
},
{
  title: '操作',
  slot: 'action',
  align: 'center'
  // width: 100
}
]

// 公司列表Columns
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
  ellipsis: true
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
  ellipsis: true
},
{
  title: '品牌名',
  key: 'brandName',
  align: 'center',
  ellipsis: true
},

{
  title: '操作',
  slot: 'action',
  align: 'center',
  width: 200
}

]

// 手机端订单处理列表
export const mOrderDealColumns = [{
  title: '订单ID',
  key: 'orderId',
  align: 'center'
  // tooltip: true,
}, {
  title: '消费金额',
  key: 'payTotalAmount',
  align: 'center',
  // ellipsis: true,
  width: 70
},
{
  title: '订单状态',
  key: 'orderStateLabel',
  align: 'center',
  // ellipsis: true,
  width: 70
},
{
  title: '机器编号',
  key: 'rtuNumber',
  align: 'center',
  // ellipsis: true,
  width: 70
},
{
  title: '详情',
  slot: 'action',
  align: 'center',
  width: 50
}
]

// 手机端收益明细列表
export const mEdetailColumns = [{
  title: '编号',
  key: 'rtuNumber',
  align: 'center'
  // tooltip: true,
},
{
  title: '分账',
  slot: 'totalBillSplitAmount',
  align: 'center'
  // tooltip: true,
},
{
  title: '笔数',
  slot: 'totalCount',
  align: 'center'
  // tooltip: true,
},
{
  title: '收入',
  slot: 'totalAmount',
  align: 'center'
  // tooltip: true,
},
{
  title: '成本',
  slot: 'totalCostAmount',
  align: 'center'
  // tooltip: true,
},
{
  title: '利润',
  slot: 'profits',
  align: 'center'
  // tooltip: true,
}
]

// 手机端订单处理详情列表
export const mOcontentColumns = [{
  title: '名称',
  key: 'commodityName',
  align: 'center'
  // tooltip: true,
},
{
  title: '货道',
  key: 'cargoNo',
  align: 'center'
  // tooltip: true,
},
{
  title: '单价',
  slot: 'price',
  align: 'center'
  // tooltip: true,
},
{
  title: '购买',
  key: 'buyCount',
  align: 'center'
  // tooltip: true,
},
{
  title: '完成',
  key: 'finishCount',
  align: 'center'
  // tooltip: true,
},
{
  title: '总价',
  slot: 'totalPrice',
  align: 'center'
  // tooltip: true,
},
{
  title: '操作',
  slot: 'action',
  align: 'center'

}

]

// 手机端补货记录列表
export const mRrecordColumns = [{
  title: '时间',
  key: 'time',
  align: 'center',
  tooltip: true
},
{
  title: '货道',
  key: 'aisle',
  align: 'center'
  // tooltip: true,
},
{
  title: '补货前',
  key: 'rmBefore',
  align: 'center'
  // tooltip: true,
},
{
  title: '补货后',
  key: 'rmAfter',
  align: 'center'
  // tooltip: true,
},
{
  title: '姓名',
  key: 'name',
  align: 'center'
  // tooltip: true,
},
{
  title: '出货明细',
  slot: 'action',
  align: 'center'

}

]

// 手机端出货明细列表
export const mSdetailColumns = [{
  title: '货道',
  key: 'aisle',
  align: 'center'
  // tooltip: true,
},
{
  title: '商品名',
  key: 'shopName',
  align: 'center'
  // tooltip: true,
},
{
  title: '总出货',
  key: 'totalShipment',
  align: 'center'
  // tooltip: true,
},
{
  title: '现库存',
  key: 'inventory',
  align: 'center'
  // tooltip: true,
},
{
  title: '操作',
  slot: 'action',
  align: 'center'

}
]

// 合作列表
export const coopListColumns = [{
  title: 'ID',
  key: 'id',
  align: 'center',
  width: 80
  // tooltip: true,
},
{
  title: '组织名称',
  key: 'orgName',
  align: 'center'
  // tooltip: true,
},
{
  title: '类型',
  key: 'orgTypeName',
  align: 'center'
  // tooltip: true,
},

{
  title: '操作',
  slot: 'action',
  align: 'center'

}
]
