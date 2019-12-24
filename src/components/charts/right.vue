<template>
	<div ref="dom"></div>
</template>

<script>
	import echarts from 'echarts'
	//import 'echarts/map/js/china.js'
	import tdTheme from './theme.json'
	import {
		on,
		off
	} from '@/libs/tools'
	echarts.registerTheme('tdTheme', tdTheme)
	export default {
		name: 'ChartRight',
		data() {
			return {
				dom: null

			}
		},
		methods: {
			resize() {
				this.dom.resize()
			}
		},
		mounted() {
			const option = {
				//backgroundColor: '#fff',
				title: {
					text: '某站点用户访问来源',
					subtext: '纯属虚构',
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
				},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [{
							value: 335,
							name: '直接访问'
						},
						{
							value: 310,
							name: '邮件营销'
						},
						{
							value: 234,
							name: '联盟广告'
						},
						{
							value: 135,
							name: '视频广告'
						},
						{
							value: 1548,
							name: '搜索引擎'
						}
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]

			}
			this.$nextTick(() => {
				this.dom = echarts.init(this.$refs.dom, 'tdTheme')
				this.dom.setOption(option)
				on(window, 'resize', this.resize)
			})
		},
		beforeDestroy() {
			off(window, 'resize', this.resize)
		}

	}
</script>

<style>
</style>
