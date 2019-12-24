<template>
	<div>
		<Form ref="shippingModel" :model="shippingModel" :rules="shippingRule" inline :label-width="70">
			<FormItem label="机器编号" prop="rtuNum">
				<Input type="text" v-model="shippingModel.rtuNum" placeholder="Username">
				</Input>
			</FormItem>
			<FormItem label="时间范围" prop="dateTime">
				<DatePicker type="datetimerange" placement="bottom-end" placeholder="Select date" style="width: 350px"></DatePicker>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('shippingModel')">查找</Button>
			</FormItem>
		</Form>
		<Table size="small" border :columns="shippingColumns" :data="shippingList">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" style="margin-right: 5px" @click="getGoodsDetail(row)">明细</Button>
			</template>
		</Table>
		<Modal v-model="showGoodsDetail" fullscreen title="出货明细" footer-hide>
			<div>This is a fullscreen modal</div>
		</Modal>

	</div>
</template>

<script>
	import {
		shippingColumns
	} from '@/data/columns.js'
	export default {
		name: 'shipping_detail',
		data() {
			return {
				showGoodsDetail: false,
				shippingModel: {
					rtuNum: '',
					dateTime: '',

				},
				shippingRule: [],
				shippingColumns: shippingColumns,
				shippingList: [{}],

			}
		},
		methods: {
			getGoodsDetail(row) {
				this.showGoodsDetail = true
			}
		},

	}
</script>

<style>
</style>
