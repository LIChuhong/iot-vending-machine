<template>
	<div>
		<List item-layout="vertical" class="mSdetailListStyle">
			<ListItem>
				<div><span>机器编号:</span><Input v-model="rtuNum" style="width: 50%;" placeholder="请输入机器编号"/> </div>
			</ListItem>
			<ListItem>
				<div><span>起始时间:</span>
					<DatePicker :open="startSd" :value="date" confirm type="date" @on-change="handleChange" @on-clear="handleClear"
					 @on-ok="handleOk">
						<a href="javascript:void(0)" @click="handleClick(0)">
							<Icon type="ios-calendar-outline"></Icon>
							<template>{{ startTime }}</template>
						</a>
					</DatePicker>
				</div>
			</ListItem>
			<ListItem>
				<div><span>结束时间:</span>
					<DatePicker :open="endSd" :value="date" confirm type="date" @on-change="handleChange" @on-clear="handleClear"
					 @on-ok="handleOk">
						<a href="javascript:void(0)" @click="handleClick(1)">
							<Icon type="ios-calendar-outline"></Icon>
							<template>{{ endTime }}</template>
						</a>
					</DatePicker>
				</div>
			</ListItem>
			<ListItem>
				<Row>
					<Col span="16">
					<div>
						<span>货道:</span>
						<Input v-model="aisle" style="width: 80%;" />
					</div>
					</Col>
					<Col span="8">
					<div style="text-align: right;">
						<Button type="primary">查询</Button>
					</div>
					</Col>
				</Row>
			</ListItem>
		</List>
		<Table border :columns="mSdetailColumns" :data="mSdetailData" size="small" class="mSdetailTableStyle">
			<!-- <template slot-scope="{ row }" slot="name">
		    <strong>{{ row.name }}</strong>
		</template> -->
			<template slot-scope="{ row, index }" slot="action">
				<!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
		    -->
				<!-- <Button type="text" size="10">详情</Button> -->
				<div>
				<a href="javascript:void(0)" @click="handleModal">出货明细</a>
				</div>
			</template>
		</Table>
	</div>
</template>

<script>
	import {
		mSdetailColumns
	} from '@/data/columns.js'
	export default {
		name:'mShippingDetail',
		data() {
			return {
				rtuNum:'',
				aisle:'',
				startSd:false,
				endSd:false,
				startTime: '请选择起始时间',
				endTime: '请选择结束时间',
				mSdetailColumns: mSdetailColumns,
				mSdetailData: [],
			}
		},
		methods:{
			handleClick(val) {
				if(val == 0){
					this.startSd = !this.startSd
				}else{
					this.endSd = !this.endSd
				}
			},
		}
		
	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.mSdetailListStyle{
			padding: 0 0.625rem;
		}
		.mSdetailListStyle .ivu-list-item-extra {
			margin: 0;
		}
		
		.mSdetailTableStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
	}
</style>
