<template>
    <div class="board">
        <van-tabs v-model="active" color="#4377BC" line-width="50%" line-height="2px" title-active-color="#4377BC" title-inactive-color="#262626">
            <van-tab title="看板" title-style="font-size:16px;">
                <van-swipe :loop="false" :width="320">
                    <van-swipe-item v-for="(item, index) in boardList" :key="item.id">
                        <p class="board-title">{{item.name}}</p>
                        <div class="board-list-wrapper">
                            <div class="board-list" v-for="(item, index) in item.tasksList" :key="item.id">
                                <van-checkbox v-model="item.checked" shape="square" @click="changeChildTask(item, index, item.checked)"></van-checkbox>
                                <span @click="toTaskDetails(item)">{{item.name}}</span>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </van-tab>

            <van-tab title="文档" title-style="font-size:16px;">
                <div class="head-tab">
                    <div :class="[selected?'tab-btn active':'tab-btn']" @click="chooseLine(1)">所有的</div>
                    <div :class="[selected?'tab-btn':'tab-btn active']" @click="chooseLine(2)">我创建的</div>
                </div>

                <div class="word-wrapper">
                    <div class="word-item" v-for="(item, index) in fileList" :key="index">
                        <div class="item-left">
                            <img class="word-icon" src="../../assets/word.png" alt="">
                            <span @click="getDownload(item)">{{item.name}}</span>
                        </div>
                        <img class="down-icon" @click="getDownload(item)" src="../../assets/down.png" alt="">
                    </div>

                    <!-- <div class="word-item">
                        <div class="item-left">
                            <img class="word-icon" src="../../assets/mind.png" alt="">
                            <span>思维导图.xmind</span>
                        </div>
                        <img class="down-icon" src="../../assets/down.png" alt="">
                    </div> -->
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { getFiles, getBoardList, getTaskGroupId, getUserRole, searchProDetail, changeDone } from '@/service/api'
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            active:'',
            checked:false,
            selected:true,
            eid:this.$route.query.eid,
            id:this.$route.query.id,    // 项目id
            status:1,
            fileList:[],
            boardList:[],
            stateChange:'',
            tid:'',
            roleId:''
        };
    },
    computed: {

    },
    watch: {
        
    },
    methods: {
        toTaskDetails(item) {
            this.$router.push({
                path:'/taskDetail',
                query: {
                    id: item.id,
                    eid: this.eid
                }
            })
        },
        chooseLine(type) {
            this.fileList = []
            if(type === 1) {
                this.selected = true
                this.status = 1
                this.init()
            }else{
                this.selected = false
                this.status = ''
                let params = {
                    eid:this.eid
                }
                this.init(params)
            }
            
        },
        init(obj) {
            let params = {}
            if(obj) {
                params = obj
            }else{
                params = {
                    eid:this.eid,
                    status:this.status
                }
            }
            getFiles(params).then((res) => {
                if(res && res.length) {
                    this.fileList = res
                }
            })
            .catch((err) => {
                this.$toast('请求失败');
            })

        },

        getDownload(item) {
            // test
            // item.path = "http://timesheet.pactera.com/Log/Unlockapplicationform.xlsx"

            let a= document.createElement('a');
            a.href = item.path
            a.download = item.name
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },

        initBoardList() {
            // 查询任务分组id
            let params = {
                projectId: this.id
            }

            getTaskGroupId(params).then((res) => {
                if(res && res.length) {
                    this.tid = res[0].id
                }else{
                    this.tid = res.id
                }

                let params = {
                    projectId:this.id
                }

                getUserRole(params).then((res) => {
                    if(res) {
                        this.roleId = res.roleId
                    }

                    let params = {
                        tid: this.tid,
                        projectId: this.id,
                        roleId: this.roleId
                    }

                    getBoardList(params).then((res) => {
                        if(res && res.length) {
                            this.boardList = res
                            for(let i = 0; i < this.boardList.length; i ++) {
                                for(let j = 0; j < this.boardList[i].tasksList.length; j ++) {
                                    if(this.boardList[i].tasksList[j].state == 1) {
                                        this.boardList[i].tasksList[j].checked = true
                                    }else if(this.boardList[i].tasksList[j].state == 0) {
                                        this.boardList[i].tasksList[j].checked = false
                                    }
                                }
                            }
                        }else{
                            this.$toast('暂无数据');
                        }
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

        changeChildTask(item, index, checked) {
           
            let params = {
                id: item.id,
                parentId:item.pid
            }

            
            searchProDetail(params).then((res) => {
                // res = false
                if(res) {
                    this.$forceUpdate()
                    if(checked == true) {
                        this.stateChange = 0
                    }else{
                        this.stateChange = 1
                    }

                    let params = {
                        taskId:item.id,
                        stateChange:this.stateChange,
                        eid: this.eid
                    }

                    changeDone(params).then((res) => {
                        if(res) {
                            this.$toast('修改成功');
                            
                        }else{
                            this.$toast('修改失败');
                        }
                        
                    })
                    .catch((err) => {
                        this.$toast('请求失败');
                    })


                }else{
                    this.$toast('当前任务不可更改');
                }
            })
            .catch((err) => {
                this.$toast('请求失败');
            })

            
        }
    },
    created() {
        // 获取文档
        this.init()
        // 获取看板
        this.initBoardList()
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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
