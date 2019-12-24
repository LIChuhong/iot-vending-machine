<template>
	<Form ref="userModel" :model="userModel" :rules="userRule" :label-width="80">
        <FormItem label="用户名" prop="userName">
            <Input type="text" v-model="userModel.userName" placeholder="Username">
            </Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="userModel.password" placeholder="Password">
            </Input>
        </FormItem>
		<FormItem label="确认密码" prop="againPassword">
		    <Input type="password" v-model="userModel.againPassword" placeholder="Password">
		    </Input>
		</FormItem>
		<FormItem label="用户级别" prop="userType">
            <RadioGroup v-model="userModel.userType">
                <Radio label="male">用户</Radio>
                <Radio label="female">客户管理员</Radio>
				<Radio label="female1">系统管理员</Radio>
            </RadioGroup>
        </FormItem>
		<FormItem label="头像" prop="userLogo" style="height: 100px;">
			<img style="float: left;margin-right: 16px;" src="../../../../assets/images/雪碧.png" width="50" />
			<Upload multiple style="float: left;" action="//jsonplaceholder.typicode.com/posts/">
				<Button icon="ios-cloud-upload-outline">上传</Button>
			</Upload>
			<!-- <Input type="text" v-model="goodsModel.goodsImg" number></Input> -->
		</FormItem>
		<FormItem label="真实姓名" prop="realName">
		    <Input type="text" v-model="userModel.realName" placeholder="Username">
		    </Input>
		</FormItem>
		<FormItem label="联系电话" prop="tel">
		    <Input type="text" v-model="userModel.tel" placeholder="Username">
		    </Input>
		</FormItem>
		<FormItem label="所属公司" prop="belongCompany">
		    <Select v-model="userModel.belongCompany">
                <Option value="beijing">xxx</Option>
            </Select>
		</FormItem>
        <FormItem style="text-align: center;">
            <Button type="primary" @click="handleSubmit('userModel')"><slot></slot></Button>
        </FormItem>
    </Form>
</template>

<script>
	export default{
		name:'user_form',
		data(){
			return{
				userModel:{
					userName:'',
					password:'',
					againPassword:'',
					userType:'',
					userLogo:'',
					realName:'',
					tel:'',
					belongCompany:''
				},
				userRule:[]
				
			}
		}
	}
</script>

<style>
</style>
