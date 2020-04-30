<!-- 订单处理组件 -->
<template>
	<div>
		<List item-layout="vertical" class="orderListStyle">
			<ListItem>
				<Row>
					<Col span="8">
					<div>
						<p>订单数:<span style="color: #fa8c35;">{{totalCount}}</span></p>
					</div>
					</Col>
					<Col span="8">
					<div>
						<p>收入:<span style="color: #9ed900;">{{totalAmount.toFixed(2)}}</span></p>
					</div>
					</Col>
					<Col span="8">
					<div>
						<p>利润:<span style="color: #f00056;">{{profitAmount.toFixed(2)}}</span></p>
					</div>
					</Col>
				</Row>
			</ListItem>
			<ListItem>
				<Row style="text-align: center;">
					<Col span="12">
					<div>
						<Input v-model="orderIdKey" placeholder="请输入订单号关键字" />
					</div>
					</Col>
					<Col span="12">
					<div>
						<DatePicker format="yyyy-MM-dd" :open="open" :value="date" type="date" @on-change="handleChange">
							<a href="javascript:void(0)" @click="handleClick">
								<Icon type="ios-calendar-outline"></Icon>
								<template>{{ date }}</template>
							</a>
						</DatePicker>
					</div>
					</Col>
				</Row>
			</ListItem>
			<ListItem>
				<Row style="text-align: center;">
					<Col span="12">
					<div>
						<Input v-model="rtuNumber" type="number" placeholder="请输入机器编号" />
					</div>
					</Col>
					<Col span="12" style="text-align: right;">
					<Select v-model="buyState" style="width: 70%;text-align: center;">
						<Option v-for="item in buyStateList" :value="item.id" :key="item.id">{{ item.label }}</Option>
					</Select>
					</Col>
				</Row>
			</ListItem>
			<ListItem>
				<Row style="text-align: right;">
					<Col span="12">
					<div>
						<Input v-model="cargoNo" type="number" placeholder="请输入货道编号" />
					</div>
					</Col>
					<Col span="12">
					<div>
						<Button @click="queryOrderList" type="primary">查询</Button>
					</div>
					</Col>
				</Row>
			</ListItem>
		</List>

		<Table :loading="orderListLoading" border :columns="mOrderDealColumns" :data="orderData" size="small" class="orderTableStyle">

			<template slot-scope="{ row, index }" slot="action">

				<div>
					<a href="javascript:void(0)" @click="handleModal(row)">详情</a>
				</div>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>

		</div>
		<Modal v-model="contentModalValue" fullscreen footer-hide title="订单详情" class="contentModalStyle">
			<div v-if="contentModalValue">
				<List border item-layout="vertical" size="small">
					<ListItem>
						<span>支付订单ID:</span>
						<p style="float: right;">{{detailsRows.transaction_id}}</p>
					</ListItem>
					<ListItem style="overflow: hidden;">
						<span>商户ID:</span>
						<p style="float: right;">{{detailsRows.collAccount}}</p>
					</ListItem>
					<ListItem style="overflow: hidden;">
						<span>订单时间:</span>
						<p style="float: right;">{{detailsRows.orderTime}}</p>
					</ListItem>
					<ListItem style="overflow: hidden;">
						<span>订单状态:</span>
						<p style="float: right;">{{detailsRows.orderStateLabel}}</p>
					</ListItem>
					<ListItem style="overflow: hidden;">
						<span>机器编号:</span>
						<p style="float: right;">{{detailsRows.rtuNumber}}</p>
					</ListItem>
					<ListItem style="overflow: hidden;">
						<span>用户ID:</span>
						<p style="float: right;">{{detailsRows.openId}}</p>
					</ListItem>
					<!-- <ListItem style="overflow: hidden;">

						<span>总支付:</span>
						<p style="float: right;">{{detailsRows.payTotalAmount}}</p>
					</ListItem>
					<ListItem style="overflow: hidden;">
						<span>总实收:</span>
						<p style="float: right;">{{detailsRows.totalAmount.toFixed(2)}}</p>
					</ListItem>
					<ListItem style="overflow: hidden;">
						<span>总成本:</span>
						<p style="float: right;">{{detailsRows.totalCostAmount.toFixed(2)}}</p>
					</ListItem>
					<ListItem style="overflow: hidden;">
						<span>已退款:</span>
						<p style="float: right;">{{detailsRows.refundedTotalAmount.toFixed(2)}}</p>
					</ListItem> -->
					<ListItem style="overflow: hidden;">
						<Row style="text-align: center;">
							<Col span="6">
							<p>支付</p>
							<p style="color: red;">{{detailsRows.payTotalAmount}}</p>
							</Col>
							<Col span="6">
							<p>实收</p>
							<p style="color: red;">{{detailsRows.totalAmount.toFixed(2)}}</p>
							</Col>
							<Col span="6">
							<p>成本</p>
							<p style="color: red;">{{detailsRows.totalCostAmount.toFixed(2)}}</p>
							</Col>
							<Col span="6">
							<p>已退款</p>
							<p style="color: red;">{{detailsRows.refundedTotalAmount.toFixed(2)}}</p>
							</Col>
						</Row>
					</ListItem>

				</List>

				<Table :loading="tableLoading" border :columns="mOcontentColumns" :data="detailsRows.shoppingCart.buyCommodityList"
				 size="small">
					<template slot-scope="{ row, index }" slot="price">
						<!-- {{row.price.toFixed(2)}} -->
						<div><span :class="{priceStyle:row.promotionPrice>0}">{{row.price.toFixed(2)}}</span></div>
						<div v-show="row.promotionPrice>0">{{row.promotionPrice.toFixed(2)}}</div>
					</template>
					<!-- <template slot-scope="{ row, index }" slot="totalPrice">
						<div v-show="row.promotionPrice<=0">{{(row.price*row.buyCount).toFixed(2)}}</div>
						<div v-show="row.promotionPrice>0">{{(row.promotionPrice*row.buyCount).toFixed(2)}}</div>
					</template> -->
					<template slot-scope="{ row, index }" slot="action">
						<Poptip confirm @on-ok="refundTotal(row)" placement="left">
							<template slot="title">

								<Icon type="md-remove-circle" @click="redCount(row)" />
								{{count}}个
								<Icon type="md-add-circle" @click="addCount(row)" />

							</template>
							<Button size="small" :disabled="(row.buyCount - row.finishCount - row.refundedCount) > 0 && detailsRows.orderState > 0 ? false : true"
							 type="warning" @click="setCount(row)">退款</Button>

						</Poptip>
					</template>
					<div slot="footer" style="height: 36px;"></div>
				</Table>

			</div>
		</Modal>

	</div>
