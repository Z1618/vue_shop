<template>
    <div>
        <el-button type="info" @click="out">退出</el-button>
    </div>
</template>

<script>
import router from '@/router';
export default {
    methods:{
        out(){
            window.sessionStorage.clear();
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>

</style>