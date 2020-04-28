<template>
	<div class="shopping">
		<!-- {{detailsRows}} -->
		<div style="overflow: hidden;">
			<p class="shoppingText">订单号:<span class="shoppingColor">{{detailsRows.orderId}}</span></p>
			<p class="shoppingText">机器编号:<span class="shoppingColor">{{detailsRows.rtuNumber}}</span></p>
			<p class="shoppingText">下单时间:<span class="shoppingColor">{{detailsRows.orderTime}}</span></p>
			<p class="shoppingText">订单状态:<span class="shoppingColor">{{detailsRows.orderStateName}}</span></p>
		</div>
		<Table :loading = "tableLoading" border :columns="shoppingColumns" :data="detailsRows.shoppingCart.buyCommodityList" size="small">
			<template slot-scope="{ row, index }" slot="price">
				{{row.price.toFixed(2)}}
			</template>
			<template slot-scope="{ row, index }" slot="costPrice">
				{{row.costPrice.toFixed(2)}}
			</template>
			<template slot-scope="{ row, index }" slot="failureCount">
				{{row.buyCount-row.finishCount}}
			</template>
			<template slot-scope="{ row, index }" slot="totalPrice">
				{{(row.price*row.buyCount).toFixed(2)}}
			</template>
			<template slot-scope="{ row, index }" slot="totalCostPrice">
				{{(row.costPrice*row.finishCount).toFixed(2)}}
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<Poptip confirm @on-ok="refundTotal(row)" placement="left">
					<template slot="title">

						<Icon type="md-remove-circle" @click="redCount(row)" />
						{{count}}个
						<Icon type="md-add-circle" @click="addCount(row)" />

					</template>
					<Button :disabled="(row.buyCount - row.finishCount - row.refundedCount) > 0 && detailsRows.orderState > 0 ? false : true"
					 type="warning" @click="setCount(row)">退款</Button>

				</Poptip>
			</template>
			<div slot="footer" style="height: 36px;"></div>

		</Table>
	</div>
</template>

<script>
import {
  shoppingColumns
} from '@/data/columns.js'
import {
  refund
} from '@/api/order'
export default {
  name: 'shopping_details',
  props: ['detailsRows'],
  data () {
    return {
      shoppingColumns: shoppingColumns,
      count: 0,
      tableLoading: false
    }
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
          row.refundedCount += this.count
          this.$Message.success('退款成功')
        } else {
          this.$Message.error(data.errorMessage)
        }
      }).catch(error => {
        this.tableLoading = false
        alert(error)
      })
    }

  }

}
</script>

<style scoped="scoped">
	.shoppingText {
		float: left;
		width: 25%;
	}

	.shoppingColor {
		color: red;
	}
</style>
<style>
	.shopping .ivu-poptip-confirm .ivu-poptip-body .ivu-icon-ios-help-circle {
		display: none;
	}

	.shopping .ivu-poptip-confirm .ivu-poptip-body-message {
		padding-left: 0;
	}

	.shopping .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
		font-size: 1.25rem;
		position: relative;
		cursor: pointer
	}
</style>
