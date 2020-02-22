<template>
    <div class="wrapper">
        <div class="container">
            <div class="player-item">
                <div class="img-box">
                    <span>谢</span>
                    <!-- <img src="" alt=""> -->
                </div>
                <p class="name">张三</p>
            </div>
            <div class="player-item">
                <div class="img-box">
                    <span>谢</span>
                    <!-- <img src="" alt=""> -->
                </div>
                <p class="name">张三</p>
            </div>
            <div class="player-item">
                <div class="img-box">
                    <span>谢</span>
                    <!-- <img src="" alt=""> -->
                </div>
                <p class="name">张三</p>
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

        };
    },
    computed: {

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
