<template>
    <div class="board">
        <van-tabs v-model="active" color="#4377BC" line-width="50%" line-height="2px" title-active-color="#4377BC" title-inactive-color="#262626">
            <van-tab title="看板" title-style="font-size:16px;">
                <van-swipe :loop="false" :width="320">
                    <van-swipe-item>
                        <p class="board-title">需求收集</p>
                        <div class="board-list-wrapper">
                            <div class="board-list">
                                <van-checkbox v-model="checked" shape="square" disabled></van-checkbox>
                                <span @click="toTaskDetails()">汇总收集的需求</span>
                            </div>
                            <div class="board-list">
                                <van-checkbox v-model="checked" shape="square" ></van-checkbox>
                                <span @click="toTaskDetails()">汇总收集的需求</span>
                            </div>
                        </div>
                    </van-swipe-item>
                    <van-swipe-item>2</van-swipe-item>
                    <van-swipe-item>3</van-swipe-item>
                </van-swipe>
            </van-tab>
            <van-tab title="文档" title-style="font-size:16px;">
                <div class="head-tab">
                    <div :class="[selected?'tab-btn active':'tab-btn']" @click="chooseLine(1)">所有的</div>
                    <div :class="[selected?'tab-btn':'tab-btn active']" @click="chooseLine(2)">我创建的</div>
                </div>

                <div class="word-wrapper">
                    <div class="word-item" v-for="(item, index) in 4" :key="index">
                        <div class="item-left">
                            <img class="word-icon" src="../../assets/word.png" alt="">
                            <span>需求汇总记录.doc</span>
                        </div>
                        <img class="down-icon" src="../../assets/down.png" alt="">
                    </div>

                    <div class="word-item">
                        <div class="item-left">
                            <img class="word-icon" src="../../assets/mind.png" alt="">
                            <span>思维导图.xmind</span>
                        </div>
                        <img class="down-icon" src="../../assets/down.png" alt="">
                    </div>
                </div>
            </van-tab>
        </van-tabs>
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
            active:'',
            checked:false,
            selected:true
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        toTaskDetails() {
            this.$router.push({
                path:'/taskDetail'
            })
        },
        chooseLine(type) {
            if(type === 1) {
                this.selected = true
            }else{
                this.selected = false
            }
        }
    },
    created() {

    },
    mounted() {

    },
};
</script>

<style scoped lang="less">
.board{
    height: 100%;
    & /deep/ .van-tab{
        border-bottom: 1px solid #eeeeee;
    }
    
    .head-tab{
        width: 182px;
        height: 32px;
        border-radius: 16px;
        margin: 20px auto;
        border: 1px solid #4361B7;
        display: flex;
        overflow: hidden;
        .tab-btn{
            flex: 1;
            height: 100%;
            font-size:14px;
            font-family:PingFangSC-Semibold,PingFang SC;
            text-align: center;
            line-height: 32px;
            font-weight:500;
            color:rgba(51,51,51,1);
        }
        .active{
            background: #4560b7;
            font-weight:600;
            color:rgba(255,255,255,1);
        }
    }

    .word-wrapper{
        width: 335px;
        margin: 0 auto;
        .word-item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #EBEBEB;
            padding: 15px 0;
            .item-left{
                display: flex;
                align-items: center;
                .word-icon{
                    width: 25px;
                    height: 25px;
                    margin-right: 10px;
                }
                >span{
                    width: 270px;
                    font-size:16px;
                    text-align: left;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(38,38,38,1);
                }
            }
            
            .down-icon{
                width: 13px;
                height: 15px;
                margin-right: 5px;  
            }
        }
        
    }
}

.van-swipe{
    margin-top: 20px;
    & /deep/ .van-swipe__track{
        display: flex;
    }
    & /deep/ .van-swipe__indicators{
        position: fixed;
        bottom: 70px;
    }
    & /deep/ .van-swipe__indicator{
        width:10px;
        height:10px;
        background:rgba(255,255,255,1);
        border:1px solid #999; 
        margin-right: 13px;  
    }
    & /deep/ .van-swipe__indicator--active{
        background:rgba(210,210,210,1);
        border: 1px solid rgba(210,210,210,1);
    }
}
.van-swipe-item{
    background:rgba(243,245,249,1);
    border-radius:5px;
    border:1px solid rgba(246,246,246,1);
    box-sizing: border-box;
    margin-left: 10px;
    .board-title{
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(38,38,38,1);
        text-align: left;
        margin: 11px 0 12px 15px;
    }
    .board-list-wrapper{
        width: 290px;
        margin: 0 auto;
        .board-list{
            height: 60px;
            background:rgba(255,255,255,1);
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            >span{
                font-size:15px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(38,38,38,1);
                line-height: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .van-checkbox{
                background:rgba(255,255,255,1);
                border-radius:2px;
                border:1px solid rgba(230,230,230,1);
                margin: 0 10px 0 19px;
                transform: scale(.8);
            }
        }
    }
}
</style>
