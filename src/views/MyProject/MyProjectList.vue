<template>
    <div class="my-p">
        <div class="p-search">
            <van-search
            v-model="value"
            placeholder="搜索项目"
            input-align="center"
            />
        </div>


        <div class="wrapper">
            <div class="item" v-for="(item, index) in 4" :key="index">
                <div class="item-left">
                    <div>参</div>
                    <span @click="toBoard()">参考项目</span>
                </div>
                <div class="item-right" @click="getProDetail(item)"><van-icon name="arrow" size=".4rem" color="#DCDCDC" /></div>
            </div>
        </div>
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
            value:''
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        getProDetail(item) {
            this.$router.push({
                path:'/projectDetail'
            })
        },

        toBoard() {
            this.$router.push({
                path:'/board'
            })
        }
    },
    created() {

    },
    mounted() {

    },
};
</script>

<style scoped lang="less">
.my-p{
    height: 100%;
}
.p-search{
    width:335px;
    height:36px;
    background:rgba(243,245,249,1);
    border-radius:30px;
    margin: 11px auto;
    overflow: hidden;
    .van-search{
        padding: 0;
        height: 100%;
        & /deep/ .van-field__control{
            height: 36px;
            font-size: 16px;
        }
        & /deep/ .van-icon{
            height: 36px;
            line-height: 36px;
        }
    }
}

.wrapper{
    width: 335px;
    margin: 0 auto;
    .item{
        height:60px;
        background:rgba(255,255,255,1);
        border-radius:5px;
        border:1px solid rgba(235,235,235,1);
        margin-bottom: 11px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-left{
            display: flex;
            align-items: center;
            >div{
                width: 36px;
                height: 36px;
                background: #4D9BFF;
                margin: 0 9px 0 16px;
                font-size:18px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height: 36px;
            }
            >span{
                font-size:16px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(38,38,38,1);
            }
        }
        .item-right{
            margin-right: 12px;
        }
    }
}
</style>
