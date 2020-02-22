<template>
    <div class="template">
        <div class="container">
            <div class="content">
                <div class="list" @click="toChargeDetails()">
                    <div class="list-left">
                        <img src="../assets/leading.png" alt="">
                        <span>负责人</span>
                    </div>
                    <div class="list-right">
                        <van-icon name="arrow" size=".4rem" color="#DCDCDC" />
                        <div class="name">谢</div>
                        <div class="name">谢</div>
                        <div class="name">谢</div>
                    </div>
                </div>

                <div class="list">
                    <div class="list-left">
                        <img src="../assets/starttime.png" alt="">
                        <span>开始时间</span>
                    </div>
                    <div class="list-right">
                        <span>2020/02/18 10:00</span>
                    </div>
                </div>

                <div class="list">
                    <div class="list-left">
                        <img src="../assets/endtime.png" alt="">
                        <span>截止时间</span>
                    </div>
                    <div class="list-right">
                        <span>2020/02/19 10:00</span>
                    </div>
                </div>

                <div class="list" @click="toTagDetails()">
                    <div class="list-left">
                        <img src="../assets/tips.png" alt="">
                        <span>标签</span>
                    </div>
                    <div class="list-right">
                        <van-icon name="arrow" size=".4rem" color="#DCDCDC" />
                        <div class="pentagon normal">普通</div>
                        <div class="pentagon sort">一般</div>
                    </div>
                </div>
                
                <div class="list" @click="toPlayerDetails()">
                    <div class="list-left">
                        <img src="../assets/player.png" alt="">
                        <span>参与人</span>
                    </div>
                    <div class="list-right">
                        <van-icon name="arrow" size=".4rem" color="#DCDCDC" />
                        <div class="name"><img src="../assets/more.png" alt=""></div>
                        <div class="name">谢</div>
                        <div class="name">谢</div>
                        <div class="name">谢</div>
                    </div>
                </div>

                <div class="list">
                    <div class="list-left">
                        <img src="../assets/plate.png" alt="">
                        <span>所属板块</span>
                    </div>
                    <div class="list-right">
                        <span>需求收集</span>
                    </div>
                </div>

                <div class="list list-last">
                    <div class="list-left">
                        <img class="list-last-img" src="../assets/goal.png" alt="">
                        <div class="other">
                            <span>任务目标</span>
                            <span>完成对需求的收集，初步分析和整理。</span>
                        </div>
                        
                    </div>
                    <div class="list-right">
                        <span></span>
                    </div>
                </div>  

                <div class="child-list">
                    <div class="list-left">
                        <img class="list-last-img" src="../assets/child.png" alt="">
                    </div>
                    <div class="list-right">
                        <div class="other">
                            <span class="name">子任务</span>
                            <div class="child-item">
                                <div class="item-left">
                                    <van-checkbox v-model="checked" shape="square"></van-checkbox>
                                    <span class="item-txt" @click="toChildTaskDetail()">汇总收集的需求</span>
                                </div>
                                <div class="item-right">
                                    <van-icon name="arrow" size=".5rem" color="#DCDCDC" />
                                </div>
                            </div>

                            <div class="child-item">
                                <div class="item-left">
                                    <van-checkbox v-model="checked" shape="square"></van-checkbox>
                                    <span class="item-txt">汇总收集的需求</span>
                                </div>
                                <div class="item-right">
                                    <van-icon name="arrow" size=".5rem" color="#DCDCDC" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  

                <div class="list list-last">
                    <div class="list-left">
                        <img class="list-last-img" src="../assets/mark.png" alt="">
                        <div class="other">
                            <span>备注</span>
                            <span>如果在目标期限没有完成可适当延长需求收集时间</span>
                        </div>
                        
                    </div>
                    <div class="list-right">
                        <span></span>
                    </div>
                </div> 

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
            checked:false
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        toChildTaskDetail() {
            this.$router.push({
                path:'/childTaskDetail'
            })
        },
        toTagDetails() {
            this.$router.push({
                path:'/tagDetail'
            })
        },
        toPlayerDetails() {
            this.$router.push({
                path:'/playerDetail'
            })
        },
        toChargeDetails() {
            this.$router.push({
                path:'/chargeDetail'
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
.template{
    .container{
        background:rgba(255,255,255,1);
        border:1px solid rgba(235,235,235,1);
        .content{
            width: 335px;
            margin: 0 auto;
            .list{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 50px;
                border-bottom: 1px solid #EBEBEB;
                .list-left{
                    display: flex;
                    align-items: center;
                    >img{
                        width:19px;
                        height: 20px;
                        margin-right: 10px;
                    }
                    >span{
                        font-size:16px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(38,38,38,1);
                    }
                    
                }
                .list-right{
                    display: flex;
                    align-items: center;
                    flex-direction: row-reverse;
                    >div.name{
                        width: 24px;
                        height: 24px;
                        background:rgba(120,174,243,1);
                        border-radius: 50%;
                        overflow: hidden;
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        line-height: 24px;
                        margin-right: 5px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    >span{
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }        
                    .pentagon{
                        width:50px;
                        height:23px;
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        
                        line-height: 23px;
                        text-align: center;
                        border-radius: 4px;
                        margin-right: 5px;
                    }  
                    .normal{
                        background: #C3F282;
                    }   
                    .sort{
                        background: #FACD8A;
                    }         
                }
            }
            .list:last-child{
                border: none;
            }
            .list-last{ 
                padding: 10px 0;
                height: auto;
                .list-left{
                    align-items:flex-start; 
                } 
                .other{
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    
                    span:nth-child(1){
                        font-size:16px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(38,38,38,1);
                    }
                    span:nth-child(2){
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        margin-top: 5px;
                    }
                    .child-list{
                        width:307px;
                        height:50px;
                        background:rgba(245,245,245,1);
                        border-radius:5px;
                    }
                }
            }
            .child-list{
                display: flex;
                align-items: flex-start;
                padding: 10px 0;
                border-bottom: 1px solid #EBEBEB;
                .list-left{
                    .list-last-img{
                        width: 18px;
                        height: 18px;
                    }
                }
                .list-right{
                    margin-left: 10px;
                    .other{
                        display: flex;
                        flex-direction: column;
                        .name{
                            font-size:16px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(38,38,38,1);
                            text-align: left;
                            margin-bottom: 20px;
                        }
                        .child-item{
                            width:307px;
                            height:50px;
                            background:rgba(245,245,245,1);
                            border-radius:5px;
                            margin-bottom: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between; 
                            .item-left{
                                display: flex;
                                align-items: center;
                                .van-checkbox{
                                    background:rgba(255,255,255,1);
                                    border-radius:2px;
                                    border:1px solid rgba(230,230,230,1);
                                    margin: 0 10px 0 10px;
                                    transform: scale(.8);
                                }
                                .item-txt{
                                    width: 200px;
                                    font-size:15px;
                                    line-height: 50px;
                                    text-align: left;
                                    font-family:PingFangSC-Regular,PingFang SC;
                                    font-weight:400;
                                    color:rgba(38,38,38,1);
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                            .item-right{
                                margin-right: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
