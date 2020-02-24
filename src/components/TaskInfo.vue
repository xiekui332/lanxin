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
                        <div class="name" v-for="(item) in user" :key="item.id">
                            <img v-if="item.user_img" :src="item.user_img" alt="">
                            <span v-else>{{item.username?item.username.substring(0, 1):'无'}}</span>
                        </div>
                    </div>
                </div>

                <div class="list">
                    <div class="list-left">
                        <img src="../assets/starttime.png" alt="">
                        <span>开始时间</span>
                    </div>
                    <div class="list-right">
                        <span>{{newTask.startTime}}</span>
                    </div>
                </div>

                <div class="list">
                    <div class="list-left">
                        <img src="../assets/endtime.png" alt="">
                        <span>截止时间</span>
                    </div>
                    <div class="list-right">
                        <span>{{newTask.endTime}}</span>
                    </div>
                </div>

                <div class="list" @click="toTagDetails()">
                    <div class="list-left">
                        <img src="../assets/tips.png" alt="">
                        <span>标签</span>
                    </div>
                    <div class="list-right">
                        <van-icon name="arrow" size=".4rem" color="#DCDCDC" />
                        <div class="pentagon" :style="{'background':item.bq_color}" v-for="(item) in newTFileList" :key="item.id">{{item.name}}</div>
                    </div>
                </div>
                
                <div class="list" @click="toPlayerDetails()">
                    <div class="list-left">
                        <img src="../assets/player.png" alt="">
                        <span>参与人</span>
                    </div>
                    <div class="list-right">
                        <van-icon name="arrow" size=".4rem" color="#DCDCDC" />
                        <div class="name" v-show="morePlayer"><img src="../assets/more.png" alt=""></div>
                        <div class="name" v-for="(item) in newUserList" :key="item.id">
                            <img v-if="item.user_img" :src="item.user_img" alt="">
                            <span v-else>{{item.username?item.username.substring(0, 1):'无'}}</span>
                        </div>
                    </div>
                </div>

                <div class="list">
                    <div class="list-left">
                        <img src="../assets/plate.png" alt="">
                        <span>所属板块</span>
                    </div>
                    <div class="list-right">
                        <span class="newCountName">{{newCountName}}</span>
                    </div>
                </div>

                <div class="list list-last">
                    <div class="list-left">
                        <img class="list-last-img" src="../assets/goal.png" alt="">
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
                        <img class="list-last-img" src="../assets/child.png" alt="">
                    </div>
                    <div class="list-right">
                        <div class="other">
                            <span class="name">子任务</span>
                            <div class="child-item" v-for="(item, index) in newSonTask" :key="item.id">
                                <div class="item-left">
                                    <van-checkbox v-model="item.checked" :disabled="item.checked" shape="square"></van-checkbox>
                                    <span class="item-txt" @click="toChildTaskDetail()">{{item.name}}</span>
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
</template>

<script>
import { timestampToTime } from "@/service/utils"
export default {
    props: [
        'task',
        'tFileList',
        'userList',
        'countName',
        'isChild',
        'sonTask'
    ],
    components: {

    },
    data() {
        return {
            checked:false,
            newTask:{},
            newTFileList:[],
            isTag:false,
            user:[],
            newUserList:[],
            morePlayer:false,
            newCountName:'',
            goalObj:{},
            remarkObj:{},
            newSonTask:[]
        };
    },
    computed: {

    },
    watch: {
        task(params) {
            params.startTime = timestampToTime(params.startTime, 2)
            params.endTime = timestampToTime(params.endTime, 2)
            this.newTask = params
            this.user.push(params.user)
        },

        tFileList(params) {
            if(params && params[2] && params[2].lableList) {
                this.newTFileList = params[2].lableList
                if(this.newTFileList.length > 3) {
                    this.isTag = true
                }else{
                    this.isTag = false
                }
                this.newTFileList = this.newTFileList.slice(0, 3)
            }

            if(params && params[3]) {
                this.goalObj = params[3]
            }

            if(params && params[0]) {
                this.remarkObj = params[0]
            }
            
        },
        userList(params) {
            if(params) {
                if(this.newUserList.length > 5) {
                    this.morePlayer = true
                    this.morePlayer = this.morePlayer.slice(0, 5)
                }else{
                    this.newUserList = params
                }
            }
        },

        countName(params) {
            this.newCountName = params
        },

        sonTask(params) {
            for(let i = 0; i < params.length; i ++) {
                if(params[i].state == 0) {
                    params[i].checked = false
                }else if(params[i].state == 1) {
                    params[i].checked = true
                }
            }
            this.newSonTask = params
        }
    },
    methods: {
        toChildTaskDetail() {
            this.$router.push({
                path:'/childTaskDetail',
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
        toChargeDetails() {
            this.$router.push({
                path:'/chargeDetail',
                query: {
                    id: this.$route.query.id
                }
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

</style>
