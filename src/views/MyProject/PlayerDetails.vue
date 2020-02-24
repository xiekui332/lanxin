<template>
    <div class="wrapper">
        <div class="container">
            <div class="player-item" v-for="(item) in playerList" :key="item.id">
                <div class="img-box">
                    <img v-if="item.user_img" :src="item.user_img" alt="">
                    <span v-else>{{item.username ? item.username.substring(0, 1):'无'}}</span>
                </div>
                <p class="name">{{item.username}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getProDetail } from '@/service/api'
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            playerList:[]
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        init() {
            let params = {
                id: this.$route.query.id
            }
            getProDetail(params).then((res) => {
                if(res.task && res.task.userList && res.task.userList.length) {
                    this.playerList =  res.task.userList
                }else{
                    this.$toast('暂无数据');
                }
                
            })
            .catch((err) => {
                this.$toast('请求失败');
            })
        }
    },
    created() {
        this.init()
    },
    mounted() {

    },
};
</script>

<style scoped lang="less">
.wrapper{
    background: #fafafa;
    height: 100%;
    .container{
        border-bottom: 1px solid #EBEBEB;
        background: #fff;
        .player-item{
            width: 335px;
            height: 57px;
            margin: 0 auto;
            border-bottom: 1px solid #EBEBEB;
            display: flex;
            align-items: center;
            .name{
                font-size:16px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(38,38,38,1);
            }
            .img-box{
                width:38px;
                height:38px;
                background:rgba(120,174,243,1);
                border-radius: 50%;
                overflow: hidden;
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
                text-align: center;
                line-height: 38px;
                margin-right: 15px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .player-item:last-child{
            border: none;
        }
    }
    
}
</style>
