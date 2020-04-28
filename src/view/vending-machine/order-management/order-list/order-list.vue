<template>
	<div>
		<div style="overflow: hidden;">
			<p class="showText">订单总笔额:<span style="color: #fa8c35;">{{vmOrgTotalCount}}</span></p>
			<p class="showText">订单总金额:<span style="color: #9ed900;">{{vmOrgTotalAmount.toFixed(2)}}</span></p>
			<p class="showText">订单数:<span style="color: #fa8c35;">{{totalCount}}</span></p>
			<p class="showText">收入:<span style="color: #9ed900;">{{totalAmount.toFixed(2)}}</span></p>
			<p class="showText">利润:<span style="color: #f00056;">{{profitAmount.toFixed(2)}}</span></p>
		</div>
		<Form ref="orderModel" :model="orderModel" :rules="orderRule" inline>
			<FormItem prop="orderIdKey">
				<Input type="text" v-model="orderModel.orderIdKey" placeholder="请输入订单ID关键字(可选)" style="width: 200px" />
			</FormItem>
			<FormItem prop="rtuNumber">
				<Input type="number" v-model="orderModel.rtuNumber" placeholder="请输入机器编号(可选)" />
			</FormItem>
			<FormItem prop="cargoNo">
				<Input type="number" v-model="orderModel.cargoNo" placeholder="请输入货道编号(可选)" />
			</FormItem>
			<FormItem prop="buyState">
				<Select v-model="orderModel.buyState" placeholder="请选择订单类型">
					<Option v-for="item in buyStateList" :key="item.id" :value="item.id">{{item.table}}</Option>
				</Select>
			</FormItem>
			<FormItem prop="day">
				<DatePicker :editable="false" type="date" placeholder="请选择日期" v-model="orderModel.day"></DatePicker>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="setOrderListData">查询</Button>
			</FormItem>
		</Form>
		<Table :loading="orderListLoading" border :columns="orderColumns" :data="orderList" size="small">
			<template slot-scope="{ row }" slot="orderId">
				<p>{{row.payTypeName}}:{{row.transaction_id}}</p>
				<p>商户:{{row.orderId}}</p>
			</template>
			<template slot-scope="{ row }" slot="customerInfo">
				<div v-if="row.wechatUserInfo != undefined">
				<p>openId:{{row.wechatUserInfo.openid}}</p>
				<img :src="row.wechatUserInfo.headimgurl" width="50" height="50" style="float: right;" />
				<p>昵称:{{row.wechatUserInfo.nickname}}</p>
				<p>所在城市:{{row.wechatUserInfo.province+'-'+row.wechatUserInfo.city}}</p>
				</div>
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<p>下单时间:{{row.orderTime}}</p>
				<p>支付完成:{{row.payedFinishTime}}</p>
				<p>出货时间:{{row.outCommoditysFinishedTime}}</p>
				<Button icon="md-cart" type="primary" size="small" @click="showOrderDetails(row)">详情</Button>
			</template>
		</Table>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>

		</div>
		<Modal v-model="showShopping" title="购物车详情" footer-hide width="90">
			<shopping-details :detailsRows="detailsRows" v-if="showShopping"></shopping-details>
		</Modal>
	</div>
</template>

<script>
import { getOrderList } from '@/api/order'
import shoppingDetails from './shopping-details.vue'
import {
  getNowFormatDate,
  timestampToTime
} from '@/libs/tools'
import {
  orderColumns
} from '@/data/columns.js'
export default {
  name: 'order_list',
  components: {
    shoppingDetails
  },
  data () {
    return {
      orderRule: {},
      detailsRows: '',
      orderListLoading: false,
      showShopping: false,
      vmOrgTotalAmount: 0, // 订单总金额
      vmOrgTotalCount: 0, // 订单总笔数
      totalAmount: 0, // 收入
      totalCount: 0, // 订单数
      profitAmount: 0, // 利润
      pageNo: 0,
      pageSize: 10,
      orderModel: {
        orderIdKey: '', // 关键字
        rtuNumber: null, // 机器编号
        cargoNo: null, // 货道编号
        buyState: 0, // 订单状态
        day: new Date()
      },
      buyStateList: [{
        id: 0,
        table: '所有订单'
      },
      {
        id: 1,
        table: '购买成功'
      },
      {
        id: 2,
        table: '购买失败'
      }
      ],
      orderList: [],
      orderColumns: orderColumns,
      orderStateList: [{
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
  methods: {
    setOrderListData () {
      this.pageNo = 0
      this.getOrderListData()
    },
    nextPage () {
      if (this.orderList.length < this.pageSize) {
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
    },
    getOrderListData () {
      if (this.orderModel.day == '' || this.orderModel.day == null) {
        this.$Message.warning('请先选择日期')
        return
      }

      var orderIdKey = this.orderModel.orderIdKey
      let rtuNumber = null
      if (this.orderModel.rtuNumber != null && this.orderModel.rtuNumber != '') {
        rtuNumber = parseInt(this.orderModel.rtuNumber)
      }
      let cargoNo = null
      if (this.orderModel.cargoNo != null && this.orderModel.cargoNo != '') {
        cargoNo = parseInt(this.orderModel.cargoNo)
      }
      var day = getNowFormatDate(this.orderModel.day, '')
      var buyState = this.orderModel.buyState
      this.orderListLoading = true
      getOrderList(rtuNumber, orderIdKey, cargoNo, day, buyState, this.pageNo, this.pageSize).then(res => {
        const data = res.data
        this.orderListLoading = false
        this.orderList = []
        if (data.success == 1) {
          this.vmOrgTotalAmount = data.vmOrgTotalAmount
          this.vmOrgTotalCount = data.vmOrgTotalCount
          this.totalAmount = data.totalAmount
          this.totalCount = data.totalCount
          this.profitAmount = data.profitAmount
          this.orderList = data.orderList.map(item => {
            this.orderStateList.map(i => {
              if (item.orderState == i.id) {
                item.orderStateName = i.label
                // if(item.refundedTotalAmount < item.totalCostAmount && i.id == 5){
                // 	item.orderStateName = '部分退款'
                // }
              }
            })
            item.payTotalAmount = item.payTotalAmount.toFixed(2)
            if (item.payType == 'WX') {
              item.payTypeName = '微信'
            } else {
              item.payTypeName = '支付宝'
            }
            item.orderTime = this.getTime(item.orderTime)
            // item.payedFinishTime = this.getTime(item.payedFinishTime)
            if (item.payedFinishTime != 0) {
              item.payedFinishTime = this.getTime(item.payedFinishTime)
            } else {
              item.payedFinishTime = ''
            }
            if (item.outCommoditysFinishedTime != 0) {
              item.outCommoditysFinishedTime = this.getTime(item.outCommoditysFinishedTime)
            } else {
              item.outCommoditysFinishedTime = ''
            }

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
    showOrderDetails (row) {
      this.detailsRows = row
      this.showShopping = true
    },
    getTime (data) {
      var date = ''
      if (data == 0 || data == null || data == '') {
        date = data
      } else {
        date = timestampToTime(data)
      }
      return date
    }
  },
  mounted () {

  },
  created () {
    this.$route.meta.keepAlive = true
    this.getOrderListData()
  }

}
</script>

<style scoped="scoped">
	.showText {
		float: left;
		width: 20%;
	}

	.textColor {
		color: red;
	}
</style>
