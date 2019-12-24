<template>
	<div style="height: 100%;position: relative;background: red;">
			<chart-bg style="height: 100%;width: 100%;"></chart-bg>
		<div style="height: 200px;position: absolute;top:20px;left:10px;width: 30%;">
			<!-- eewwww -->
			<chart-left style="height: 100%;"></chart-left>
			<!-- <example style="height: 200px;position: absolute;top:0;left: 0;width: 20%;"></example> -->
		</div>
		<div style="height: 200px;position: absolute;top:20px;right:0;width: 30%;">
			<!-- eewwww -->
			<chart-right style="height: 100%;"></chart-right>
			<!-- <example style="height: 200px;position: absolute;top:0;left: 0;width: 20%;"></example> -->
		</div>
		<!-- <example style="height: 200px"></example> -->
	</div>
	
</template>

<script>
	// import InforCard from '_c/info-card'
	// import CountTo from '_c/count-to'
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
