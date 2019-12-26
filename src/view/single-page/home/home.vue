<template>
	<div style="height: 100%;position: relative;">
		
			<chart-bg style="height: 100%;width: 100%;" ></chart-bg>
		<div style="height:50%;position: absolute;top:1%;left:10px;width: 30%;">
			<!-- eewwww -->
			<chart-right style="height: 100%;"></chart-right>
			<!-- <example style="height: 200px;position: absolute;top:0;left: 0;width: 20%;"></example> -->
		</div>
		<div style="height:49%;position: absolute;top:1%;right:0px;width: 30%;">
			<!-- eewwww -->
			<chart-right style="height: 100%;"></chart-right>
			<!-- <example style="height: 200px;position: absolute;top:0;left: 0;width: 20%;"></example> -->
		</div>
		<div style="height:49%;position: absolute;bottom:1%;right:10px;width: 30%;">
			<!-- eewwww -->
			<chart-left style="height: 100%;"></chart-left>
			<!-- <example style="height: 200px;position: absolute;top:0;left: 0;width: 20%;"></example> -->
		</div>
		<!-- <example style="height: 200px"></example> -->
	</div>
	
</template>

<script>
	// import InforCard from '_c/info-card'
	// import CountTo from '_c/count-to'
	//import mapBg from '@/assets/images/mapBg.jpg'
	import {
		ChartBg,ChartLeft,ChartRight
	} from '_c/charts'
	import Example from './example.vue'
	export default {
		name: 'home',
		components: {
			ChartBg,
			ChartLeft,
			ChartRight,
			Example
		},
		data() {
			return {

			}
		},
		mounted() {
			//
		}
	}
</script>

<style lang="less">
	.count-style {
		font-size: 50px;
	}
</style>
