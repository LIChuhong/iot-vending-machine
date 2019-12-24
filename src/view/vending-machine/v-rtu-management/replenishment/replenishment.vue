<template>
	<List size="large" item-layout="vertical">
		<div slot="header" class="listHeader">
			<Input search enter-button placeholder="请输入设备编号" @on-search="findRtu" style="width: 200px;float: left;" />
			<span class="listSpan">机器编号:<span class="spanColor">{{rtuNum}}</span></span>
			<span class="listSpan">货道数量:<span class="spanColor">{{aisleNum}}</span></span>
			<span class="listSpan">库存:<span class="spanColor">{{inventory}}</span></span>
			<Button style="float: right;margin-left: 8px;" type="primary" @click="setDivided(row)">保存</Button>
			<Input search enter-button="一键补满" placeholder="请输入库存补满数量" @on-search="findRtu" style="width: 250px;float: right;" />
		</div>
		<ListItem style="overflow: hidden;text-align: center;" v-for="i in 10" :key="i">
			<div style="float: left;overflow: hidden;width: 5%;" >
				<div style="height: 50px;overflow: hidden;"></div>
				<div class="listItemText">名称</div>
				<div class="listItemText">库存</div>
				<div class="listItemText">预警</div>
				<div class="listItemText">编号</div>
			</div>
			<div style="float: left;width: 9%;overflow: hidden;padding-left: 0.5%;" v-for="i in 10" :key="i">
				<div style="height: 50px;overflow: hidden;">
				<img src="../../../../assets/images/雪碧.png" height="100%" />
				</div>
				<div class="listItemText">可乐</div>
				<div class="listItemText"><Input size="small" type="text"></Input></div>
				<div class="listItemText"><Input size="small" type="text"></Input></div>
				<div class="listItemText">
					 <Badge style="cursor:pointer" :count="i"></Badge>
				</div>
			</div> 
		</ListItem>
	
	</List>
</template>

<script>
	export default {
		name: 'replenishment',
		data() {
			return {
				rtuNum: 100000,
				aisleNum: 2000,
				inventory: 6000

			}
		}
	}
</script>

<style>
	.listHeader {
		overflow: hidden;
		height: 100%;
		padding-bottom: 5px;
		/* background-color: #000000; */

	}
	.listItemText{
		height: 24px;
		margin-top: 5px;
	}
	.listItemText .ivu-input-small{
		text-align: center
	}

	.spanColor {
		color: red;
	}

	.listSpan {
		padding: 10px 10px;
	}
</style>