</template>

<script>
import {
  getOrderList,
  refund
} from '@/api/order'
import {
  getNowFormatDate,
  timestampToTime
} from '@/libs/tools'
import {
  mOrderDealColumns,
  mOcontentColumns
} from '@/data/columns.js'
export default {
  data () {
    return {
      tableLoading: false,
      detailsRows: '',
      count: 0,
      orderListLoading: false,
      buyCommodityList: [],
      mOcontentColumns: mOcontentColumns,
      contentModalValue: false,
      totalCount: null, // 订单数
      totalAmount: 0, // 收入
      profitAmount: 0, // 利润
      orderIdKey: null, // 订单关键字
      rtuNumber: null, // 机器编号
      cargoNo: null, // 货道
      totalCostAmount: null, // 总成本
      open: false,
      date: getNowFormatDate(new Date(), '-'), // 默认当前时间查找
      // date: new Date(),
      mOrderDealColumns: mOrderDealColumns,
      orderData: [],
      pageNo: 0, // 页码
      pageSize: 5, // 页数
      buyState: 0, // 购买状态
      buyStateList: [{
        id: 0,
        label: '所有订单'
      },
      {
        id: 1,
        label: '购买成功'
      },
      {
        id: 2,
        label: '购买失败'
      }
      ],
      orderStateList: [{ // 订单状态列表
        id: 0,
        label: '未支付'
      },
      {
        id: 1,
        label: '已支付'
      },
      {
        id: 2,
        label: '购买成功'
      },
      {
        id: 3,
        label: '购买失败'
      },
      {
        id: 4,
        label: '退款中'
      },
      {
        id: 5,
        label: '已退款'
      },
      {
        id: 6,
        label: '退款失败'
      }
      ]
    }
  },
  watch: {

  },
  methods: {
    redCount (row) {
      if (this.count > 1) {
        this.count--
      }
    },
    addCount (row) {
      if (this.count < row.buyCount - row.finishCount - row.refundedCount) {
        this.count++
      }
    },
    setCount (row) {
      this.count = row.buyCount - row.finishCount - row.refundedCount
    },
    refundTotal (row) {
      let refund1 = {
        'orderId': this.detailsRows.orderId,
        'refundCargoList': [{
          'cargoNo': row.cargoNo,
          'refundCount': this.count
        }]
      }
      this.tableLoading = true
      refund(refund1).then(res => {
        const data = res.data
        this.tableLoading = false
        if (data.success == 1) {
          this.detailsRows.shoppingCart.buyCommodityList[row._index].refundedCount += this.count
						 row.refundedCount += this.count
						 this.count--
						 this.detailsRows.totalAmount = data.totalAmount
						 this.detailsRows.totalCostAmount = data.totalCostAmount
						 this.detailsRows.refundedTotalAmount = data.refundedTotalAmount
          this.$Message.success('退款成功')
        } else {
          this.$Message.error(data.errorMessage)
        }
      }).catch(error => {
        this.tableLoading = false
        alert(error)
      })
    },
    queryOrderList () { // 查询订单
      this.pageNo = 0
      this.getOrderListData()
    },

    getOrderListData () { // 获取订单列表数据
      if (this.rtuNumber == null || this.rtuNumber == '') {
        this.$Message.warning('机器编号不能为空')
        return
      }
      // const day = getNowFormatDate(this.date, '')
      const day = this.date.split('-').join('')
      const rtuNumber = parseInt(this.rtuNumber)
      let cargoNo = null
      if (this.cargoNo != null && this.cargoNo != '') {
        cargoNo = parseInt(this.cargoNo)
      }
      this.orderListLoading = true
      getOrderList(rtuNumber, this.orderIdKey, null, day, this.buyState, this.pageNo, this.pageSize).then(res => {
        // console.log(res)
        const data = res.data
        this.orderListLoading = false
        this.orderData = []
        if (data.success == 1) {
          this.totalCount = data.totalCount
          this.totalAmount = data.totalAmount
          this.profitAmount = data.profitAmount
          const buyStateList = this.buyStateList
          this.orderData = data.orderList.map(item => {
            this.orderStateList.map(i => {
              if (item.orderState == i.id) {
                item.orderStateLabel = i.label
                // if (item.refundTotalAmount > 0 && i.id == 5) {
                // 	item.orderStateLabel = '部分退款'
                // }
              }
            })

            item.payTotalAmount = item.payTotalAmount.toFixed(2)
            return item
          })
        } else {
          this.$Message.error(data.errorMessage)
        }
      }).catch(error => {
        this.orderListLoading = false
        alert(error)
      })
    },
    handleModal (row) { // 显示订单详情
      // this.detailsRows = row
      // console.log(row)

      row.orderTime = timestampToTime(row.orderTime)
      this.detailsRows = row

      this.contentModalValue = true
    },
    handleClick () { // 打开日期选择器
      this.open = !this.open
    },
    handleChange (date) { // 选择时间
      this.open = false
      this.date = date
    },
    nextPage () {
      if (this.orderData.length < this.pageSize) {
        this.$Message.warning('这是最后一页')
      } else {
        this.pageNo++
        this.getOrderListData()
      }
    },
    prevPage () {
      if (this.pageNo > 0) {
        this.pageNo--
        this.getOrderListData()
      } else {
        this.$Message.warning('这是第一页')
      }
    }
  },
  mounted () {

  }

}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.orderListStyle {
			padding: 0 0.625rem;
		}

		.orderListStyle .ivu-list-item-extra {
			margin: 0;
		}

		.orderTableStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}

		.contentModalStyle .ivu-modal-header {
			text-align: center;
		}

		.contentModalStyle .ivu-modal-body {
			padding: 0;
		}

		.contentModalStyle .ivu-table-cell,
		.contentModalStyle .ivu-list-item-extra {
			padding: 0;
			margin: 0;
		}

		.contentModalStyle .ivu-poptip-confirm .ivu-poptip-body .ivu-icon-ios-help-circle {
			display: none;
		}

		.contentModalStyle .ivu-poptip-confirm .ivu-poptip-body-message {
			padding-left: 0;
		}

		.contentModalStyle .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
			font-size: 1.25rem;
			position: relative;
			cursor: pointer
		}

		.priceStyle {
			text-decoration: line-through;
		}

	}
</style>
