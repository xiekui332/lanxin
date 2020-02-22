<template>
    <div class="recent">
        <div class="head-tab">
            <div :class="[active?'tab-btn active':'tab-btn']" @click="chooseLine(1)">未完成({{todoNum}})</div>
            <div :class="[active?'tab-btn':'tab-btn active']" @click="chooseLine(2)">已完成({{doneNum}})</div>
        </div>


        <div class="wrapper" ref="bscroll">
            <div class="recentData">
                <div class="recentList" v-for="(item) in data" :key="item.id">
                    <span class="p-icon"></span>
                    <div class="p-info">
                        <p class="p-title">{{item.name}}</p>
                        <div class="p-item">
                            <span>{{item.item1}}</span>
                            <span>{{item.item2}}</span>
                            <span>{{item.item3}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            todoNum:4,
            doneNum:6,
            data:[
                {
                    id:1,
                    name:'重点项目工程抽化产品说明书',
                    item1:'蓝信对接',
                    item2:'需求看板',
                    item3:'3月20日'
                },
                {
                    id:2,
                    name:'重点项目工程抽化产品说明书',
                    item1:'蓝信对接',
                    item2:'需求看板',
                    item3:'3月20日'
                },
                {
                    id:3,
                    name:'重点项目工程抽化产品说明书',
                    item1:'蓝信对接',
                    item2:'需求看板',
                    item3:'3月20日'
                },
                {
                    id:4,
                    name:'重点项目工程抽化产品说明书',
                    item1:'蓝信对接',
                    item2:'需求看板',
                    item3:'3月20日'
                },
                {
                    id:5,
                    name:'重点项目工程抽化产品说明书',
                    item1:'蓝信对接',
                    item2:'需求看板',
                    item3:'3月20日'
                },
                {
                    id:6,
                    name:'重点项目工程抽化产品说明书',
                    item1:'蓝信对接',
                    item2:'需求看板',
                    item3:'3月20日'
                },
                {
                    id:7,
                    name:'重点项目工程抽化产品说明书',
                    item1:'蓝信对接',
                    item2:'需求看板',
                    item3:'3月20日'
                },
                {
                    id:8,
                    name:'重点项目工程抽化产品说明书',
                    item1:'蓝信对接',
                    item2:'需求看板',
                    item3:'3月20日'
                }
            ],
            active:true
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        chooseLine(type) {
            if(type === 1) {
                this.active = true
            }else{
                this.active = false
            }
        },
        initScroll() {
            if(!this.$refs.bscroll){
                return ;
            }

            this.scroll = new BScroll(this.$refs.bscroll, {
                click:true,
                scrollbar:true,
                // up
                pullUpLoad: {             
                    threshold: 50
                },
                // down
                pullDownRefresh: {
                    threshold:50,
                    stop:20
                }
            })

            //上拉
            this.scroll.on('pullingUp',()=>{
                console.log('up')
            })

            //下拉
            this.scroll.on('pullingDown',()=>{
                console.log('down')
            })

        }
    },
    created() {

    },
    mounted() {
        this.initScroll()
    },
};
</script>

<style scoped lang="less">
.recent{
    height: 100%;
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

.wrapper{
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 73px;
    bottom: 0;
    & /deep/ .bscroll-vertical-scrollbar{
        width: 5px!important;
    }
}

.recentData{
    width: 335px;
    margin: 0 auto;

    .recentList{
        width: 100%;
        height: 80px;
        display: flex;
        background:rgba(255,255,255,1);
        border-radius:5px;
        border:1px solid rgba(235,235,235,1);
        margin-bottom: 11px;
        .p-icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('../../assets/p-icon.png');
            background-size:cover;
            background-repeat: no-repeat; 
            margin: 16px 0 0 19px;
        }
        .p-info{
            flex: 2;
            padding: 0 10px;
            .p-title{
                font-size:16px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(38,38,38,1);
                margin: 13px 0 12px 0px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .p-item{
                display: flex;
                justify-content: space-between;
                span{
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
            }
        }
    }
}
</style>
