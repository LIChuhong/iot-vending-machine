<template>
	<div id="dom" ref="dom"></div>
	<!-- <div id="chinaMap" :style="{height:'700px',width:'100%'}" ref="myEchart"></div> -->
</template>

<script>
	import echarts from 'echarts'
	//import 'echarts/map/js/china.js'
	import 'echarts/extension/bmap/bmap'
	import tdTheme from './theme.json'
	import {
		on,
		off
	} from '@/libs/tools'
	echarts.registerTheme('tdTheme', tdTheme)
	export default {
		name: 'ChartBg',
		data() {
			return {
				dom: null

			}
		},
		methods: {
			resize() {
				this.dom.resize()
			},
			createMap() {
				/* eslint-disable */
				// 创建Map实例
				// let map =new BMap.Map(this.$refs.allmap); // 创建Map实例 
				// // 初始化地图,设置中心点坐标和地图级别
				// map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
				// //添加地图类型控件
				// map.addControl(new BMap.MapTypeControl({
				//   mapTypes:[BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
				// }))
				// // 设置地图显示的城市 此项是必须设置的
				// map.setCurrentCity("北京")
				// //开启鼠标滚轮缩放
				// map.enableScrollWheelZoom(true)
				/* eslint-enable */
				var map = new BMap.Map(this.$refs.dom, {
					minZoom: 7,
					maxZoom: 18
				}); // 创建Map实例
				map.centerAndZoom(new BMap.Point(103.841674, 36.067566), 8); // 初始化地图,设置中心点坐标和地图级别
				map.enableScrollWheelZoom();

				var cityName = '甘肃省';
				//map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
				map.enableScrollWheelZoom();
				map.addControl(new BMap.NavigationControl({
					type: BMAP_NAVIGATION_CONTROL_LARGE,
					anchor: BMAP_ANCHOR_TOP_LEFT,
					offset: new BMap.Size(40, 250)
				}));
				var bdary = new BMap.Boundary();
				bdary.get(cityName, function(rs) { //获取行政区域       
					var EN_JW = "180, 90;"; //东北角
					var NW_JW = "-180,  90;"; //西北角
					var WS_JW = "-180, -90;"; //西南角
					var SE_JW = "180, -90;"; //东南角
					//4.添加环形遮罩层
					var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW, {
						strokeColor: "none",
						fillColor: "rgb(246,246,246)",
						fillOpacity: 1,
						strokeOpacity: 0.5
					}); //建立多边形覆盖物
					map.addOverlay(ply1);
				});
				this.showMap()

			},
			showMap() {
				
					const option = {
						backgroundColor: 'transparent',
						title: {
							text: '智能园林大数据图',
							x: 'center',
							textStyle: {
								//color: '#ffffff',
							}
						},

						bmap: {
							center: [103.841674, 36.067566],
							zoom: 8,
							roam: true,
							mapStyle: {
								styleJson: [{
										'featureType': 'land', //调整土地颜色
										'elementType': 'geometry',
										'stylers': {
											'color': '#081734'
										}
									},
									{
										'featureType': 'building', //调整建筑物颜色
										'elementType': 'geometry',
										'stylers': {
											'color': '#04406F'
										}
									},
									{
										'featureType': 'building', //调整建筑物标签是否可视
										'elementType': 'labels',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'highway', //调整高速道路颜色
										'elementType': 'geometry',
										'stylers': {
											'color': '#081734'
										}
									},
									{
										'featureType': 'highway', //调整高速名字是否可视
										'elementType': 'labels',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'arterial', //调整一些干道颜色
										'elementType': 'geometry',
										'stylers': {

											'color': '#081734'
										}
									},
									{
										'featureType': 'arterial',
										'elementType': 'labels',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'green',
										'elementType': 'geometry',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'water',
										'elementType': 'geometry',
										'stylers': {
											'color': '#044161'
										}
									},
									{
										'featureType': 'subway', //调整地铁颜色
										'elementType': 'geometry.stroke',
										'stylers': {

											'color': '#081734',

										}
									},
									{
										'featureType': 'subway',
										'elementType': 'labels',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'railway',
										'elementType': 'geometry',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'railway',
										'elementType': 'labels',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'all', //调整所有的标签的边缘颜色
										'elementType': 'labels.text.stroke',
										'stylers': {
											'color': '#313131'
										}
									},
									{
										'featureType': 'all', //调整所有标签的填充颜色
										'elementType': 'labels.text.fill',
										'stylers': {
											'color': '#FFFFFF'
										}
									},
									{
										'featureType': 'manmade',
										'elementType': 'geometry',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'manmade',
										'elementType': 'labels',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'local',
										'elementType': 'geometry',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'local',
										'elementType': 'labels',
										'stylers': {
											'visibility': 'off'
										}
									},
									{
										'featureType': 'subway',
										'elementType': 'geometry',
										'stylers': {
											'lightness': -65
										}
									},
									{
										'featureType': 'railway',
										'elementType': 'all',
										'stylers': {
											'lightness': -40
										}
									},
									{
										'featureType': 'boundary',
										'elementType': 'geometry',
										'stylers': {
											'color': '#8b8787',
											'weight': '1',
											'lightness': -29
										}
									}
								],
							},
							//addOverlay: ply1,
							

						},

						tooltip: {
							trigger: 'item'
						},

						toolbox: {
							show: true,
							orient: 'vertical',
							x: 'right',
							y: 'center',
							showTitle: false,
							feature: {
								mark: {
									show: true
								},
								dataView: {
									show: true,
									readOnly: false
								},
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},


						series: [{
							type: 'scatter',
							coordinateSystem: 'bmap',
						}]
					}
				this.$nextTick(() => {
					this.dom = echarts.init(this.$refs.dom, 'tdTheme')
					this.dom.setOption(option)
					on(window, 'resize', this.resize)

				})
			}
		},
		mounted() {
			this.showMap()

		},
		beforeDestroy() {
			off(window, 'resize', this.resize)
		}


	}
</script>

<style>
</style>
