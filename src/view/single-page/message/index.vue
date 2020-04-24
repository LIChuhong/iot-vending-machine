<template>
	<Card shadow>
		<List :loading="listLoading">
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
					<div v-if="$store.state.user.userInfo.orgId == item.orgId">
						<li style="text-align: left;">
							<Poptip width="150" confirm title="您是否确认删除该消息?" placement="bottom-end" @on-ok="delMsg(item)">
								<Button type="text" ghost style="color: red;" size="small">删除</Button>
							</Poptip>
						</li>
						<li>

							<Button @click="hasReadmsg(item)" :disabled="item.readed" type="text" ghost :style="{color:item.readed?'#c5c8ce':'#2d8cf0'}"
							 size="small">{{item.readed?'已阅读':'阅读'}}</Button>
						</li>
					</div>
					<div v-else>
						<li>
							<Button type="text" ghost :style="{color:item.readed?'#c5c8ce':'#2d8cf0'}"
							 size="small">{{item.readed?'已阅读':'未阅读'}}</Button>
						</li>
					</div>
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
  data () {
    return {
      listLoading: false,
      pageNo: 0,
      pageSize: 10,
      messageList: [],
      oldMsgList: []
    }
  },
  computed: {

  },
  methods: {
    nextPage () {
      if (this.oldMsgList.length < this.pageSize) {
        this.$Message.warning('这是最后一页')
      } else {
        this.pageNo++
        this.getMessageListData()
      }
    },
    prevPage () {
      if (this.pageNo > 0) {
        this.pageNo--
        this.getMessageListData()
      } else {
        this.$Message.warning('这是第一页')
      }
    },
    delMsg (item) {
      this.listLoading = true
      removeReaded(item.id).then(res => {
        const data = res.data
        this.listLoading = false
        if (data.success == 1) {
          item = ''
        } else {
          this.$Message.error(errorMessage)
        }
      }).catch(error => {
        this.listLoading = false
        alert(error)
      })
    },
    hasReadmsg (item) {
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
    getMessageListData () {
      this.listLoading = true
      getMessageList(this.pageNo, this.pageSize).then(res => {
        const {
          data
        } = res
        this.listLoading = false
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
        this.listLoading = false
        alert(error)
      })
    }

  },
  mounted () {
    // console.log(this.$store.state.user.userInfo)

  },

  created () {
    this.$route.meta.keepAlive = true
    this.getMessageListData()
  }
//
}
</script>

<style lang="less">
</style>
