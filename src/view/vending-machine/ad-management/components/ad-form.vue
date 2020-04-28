<template>
	<div>
		<Form ref="ad" :model="ad" :rules="adRule" :label-width="100">
			<FormItem label="广告名称" prop="adName">
				<Input type="text" v-model="ad.adName" placeholder="请输入广告名称"></Input>
			</FormItem>
			<FormItem label="类型" prop="adType">
				<Select v-model="ad.adType" placeholder="请选择广告类型" style="text-align: left;">
					<Option v-for="item in adTypeList" :value="item.id" :key="item.id">{{ item.label}}</Option>
				</Select>
			</FormItem>
			<FormItem label="所属组织" prop="belongOrgId">
				<Input :disabled="disBeLong" readonly v-model="belongOrgName" search enter-button="选择" placeholder="请选择所属组织"
				 @on-search="showBelongOrgList"></Input>
			</FormItem>
			<FormItem label="切换时间间隔(单位/s)" prop="playInvTime">
				<Input type="number" v-model="ad.playInvTime" placeholder="请输入广告图片切换时间间隔(单位/s)"></Input>
			</FormItem>
			<FormItem label='广告资源' prop="adResourcesList">
				<Row v-for="(item, index) in ad.adResourcesList" :key="index" style="text-align: left;">
					<Col span="21">
					<div>
						<span>地址{{index+1}}:</span>
						<Input style="width: 80%;" type="text" v-model="item.url" placeholder="请输入图片资源Url"></Input>
					</div>
					<div style="margin: 0.3125rem 0;">
						<span>跳转{{index+1}}:</span>
						<Input :disabled="ad.adType == 0?false :true" style="width: 80%;" type="text" v-model="item.jumpLink" placeholder="请输入跳转链接Url"></Input>
					</div>
					</Col>
					<Col span="3">
					<Button v-show="index != 0" type="error" @click="handleRemove(index)">删除</Button>
					</Col>
				</Row>
				<div style="position: absolute;right: 0;bottom: 0;">
					<Button type="primary" ghost @click="handleAdd" icon="md-add">添加</Button>
				</div>

			</FormItem>

			<FormItem>
				<Button @click="handleReset('ad')" style="margin-right: 8px">重置</Button>
				<Button type="primary" @click="handleSubmit('ad')">
					<slot></slot>
				</Button>

			</FormItem>
		</Form>
		<Modal :title="'当前选择:'+ belongOrgTitle" v-model="showBelongOrg">
			<div slot="close" style="float: left;">
				<Icon size="30" type="ios-arrow-forward" color="rgb(81,90,110)"></Icon>
			</div>
			<div class="tree-style">
				<org-tree v-if="showBelongOrg" @getBelongOrgInfo="showBelongOrgInfo"></org-tree>
			</div>
			<div slot="footer">

				<Button type="primary" size="large" @click="belongOrgOk">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import {
		addAdvertisement,
		getAdvertisement,
		updateAdvertisement
	} from '@/api/ad'
	import OrgTree from '@/view/mVending-machine/components/org-tree.vue'
	export default {
		name: 'ad_form',
		components: {
			OrgTree
		},
		props: ['adId'],
		data() {
			const validateAdName = (rule, value, callback) => {
				if (!value || value.replace(/\s*/g, "") == "") {
					return callback(new Error('广告名称不能为空'));
				} else if (value.length >= 30) {
					return callback(new Error('输入字符过长'));

				} else {
					callback();
				}
			};
			return {
				disBeLong: false,
				belongOrgTitle: '',
				showBelongOrg: false,
				belongOrgName: '',
				belongOrgInfo: '',
				ad: {
					playInvTime: '',
					adName: '',
					adType: 0,
					belongOrgId: '',
					adResourcesList: [{
						url: '',
						jumpLink: ''
					}]
				},
				adTypeList: [{
					id: 0,
					label: '图片'
				}, {
					id: 1,
					label: '视频'
				}],
				adRule: {
					adName: [{
						required: true,
						validator: validateAdName,
						trigger: 'blur'
					}],
					belongOrgId: [{
						required: true,
						type: 'number',
						message: '请选择用户所属组织',
						trigger: 'change'
					}],
					adType: [{
						required: true,
						type: 'number',
						message: '请选择用户角色',
						trigger: 'change'
					}],
				}

			}
		},
		watch: {
			// adId(val) {
			// 	this.getAdInfo()
			// }
		},
		methods: {
			getAdInfo() {
				if (this.adId != null && this.adId != '') {
					this.disBeLong = true
					getAdvertisement(this.adId).then(res => {
						const data = res.data
						console.log(data)
						if (data.success == 1) {
							const advertisement = data.advertisement
							this.ad.adName = advertisement.adName
							this.ad.adType = advertisement.adType
							this.ad.belongOrgId = advertisement.belongOrgId
							this.ad.adResourcesList = advertisement.adResourcesList
							this.belongOrgName = advertisement.orgName
							this.ad.playInvTime = advertisement.playInvTime
						} else {

						}

					}).catch(error => {
						alert(error)
					})
				}

			},
			showBelongOrgList() {
				//alert(1)
				this.belongOrgTitle = this.belongOrgName
				this.showBelongOrg = true

			},
			showBelongOrgInfo(data) {
				//console.log(JSON.stringify(data))
				this.belongOrgInfo = data
				this.belongOrgTitle = data[0].orgName
				//this.belongOrgTitle = '当前选择: ' + val[0].orgName
			},
			belongOrgOk() {
				//const selectedNodes = this.$refs.belongOrgTree.getSelectedNodes();
				this.ad.belongOrgId = this.belongOrgInfo[0].id
				this.belongOrgName = this.belongOrgInfo[0].orgName
				this.showBelongOrg = false
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.ad.playInvTime = this.ad.playInvTime == null || this.ad.playInvTime == '' ? null : parseInt(this.ad.playInvTime)
						if (this.adId != null && this.adId != '') {
							this.ad.id = this.adId
							updateAdvertisement(this.ad).then(res => {
								const data = res.data
								if (data.success == 1) {
									this.$Message.success('修改成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								alert(error)
							})

						} else {
							addAdvertisement(this.ad).then(res => {
								const data = res.data
								if (data.success == 1) {
									this.$Message.success('添加成功')
								} else {
									this.$Message.error(data.errorMessage)
								}
							}).catch(error => {
								alert(error)
							})

						}
					} else {
						//this.$Message.error('Fail!');
					}
				})

			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			handleAdd() {
				this.ad.adResourcesList.push({
					url: '',
					jumpLink: ''
				});
			},
			handleRemove(index) {
				this.ad.adResourcesList.splice(index, 1);
			}
		},
		mounted() {
			//console.log(1)
			this.getAdInfo()
		},
	}
</script>

<style>
</style>
