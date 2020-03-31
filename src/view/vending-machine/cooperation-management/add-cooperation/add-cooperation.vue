<template>
	<div style="padding: 0.625rem 0.625rem;">
		 <Form ref="coopFormModel" :model="coopFormModel" :rules="coopFormRules" label-position="left" :label-width="70">
        <FormItem prop="orgName" label="组织名称">
            <Input type="text" v-model="coopFormModel.orgName" placeholder="请输入组织名称">
            </Input>
        </FormItem>
        <FormItem prop="orgType" label="组织类型">
            <Select v-model="coopFormModel.orgType">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
		<FormItem prop="parentOrg" label="所属组织">
		    <Select v-model="coopFormModel.parentOrg">
		        <Option value="beijing">New York</Option>
		        <Option value="shanghai">London</Option>
		        <Option value="shenzhen">Sydney</Option>
		    </Select>
		</FormItem>
		 <FormItem prop="parentText" label="组织描述">
            <Input v-model="coopFormModel.parentText" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述一下组织更好喔"></Input>
        </FormItem>
        <FormItem>
            
            <Button @click="handleReset('coopFormModel')" style="margin-right: 8px">重置</Button>
			 <Button type="primary" @click="handleSubmit('coopFormModel')">添加</Button>
        </FormItem>
    </Form>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				coopFormModel:{
					orgName:'',
					orgType:'',
					parentText:'',
					parentOrg:''
					
				}
			}
		}
	}
</script>

<style>
</style>
