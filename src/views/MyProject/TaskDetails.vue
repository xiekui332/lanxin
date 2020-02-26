<template>
    <div class="taskDetails">
        <div class="head">
            <van-checkbox v-model="checked" :disabled="isDisabled" shape="square" @click='changeProState(checked)'></van-checkbox>
            <span>{{task.name}}</span>
        </div>

        
        <div class="template">
            <div class="container">
                <div class="content">
                    <div class="list" @click="toChargeDetails()">
                        <div class="list-left">
                            <img src="../../assets/leading.png" alt="">
                            <span>负责人</span>
                        </div>
                        <div class="list-right">
                            <van-icon name="arrow" size=".4rem" color="#DCDCDC" />
                            <div class="name" v-for="(item) in user" :key="item.id">
                                <img v-if="item.user_img" :src="item.user_img" alt="">
                                <span v-else>{{item.username?item.username.substring(0, 1):'无'}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="list">
                        <div class="list-left">
                            <img src="../../assets/starttime.png" alt="">
                            <span>开始时间</span>
                        </div>
                        <div class="list-right">
                            <span>{{task.startTime}}</span>
                        </div>
                    </div>

                    <div class="list">
                        <div class="list-left">
                            <img src="../../assets/endtime.png" alt="">
                            <span>截止时间</span>
                        </div>
                        <div class="list-right">
                            <span>{{task.endTime}}</span>
                        </div>
                    </div>

                    <div class="list" @click="toTagDetails()">
                        <div class="list-left">
                            <img src="../../assets/tips.png" alt="">
                            <span>标签</span>
                        </div>
                        <div class="list-right">
                            <van-icon name="arrow" size=".4rem" color="#DCDCDC" />
                            <div class="pentagon" :style="{'background':item.bq_color}" v-for="(item) in newTFileList" :key="item.id">{{item.name}}</div>
                        </div>
                    </div>
                    
                    <div class="list" @click="toPlayerDetails()">
                        <div class="list-left">
                            <img src="../../assets/player.png" alt="">
                            <span>参与人</span>
                        </div>
                        <div class="list-right">
                            <van-icon name="arrow" size=".4rem" color="#DCDCDC" />
                            <div class="name" v-show="morePlayer"><img src="../../assets/more.png" alt=""></div>
                            <div class="name" v-for="(item) in userList" :key="item.id">
                                <img v-if="item.user_img" :src="item.user_img" alt="">
                                <span v-else>{{item.username?item.username.substring(0, 1):'无'}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="list">
                        <div class="list-left">
                            <img src="../../assets/plate.png" alt="">
                            <span>所属板块</span>
                        </div>
                        <div class="list-right">
                            <span class="newCountName">{{countName}}</span>
                        </div>
                    </div>

                    <div class="list list-last">
                        <div class="list-left">
                            <img class="list-last-img" src="../../assets/goal.png" alt="">
                            <div class="other">
                                <span>任务目标</span>
                                <span>{{goalObj.content?goalObj.content:'暂无'}}</span>
                            </div>
                            
                        </div>
                        <div class="list-right">
                            <span></span>
                        </div>
                    </div>  

                    <div class="child-list" v-show="isChild">
                        <div class="list-left">
                            <img class="list-last-img" src="../../assets/child.png" alt="">
                        </div>
                        <div class="list-right">
                            <div class="other">
                                <span class="name">子任务</span>
                                <div class="child-item" v-for="(item, index) in sonTask" :key="item.id">
                                    <div class="item-left">
                                        <van-checkbox v-model="item.checked" shape="square" @click="changeChildTask(item, index, item.checked)"></van-checkbox>
                                        <span class="item-txt" @click="toChildTaskDetail(item)">{{item.name}}</span>
                                    </div>
                                    <div class="item-right">
                                        <van-icon name="arrow" size=".5rem" color="#DCDCDC"  @click="toChildTaskDetail(item)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <div class="list list-last">
                        <div class="list-left">
                            <img class="list-last-img" src="../../assets/mark.png" alt="">
                            <div class="other">
                                <span>备注</span>
                                <span>{{remarkObj.content?remarkObj.content:'暂无'}}</span>
                            </div>
                            
                        </div>
                        <div class="list-right">
                            <span></span>
                        </div>
                    </div> 

                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { getProDetail, searchProDetail, changeDone } from '@/service/api'
import { timestampToTime } from '@/service/utils'
// import { tFileList } from '@/service/test'
export default {
    props: {

    },
    components: {
        
    },
    data() {
        return {
            checked:false,
            isDisabled:false,
            task:{},
            tFileList:[],
            userList:[],
            countName:'',
            isChild:false,
            sonTask:[],
            pid:'',
            eid:'',
            stateChange:'',
            isCan:false,
            morePlayer:false,
            count:0,
            user:[],
            isTag:false,
            newTFileList:[],
            goalObj:{},
            remarkObj:{},
        };
    },
    computed: {

    },
    watch: {
        '$route'(to, from) {
            this.init()
        }
    },
    methods: {
        init() {
            let params = {
                id: this.$route.query.id
            }
            getProDetail(params).then((res) => {
                this.task = res.task
                this.tFileList = res.tFileList
                this.userList = res.task.userList   // 参与人信息
                this.countName = res.countName      // 板块
                this.sonTask = res.sonTask          // 子任务
                this.pid = res.task.pid  
                this.task.startTime = timestampToTime(this.task.startTime, 2)
                this.task.endTime = timestampToTime(this.task.endTime, 2)

                // 负责人
                if(!this.task.user.length) {
                    let arr = []
                    let o = {}
                    for(let i in this.task.user) {
                        o[i] = this.task.user[i]
                    }

                    arr.push(o)
                    this.user = arr
                }else{
                    this.user = this.task.user
                }

                // 参与人
                if(this.userList.length > 5) {
                    this.morePlayer = true
                    this.morePlayer = this.morePlayer.slice(0, 5)
                }

                // 标签
                for(let i = 0; i < this.tFileList.length; i ++) {
                    if(this.tFileList[i].name == '标签') {
                        this.newTFileList = this.tFileList[i].lableList
                        if(this.newTFileList.length > 3) {
                            this.isTag = true
                        }else{
                            this.isTag = false
                        }
                        this.newTFileList = this.newTFileList.slice(0, 3)
                    }

                    if(this.tFileList[i].name == '任务目标') {
                        this.goalObj = this.tFileList[i].taskAndFieldList[0]
                    }

                    if(this.tFileList[i].name == '备注') {
                        this.remarkObj = this.tFileList[i].taskAndFieldList[0]
                    }
                }


                
                this.initProState()

                if(this.task.state == 0) {
                    this.checked = false
                }else if(this.task.state == 1) {
                    this.checked = true
                }


                if(res.sonTask && res.sonTask.length) {
                    this.isChild = true
                    for(let i = 0; i < this.sonTask.length; i ++){
                        if(this.sonTask[i].state == 0) {
                            this.sonTask[i].checked = false
                        }else if(this.sonTask[i].state == 1) {
                            this.sonTask[i].checked = true
                        }
                    }

                }else{
                    this.isChild = false
                }

                

            })
            .catch((err) => {
                this.$toast('请求失败');
            })

        },

        // 勾选任务状态
        changeProState(val) {

            if(this.isDisabled) {
                this.$toast('当前任务不可修改');
            }else{
                if(val == true) {
                    this.stateChange = 0
                }else{
                    this.stateChange = 1
                }
                
                let params = {
                    taskId:this.$route.query.id,
                    stateChange:this.stateChange,
                    eid: this.$route.query.eid
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
            }
            
        },

        // 查询当前任务是否可以修改
        initProState() {
            let params = {
                id: this.$route.query.id,
                parentId:this.pid
            }
            searchProDetail(params).then((res) => {
                // res = false
                if(res) {
                    this.isCan = true
                    this.isDisabled = false

                }else {
                    this.isCan = false
                    this.isDisabled = true
                }
            })
            .catch((err) => {
                this.$toast('请求失败');
            })
        },

        toChargeDetails() {
            this.$router.push({
                path:'/chargeDetail',
                query: {
                    id: this.$route.query.id
                }
            })
        },

        toTagDetails() {
            this.$router.push({
                path:'/tagDetail',
                query: {
                    id: this.$route.query.id
                }
            })
        },

        toPlayerDetails() {
            this.$router.push({
                path:'/playerDetail',
                query: {
                    id: this.$route.query.id
                }
            })
        },

        toChildTaskDetail(item) {
            this.$router.push({
                path:'/childTaskDetail',
                query: {
                    id: item.id,
                    eid: this.$route.query.eid
                }
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
                        eid: this.$route.query.eid
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
        this.init()
        
    },
    mounted() {

    },
};
</script>

<style scoped lang="less">
.taskDetails{
    height: 100%;
    background:rgba(250,250,250,1);
    .head{
        display: flex;
        align-items: center;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(235,235,235,1);
        margin-bottom: 10px;
        .van-checkbox{
            background:rgba(255,255,255,1);
            border-radius:2px;
            border:1px solid rgba(230,230,230,1);
            margin: 0 10px 0px 19px;
            transform: scale(.8);
        }
        >span{
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(38,38,38,1);
        }
    }

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
                            >span{
                                display: inline-block;
                                text-align: center;
                                line-height: 24px;
                            }
                        }
                        >span{
                            font-size:14px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(153,153,153,1);
                        }  
                        .newCountName{
                            display: inline-block;
                            width: 230px;
                            text-align: right;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
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
                                        width: 230px;
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
}
</style>
