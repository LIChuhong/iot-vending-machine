<template>
	<div>
		<div style="overflow: hidden;padding-bottom: 8px;">
			<Select v-model="model1" style="width: 100px;float: left;margin-right: 8px;">
				<Option value="0">名称</Option>
				<Option value="1">编号</Option>
			</Select>
			<Input search enter-button placeholder="请输入关键字" @on-search="findRtuList" style="width: 300px;float: left;" />
		</div>
		<Table size="small" border :columns="rtuColumns" :data="rtuList">
			<template slot-scope="{ row, index }" slot="name-type-serialNumber">
			</template>
			<template slot-scope="{ row, index }" slot="payAccount-mannerPlay">
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<div style="margin:8px 0;">
					<Button type="success" icon="md-search" size="small" style="margin-right: 5px" @click="monitorOnline(row)">检测在线</Button>
					
					<Button type="error" icon="md-trash" size="small" @click="rtuDel(row)">删除</Button>
				</div>
				<div>
					<Button type="warning" size="small"  @click="rtuAisle(row)">机器货道</Button>
					<Button size="small" icon="md-create" style="margin:0 5px" @click="rtuEditor(row)">编辑</Button>
					<Button type="primary" size="small" @click="setDivided(row)">设置分成</Button>
				</div>
			</template>

		</Table>
	</div>
</template>

<script>
	import { getRtuList } from '@/api/v-rtu-manage'
	import {
		rtuColumns
	} from '@/data/columns.js'
	export default {
		name: 'my_rtu',
		data() {
			return {
				rtuColumns: rtuColumns,
				rtuList: [{}]

			}
		},
		methods: {
			monitorOnline(row){
				//检测在线
				
			},
			rtuAisle(row){
				//机器货道
			},
			rtuEditor(row){
				//机器编辑
			},
			rtuDel(row){
				//机器删除
			},
			setDivided(row){
				//设置分成
			},
			findRtuList(){
				//查找机器列表
			}
		}
	}
</script>

<style>
</style>
