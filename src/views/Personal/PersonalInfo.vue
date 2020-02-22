<template>
    <div class="personal">
        <div class="back">
            <div class="personal-info">
                <span>设计师02</span>
                <div>
                    <img :src="imgDefault" alt="">
                </div>
            </div>
        </div>


        <div class="basic-info">
            <div class="basic-item">
                <div class="basic-left">
                    <img src="../../assets/post.png" alt="">
                    <span>职位</span>
                </div>
                <div class="basic-right">
                    <span>产品经理</span>
                </div>
            </div>
            <div class="basic-item">
                <div class="basic-left">
                    <img src="../../assets/phone.png" alt="">
                    <span>手机号</span>
                </div>
                <div class="basic-right">
                    <span>{{getPhone}}</span>
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
            imgDefault:require('../../assets/default.png'),
            phone:18334794858
        };
    },
    computed: {
        getPhone() {
            let tel = this.phone
            tel = "" + tel;
            let tel1 =tel.replace(tel.substring(3,7), "****")
            return tel1
        }
    },
    watch: {

    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
};
</script>

<style scoped lang="less">
.personal{
    height: 100%;
    background:rgba(250,250,250,1);
    .back{
        height: 120px;
        background: #4361B7;
        border-radius: 0 0 5% 5%;
        position: relative;
        .personal-info{
            width:335px;
            height:125px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 19px 0px rgba(64,106,193,0.1);
            border-radius:5px;
            position: absolute;
            top: 40px;
            left: 50%;
            margin-left: -167.5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            >span{
                font-size:21px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
                margin-left: 23px;
            }
            >div{
                width: 67px;
                height: 67px;
                border-radius:50%;
                overflow: hidden;
                margin-right: 21px;
                img{
                    width: 100%;
                    height: 100%;
                } 
            }
        }
    }

    .basic-info{
        width:335px;
        height:120px;
        background:rgba(255,255,255,1);
        border-radius:5px;
        margin: 70px auto 0;
        .basic-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            border-bottom: 1px solid #F5F5F5;
            .basic-left{
                display: flex;
                align-items: center;
                img{
                    width: 19px;
                    height: 19px;
                    margin: 0 10px 0 19px;
                }
                span{
                    font-size:15px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
            .basic-right{
                span{
                    font-size:15px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    margin-right: 14px;
                    line-height: 60px;
                }
            }
        }
        .basic-item:last-child{
            border: none;
        }
    }
}
</style>
