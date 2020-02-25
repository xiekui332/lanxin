<template>
    <div class="p-detail">
        <div class="p-name">
            <span>项目名称</span>
            <span>{{name}}</span>
        </div>

        <div class="members-wrapper">
            <p class="member-title">项目成员</p>
            <div class="members">
                <div class="meb-block" v-for="(item, index) in userList" :key="item.id">
                    <div class="member-img">
                        <img v-if="item.user_img" :src="item.user_img" alt="">
                        <span v-else>{{item.username?item.username.substring(0, 1):'无'}}</span>
                    </div>
                    <p class="meb-name">{{item.username}}</p>
                </div>
            </div>
            
        </div>

        <div class="p-name">
            <span>项目名称</span>
            <span v-if="file == 0">没有归档</span>
            <span v-else-if="file == 1">已归档</span>
            <span v-else></span>
        </div>
    </div>
</template>

<script>
import { getProjectDetail } from '@/service/api'
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            file:this.$route.query.file,
            name:this.$route.query.name,
            userList:[]
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        init() {
            let params = {
                eid:this.$route.query.eid,
                pid:this.$route.query.id
            }
            getProjectDetail(params).then((res) => {
                if(res && res.length) {
                    this.userList = res
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
.p-detail{
    height: 100%;
    background:rgba(250,250,250,1);
    .p-name{
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(235,235,235,1);   
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        >span{
            flex: 1;
        }
        >span:nth-child(1){
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(38,38,38,1);
            text-align: left;
            padding-left: 20px;
        }
        >span:nth-child(2){
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            text-align: right;
            padding-right: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .members-wrapper{
        background:rgba(255,255,255,1);
        border:1px solid rgba(235,235,235,1);
        padding: 0 0 0 20px;
        margin-bottom: 10px;
        .member-img{
            width:38px;
            height:38px;
            background:rgba(120,174,243,1);
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
            span{
                text-align: center;
                line-height: 38px;
                color: #ffffff;
                font-size: 20px;
            }
        }
        .member-title{
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(38,38,38,1);
            text-align: left;
            margin: 14px 0 14px 0px;
        }
        .members{
            display: flex;
            flex-wrap:wrap;
            margin-left: -10px;
            .meb-block{
                margin:0 10px 10px;
            }
            .meb-name{
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(153,153,153,1);
            }
        }
    }
}
</style>
