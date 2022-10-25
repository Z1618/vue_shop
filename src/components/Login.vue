<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像区域-->
            <div class="avater_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!--表单区域-->
            <el-form ref="loginFormRef" :model="login_Form" :rules="loginRules" label-width="0px" class="login_form" >
                <el-form-item prop="username">
                    <el-input v-model="login_Form.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="login_Form.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <!--按钮区域-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>


<script>
import { Result } from 'element-ui';


export default {
    data() {
        return{
        //表单绑定数据
            login_Form: {
                username: 'admin',
                password: '123456',
            },
            //表单验证规则
            loginRules: {
                //用户名验证规则
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                //密码验证规则
                password: [
                    { required: true, message: '密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
            }
        };
    },
    methods:{
        //表单重置
        resetLoginForm() {
            //console.log(this);
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            this.$refs.loginFormRef.validate(async valid =>{
                 if(!valid) return ;
                 const {data: res}=await this.$http.post("login",this.login_Form);
                 if(res.meta.status !==200) return this.$message.error("登录失败！");
                 this.$message.success("登录成功");
                console.log(res);
                //1.将成功后的token保存到客户端的sessionStorage中
                // 1.1项目中除了登录以外的API接口。必须在登录后访问
                // 1.2token只应在当前网站打开期间生效。将token保存在sessionStorage中
                window.sessionStorage.setItem("token",res.data.token)
                //2通过编程式导航跳转后台主页、路由地址/home
                this.$router.push("/home")
            });
        }
    }
};
</script>



<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    height: 300px;
    width: 450px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avater_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .login_form{
        width: 100%; 
        position:absolute;
        bottom: 0;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns{
        float: right;
        justify-content: flex-end;
    }
}
</style>