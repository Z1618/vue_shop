<template>
        
    <el-container class="homeContainer">
        <!--头部-->
        <el-header>
            <div>
                <img src="../assets/tubiao.png" alt="">
                <span>电商管理平台</span>
            </div>
            <el-button type="info" @click="out">退出</el-button>
        </el-header>
        <!-- 页面主体-->
        <el-container>
            <!-- 主体侧边栏-->
            <el-aside :width="isCollapse?'64px':'200px'">
                <!--展开按钮-->
                <div class="toggle" @click="toggleCollapse">|||</div>
                <!--侧边菜单栏-->
                <el-menu  background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" 
                :collapse-transition="false" router :default-active="this.activePath" >
                    <!--一级菜单-->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <!--一级模板区域-->
                        <template slot="title">
                            <i :class="iconarr[item.id]"></i><!--图标-->
                            <span>{{item.authName}}</span>
                        </template>
                        <!--二级模板区域---->
                        <el-menu-item :index="subitem.path" v-for="subitem in item.children" 
                        :key="subitem.id" @click="savenavState(subitem.path)">
                            <template slot="title"> 
                                <i class="el-icon-menu"></i><!--图标-->
                                <span>{{subitem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--右侧主体-->
            <el-main>
                <!--路由占位符-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
       return{
         //左侧菜单栏
         menulist:[],
         iconarr:{
            125:'iconfont icon-users',
            103:'iconfont icon-tijikongjian',
            101:'iconfont icon-shangpin',
            102:'iconfont icon-danju',
            145:'iconfont icon-baobiao'
         },
         isCollapse:false,
         avtivePath:''
       }
    },
    created(){
        this.getMenuList()
        this.activePath= window.sessionStorage.getItem('activePath')
        console.log(this.activePath)
    },
    methods:{
        out(){
            window.sessionStorage.clear();
            this.$router.push('/login')
        },
        //获取菜单栏
        async getMenuList(){
         const {data:res}= await  this.$http.get('menus')
         if(res.meta.status !==200) return this.$message.msg
         this.menulist=res.data
         console.log(res)
        },
        //侧边栏展开事件
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
        },
        //保存链接的激活状态
        savenavState(activePath){
            window.sessionStorage.setItem('activePath',activePath)
            this.activePath=activePath
            
        }
    }
}
</script>

<style lang="less" scoped>
.el-header{
    background-color: #171d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
        img {
            height: 100%;
        }
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
    .toggle{
        background-color: #4a5064;
        line-height: 24px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
}
.el-main{
    background-color: #eaedf1;
}
.homeContainer{
    height: 100%;
}
.iconfont {
    margin-right: 10px;
}
</style>