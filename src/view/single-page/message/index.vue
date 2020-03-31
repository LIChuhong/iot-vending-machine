<template>
	<Card shadow>
		<List>
			<ListItem v-for="item in messageList" :key="item.id">
				<ListItemMeta>
					<template slot="description">
						<!-- <Badge :status="!!item.readed?'error':'' "> -->
						<div>
							<span>ID:{{item.id}}</span><span style="margin-left:1.25rem;">时间:{{item.time}}</span>
						</div>
						<div>
							<span>消息:{{item.content}}</span>
						</div>
						<div>
							<span style="color: #FF0000;">帮助:{{item.help}}</span>
						</div>

					</template>
				</ListItemMeta>
				<template slot="action">
					<li style="text-align: left;">
						<Poptip width="150" confirm title="您是否确认删除该消息?" placement="bottom-end" @on-ok="delMsg(item)">
							<Button type="text" ghost style="color: red;" size="small">删除</Button>
						</Poptip>
					</li>
					<li>

						<Button @click="hasReadmsg(item)" :disabled="item.readed" type="text" ghost :style="{color:item.readed?'#c5c8ce':'#2d8cf0'}"
						 size="small">{{item.readed?'已阅读':'阅读'}}</Button>
					</li>
				</template>
			</ListItem>
		</List>
		<div style="overflow: hidden;padding:0.625rem 0.625rem;">
			<Button type="primary" ghost style="float: right;" @click="nextPage">下一页</Button>
			<Button type="primary" ghost style="float: right;margin-right: 0.625rem;" @click="prevPage">上一页</Button>
		
		</div>
	</Card>
</template>

<script>
	import {
		timestampToTime
	} from '@/libs/tools'
	import {
		getMessageList,
		hasRead,
		removeReaded
	} from '@/api/user'
	export default {
		name: 'message_page',
		data() {
			return {
				pageNo: 0,
				pageSize: 10,
				messageList: [],
				oldMsgList:[]
			}
		},
		computed: {

		},
		methods: {
			nextPage() {
				if (this.oldMsgList.length < this.pageSize) {
					this.$Message.warning('这是最后一页');
				} else {
					this.pageNo++
					this.getMessageListData()
				 }
			
			},
			prevPage() {
				if (this.pageNo > 0) {
					this.pageNo--
					this.getMessageListData()
				} else {
					this.$Message.warning('这是第一页');
				}
			},
			delMsg(item) {
				removeReaded(item.id).then(res => {
					const data = res.data
					if (data.success == 1) {
						item = ''
					} else {
						this.$Message.error(errorMessage)
					}
				}).catch(error => {
					alert(error)
				})

			},
			hasReadmsg(item) {
				hasRead(item.id).then(res => {
					const data = res.data
					if (data.success == 1) {
						item.readed = true
					} else {
						this.$Message.error(errorMessage)
					}
				}).catch(error => {
					alert(error)
				})
			},
			getMessageListData() {
				getMessageList(this.pageNo, this.pageSize).then(res => {
					const {
						data
					} = res
					if (data.success == 1) {
						this.messageList = data.messageList.map(item => {
							item.time = timestampToTime(item.time)
							return item
						})
						this.oldMsgList = this.messageList
					} else {
						this.$Message.error(errorMessage)
					}
				}).catch(error => {
					alert(error)
				})
			}

		},
		mounted() {

		},
		created() {
			this.getMessageListData()

		}

	}
</script>

<style lang="less">
</style>
