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
                        <p class="p-title" @click="toProDetail(item.id)">{{item.name}}</p>
                        <div class="p-item">
                            <span>{{item.project}}</span>
                            <span>{{item.board}}</span>
                            <span>{{item.endTime}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { recentList, recentDoneList, getPersonalInfo, getMyEid } from '@/service/api'
import { timestampToTime, getCaptionLine, getCaptionPoint } from '@/service/utils'
import BScroll from 'better-scroll'
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            todoNum:0,
            doneNum:0,
            data:[],
            active:true,
            eid:'',       // 临时测试
            uid:'',
            page:1,
            size:10,
            hasNextPage:false
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        chooseLine(type) {
            this.page = 1
            this.data = []
            if(type === 1) {
                this.active = true
                this.init()
            }else{
                this.active = false
                this.getDoneList()
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
                if(this.hasNextPage) {
                    this.page ++
                    if(this.active) {
                        this.init('up')
                    }else{
                        this.getDoneList('up')
                    }
                    
                }

            })

            //下拉
            this.scroll.on('pullingDown',()=>{
                console.log('down')
            })

        },

        init(type) {

            // 获取eid
            getPersonalInfo().then((res) => {
                this.uid = res.id
                let params = {
                    uid:this.uid
                }

                getMyEid(params).then((res) => {
                    if(res && res.length) {
                        this.eid = res[0].id
                    }

                    let params = {
                        eid: this.eid,
                        page: this.page,
                        size: this.size
                    }

                    this.$toast.loading({
                        message: '加载中...',
                        forbidClick: true
                    });

                    this.getDoneList('first')

                    recentList(params).then((res) => {
                        // console.log(res)
                        this.hasNextPage = res.hasNextPage
                        if(res.list.length) {
                            for(let i = 0; i < res.list.length; i ++) {
                                res.list[i].name = res.list[i].name?res.list[i].name:'暂无'
                                res.list[i].endTime = res.list[i].endTime?timestampToTime(res.list[i].endTime):'暂无'
                                res.list[i].project = res.list[i].map.countName?getCaptionLine(res.list[i].map.countName, 0):'暂无'
                                res.list[i].board = res.list[i].map.countName?getCaptionPoint(res.list[i].map.countName, 1):'暂无'
                            }
                        }

                        if(type && type == 'up') {
                            this.data = this.data.concat(res.list)
                        }else{
                            this.data = res.list
                        }

                        this.todoNum = res.total
                        this.scroll.finishPullUp()
                        this.scroll.refresh()
                        this.$toast.clear()
                    })
                    .catch((err) => {
                        this.$toast('请求失败');
                    })

                })
                .catch((err) => {
                    this.$toast('请求失败');
                })

            })
            .catch((err) => {
                this.$toast('请求失败');
            })

            

        },

        getDoneList(type) {
            let params = {
                eid: this.eid,
                isDone:true,
                sort:'accomplished',
                page: this.page,
                size: this.size
            }

            if(type && type == 'first') {
                recentDoneList(params).then((res) => {
                    this.doneNum = res.total
                })
                .catch((err) => {
                    this.$toast('请求失败');
                })
                
            }else{
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true
                });

                recentDoneList(params).then((res) => {
                    
                    this.hasNextPage = res.hasNextPage
                    if(res.list.length) {
                        for(let i = 0; i < res.list.length; i ++) {
                            res.list[i].name = res.list[i].name?res.list[i].name:'暂无'
                            res.list[i].endTime = res.list[i].endTime?timestampToTime(res.list[i].endTime):'暂无'
                            res.list[i].project = res.list[i].map.countName?getCaptionLine(res.list[i].map.countName, 0):'暂无'
                            res.list[i].board = res.list[i].map.countName?getCaptionPoint(res.list[i].map.countName, 1):'暂无'
                        }
                    }

                    if(type && type == 'up') {
                        this.data = this.data.concat(res.list)
                    }
                    else{
                        this.data = res.list
                    }

                    this.doneNum = res.total
                    this.scroll.finishPullUp()
                    this.scroll.refresh()
                    this.$toast.clear()
                })
                .catch((err) => {
                    this.$toast('请求失败');
                })
            }

            
        },

        toProDetail(id) {
            this.$router.push({
                path:'/taskDetail',
                query: {
                    id: id,
                    eid: this.eid
                }
            })
        }
    },
    created() {
        this.init()
        
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
                width: 280px;
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
                    flex: 1;
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                span:nth-child(1){
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                span:nth-child(2){
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                span:nth-child(3){
                    text-align: right;
                }
            }
        }
    }
}
</style>
