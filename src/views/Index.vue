<template>
    <div class="index">
        <div class="router-data">
            <router-view />
        </div>

        <van-tabbar v-model="active" route>
            <van-tabbar-item @click="selectLine" to="/recentList"><span class="select-img"><img :src="selectImg1" alt=""></span> <span>近期的事</span></van-tabbar-item>
            <van-tabbar-item @click="selectLine" to="/myProjectList"><span class="select-img"><img :src="selectImg2" alt=""></span> <span>我的项目</span></van-tabbar-item>
            <van-tabbar-item @click="selectLine" to="/personalInfo"><span class="select-img"><img :src="selectImg3" alt=""></span> <span>个人中心</span></van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            active: 0,
            selectImg1:require('../assets/icon01ed.png'),
            selectImg2:require('../assets/icon02.png'),
            selectImg3:require('../assets/icon03.png'),
            currentPath:''
        };
    },
    computed: {

    },
    watch: {
        active(n, o) {
            this.getCurrentSelected(n)
        }
    },
    methods: {
        selectLine() {
            
        },
        getCurrentSelected(n) {
            if(n === 0) {
                this.selectImg1 = require('../assets/icon01ed.png')
                this.selectImg2 = require('../assets/icon02.png')
                this.selectImg3 = require('../assets/icon03.png')
            }else if(n === 1) {
                this.selectImg1 = require('../assets/icon01.png')
                this.selectImg2 = require('../assets/icon02ed.png')
                this.selectImg3 = require('../assets/icon03.png')
            }else if(n === 2) {
                this.selectImg1 = require('../assets/icon01.png')
                this.selectImg2 = require('../assets/icon02.png')
                this.selectImg3 = require('../assets/icon03ed.png')
            }
        }
    },
    created() {

    },
    mounted() {
        this.currentPath = this.$route.name;
        if(this.currentPath === 'recent') {
            this.getCurrentSelected(0)
        }else if(this.currentPath === 'myProject') {
            this.getCurrentSelected(1)
        }else if(this.currentPath === 'personal') {
            this.getCurrentSelected(2)
        }
    },
};
</script>

<style scoped lang="less">
.index{
    // overflow: hidden;
    height: 100%;
    & /deep/ .van-tabbar{
        height: 48px;
    }
    .router-data{
        height: 100%;
    }
}
.van-tabbar--fixed{
    & /deep/ .van-tabbar-item__text{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction:column; 
    }
    .select-img{
        display: block;
        width: 20px;
        height: 21px;
        margin: 2px auto 5px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
