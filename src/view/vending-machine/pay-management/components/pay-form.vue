<template>
	<Form ref="payModel" :model="payModel" :rules="payRule" :label-width="100">
	    <FormItem label="商户号" prop="merchantsNum">
	        <Input type="text" v-model="payModel.merchantsNum" placeholder="Username">
	        </Input>
	    </FormItem>
	    <FormItem label="SystemId" prop="systemId">
	        <Input type="text" v-model="payModel.systemId" placeholder="Password">
	        </Input>
	    </FormItem>
		<FormItem label="服务商商号" prop="serProId">
		    <Input type="text" v-model="payModel.serProId" placeholder="Password">
		    </Input>
		</FormItem>
		<FormItem label="DesKey" prop="desKey">
		    <Input type="text" v-model="payModel.desKey" placeholder="Password">
		    </Input>
		</FormItem>
		<FormItem label="SaltMd5Key" prop="saltMd5Key">
		    <Input type="text" v-model="payModel.saltMd5Key" placeholder="Password">
		    </Input>
		</FormItem>
		<FormItem label="所属用户" prop="belongUser">
		    <Input search enter-button="选择" type="text" v-model="payModel.belongUser" placeholder="Password">
		    </Input>
		</FormItem>
		<FormItem label="登录邮箱" prop="email">
		    <Input type="text" v-model="payModel.email" placeholder="Password">
		    </Input>
		</FormItem>
	    <FormItem style="text-align: center;">
	        <Button type="primary" @click="handleSubmit('payModel')"><slot></slot></Button>
	    </FormItem>
	</Form>
</template>

<script>
	export default {
		name:'pay_form',
		data(){
			return{
				payModel:{
					merchantsNum:'',
					systemId:'',
					serProId:'',
					desKey:'',
					saltMd5Key:'',
					belongUser:'',
					email:''
				},
				payRule:[]
			}
		}
	}
</script>

<style>
</style>
