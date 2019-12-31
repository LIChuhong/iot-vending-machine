<template>
	<div id="dom" ref="dom"></div>
	<!-- <div id="chinaMap" :style="{height:'700px',width:'100%'}" ref="myEchart"></div> -->
</template>

<script>
	import echarts from 'echarts'
	import 'echarts/map/js/china.js'
	import 'echarts/extension/bmap/bmap'
	import tdTheme from './theme.json'
	import mapConfig from './custom_map_config.json'
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

				// var map = new BMap.Map(this.$refs.dom, {
				// 	minZoom: 7,
				// 	maxZoom: 18
				// }); // 创建Map实例
				//map.centerAndZoom(new BMap.Point(103.841674, 36.067566), 8); // 初始化地图,设置中心点坐标和地图级别
				var map = this.dom.getModel().getComponent('bmap').getBMap();
				//map.enableScrollWheelZoom();
				map.setMinZoom(7);
				map.setMaxZoom(18);

				var cityName = '北京市';
				//map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
				//map.enableScrollWheelZoom();
				// map.addControl(new BMap.NavigationControl({
				// 	type: BMAP_NAVIGATION_CONTROL_LARGE,
				// 	anchor: BMAP_ANCHOR_TOP_LEFT,
				// 	offset: new BMap.Size(40, 250)
				// }));
				//map.clearOverlays(); // 清除地图的其余覆盖物
				var bdary = new BMap.Boundary();
				bdary.get(cityName, function(rs) { //获取行政区域       
					var EN_JW = "180, 90;"; //东北角
					var NW_JW = "-180,  90;"; //西北角
					var WS_JW = "-180, -90;"; //西南角
					var SE_JW = "180, -90;"; //东南角
					//4.添加环形遮罩层
					var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW, {
						strokeColor: "none",
						fillColor: "#044161",
						fillOpacity: 1,
						strokeOpacity: 0.5,

					}); //建立多边形覆盖物
					map.addOverlay(ply1);
				});

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

					// bmap: {
					// 	center: [116.397128,39.916527],
					// 	zoom: 10,
					// 	roam: true,
					// 	mapStyle: {
					// 		styleJson: mapConfig
					// 	},
					// },
					geo: {
						map: 'china',
						roam: true,
						label: {
							normal: {
								show: true,
								color:'#1e67b2'
							},
							emphasis: {
								show: true,
								color:'#fff'
							}
						},
						itemStyle: {
							normal: {
								areaColor: "#081734",
								borderColor: "#8b8787"
							},
							emphasis: {
								areaColor: "#1e67b2"
							}
					
						}
					},

					tooltip: {
						trigger: 'item',
						formatter: function(params) {
							return params.name + ' : ' + params.value[2];
						}
					},

					// toolbox: {
					// 	show: true,
					// 	orient: 'vertical',
					// 	x: 'right',
					// 	y: 'center',
					// 	showTitle: false,
					// 	feature: {
					// 		mark: {
					// 			show: true
					// 		},
					// 		dataView: {
					// 			show: true,
					// 			readOnly: false
					// 		},
					// 		restore: {
					// 			show: true
					// 		},
					// 		saveAsImage: {
					// 			show: true
					// 		}
					// 	}
					// },
					// 
					visualMap: {
						min: 0,
						max: 500,
						calculable: true,
						inRange: {
							color: ['#50a3ba', '#eac736', '#d94e5d']
						},
						textStyle: {
							color: '#fff'
						}
					},
					series: [{
						name: '智能园林大数据',
						type: 'scatter',
						coordinateSystem: 'geo',
						data: [
							{
							name: "三水区",
							value: [112.87, 23.17, 100],
							//symbol:'image://https://b-gold-cdn.xitu.io/v3/static/img/45.b99ea03.svg',
						},
						 {
						 	name: "高明区",
						 	value: [112.89262, 22.90026, 250],
							//symbol:'image://https://b-gold-cdn.xitu.io/v3/static/img/45.b99ea03.svg',
						 },
						 {
						 	name: "顺德区",
						 	value: [113.29321, 22.80536, 450],
							//symbol:'image://https://b-gold-cdn.xitu.io/v3/static/img/45.b99ea03.svg',
						 },
						 ],
						symbol:'image://https://b-gold-cdn.xitu.io/v3/static/img/45.b99ea03.svg',
						//symbol:(value: Array|number, params: Object) => string
						symbolSize: 30,
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: false,
								
							}
						},
						itemStyle: {
							emphasis: {
								borderColor: '#fff',
								borderWidth: 1,
								//symbolSize: 30,
							}
						}

					}]
				}
				this.$nextTick(() => {
					this.dom = echarts.init(this.$refs.dom, 'tdTheme')
					this.dom.setOption(option)
					//this.createMap()
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
	.BMap_cpyCtrl {
		display: none;
	}

	.anchorBL {
		display: none;
	}
</style>
