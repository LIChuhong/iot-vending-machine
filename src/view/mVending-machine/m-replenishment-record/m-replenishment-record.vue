<template>
	<div>
		<List item-layout="vertical" class="mRrecordListStyle">
			<ListItem>
				<Row >
					<Col span="12">
					<div>
						<DatePicker :open="startDp" :value="date" confirm type="date" @on-change="handleChange" @on-clear="handleClear"
						 @on-ok="handleOk">
							<a href="javascript:void(0)" @click="handleClick(0)">
								<Icon type="ios-calendar-outline"></Icon>
								<template>{{ startTime }}</template>
							</a>
						</DatePicker>
					</div>
					</Col>
					<Col span="12">
					<div>
						<DatePicker :open="endDp" :value="date" confirm type="date" @on-change="handleChange" @on-clear="handleClear"
						 @on-ok="handleOk">
							<a href="javascript:void(0)" @click="handleClick(1)">
								<Icon type="ios-calendar-outline"></Icon>
								<template>{{ endTime }}</template>
							</a>
						</DatePicker>
					</div>
					</Col>
				</Row>
			</ListItem>
			<ListItem>
				<div>
					<span>机器编号:</span>
					<Input v-model="value" placeholder="请输入机器编号" style="width: 70%;" />
				</div>
			</ListItem>
			<ListItem>
				<Row>
					<Col span="16">
					<div>
						<span>货道:</span>
						<Input v-model="value" placeholder="请输入货道编号" style="width: 80%;"/>
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
		<Table border :columns="mRrecordColumns" :data="mRrecordData" size="small" class="mRrecordTableStyle">
			<template slot-scope="{ row, index }" slot="action">
				<div>
				<a href="javascript:void(0)" @click="handleModal">出货明细</a>
				</div>
			</template>
		</Table>
		<Modal v-model="mRdDetailModalValue" fullscreen footer-hide title="出货明细" class="mRdDetailModalStyle">
			<m-shipping-detail></m-shipping-detail>
		</Modal>
	</div>
</template>

<script>
	import mShippingDetail from '@/view/mVending-machine/m-shipping-detail/m-shipping-detail.vue'
	import {
		mRrecordColumns,
		// mRdDetailColumns
	} from '@/data/columns.js'
	export default {
		components:{
			mShippingDetail
		},
		data() {
			return {
				
				mRdDetailModalValue:false,
				// mRdDetailColumns:mRdDetailColumns,
				mRrecordColumns:mRrecordColumns,
				startDp:false,
				endDp:false,
				value:'',
				startTime: '请选择起始时间',
				endTime: '请选择结束时间',
				mRrecordData:[{
					time:'2020-02-12 14:01',
					aisle:5,
					rmBefore:2,
					rmAfter:6,
					name:'李坤永'
				}]
			}
		},
		methods:{
			handleModal(){
				this.mRdDetailModalValue = true
			},
			handleClick(val) {
				if(val == 0){
					this.startDp = !this.startDp
				}else{
					this.endDp = !this.endDp
				}
			},
		}
		
	}
</script>

<style>
	@media screen and (min-width:300px) and (max-width:900px) {
		.mRrecordListStyle{
			padding: 0 0.625rem;
		}
		.mRrecordListStyle .ivu-list-item-extra {
			margin: 0;
		}
		
		.mRrecordTableStyle .ivu-table-cell {
			padding: 0;
			margin: 0;
		}
		.mRdDetailModalStyle .ivu-modal-header {
			text-align: center;
		}
		.mRdDetailModalStyle .ivu-modal-body {
			padding: 0;
		}
		
	}
</style>
