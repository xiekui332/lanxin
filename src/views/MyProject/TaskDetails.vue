<template>
    <div class="taskDetails">
        <div class="head">
            <van-checkbox v-model="checked" :disabled="isDisabled" shape="square" @change='changeProState(checked)'></van-checkbox>
            <span>{{task.name}}</span>
        </div>

        <TaskInfo :task='task' :tFileList='tFileList' :userList='userList' :countName='countName' :isChild='isChild' :sonTask='sonTask' />
        
    </div>
</template>

<script>
import TaskInfo from "@/components/TaskInfo";
import { getProDetail } from '@/service/api'
// import { tFileList } from '@/service/test'
export default {
    props: {

    },
    components: {
        TaskInfo
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
            sonTask:[]
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        init() {
            let params = {
                id: this.$route.query.id
            }
            getProDetail(params).then((res) => {
                // console.log(res)
                this.task = res.task
                // this.tFileList = tFileList
                this.tFileList = res.tFileList
                this.userList = res.task.userList
                this.countName = res.countName
                this.sonTask = res.sonTask
                if(res.sonTask && res.sonTask.length) {
                    this.isChild = true
                }else{
                    this.isChild = false
                }

                for(let i = 0; i < this.sonTask.length; i ++){
                    if(this.sonTask[i].state == 0) {
                        this.isDisabled = true
                    }else{
                        this.isDisabled = false
                    }
                }

                if(res.state == 0) {
                    this.checked = false
                    this.isDisabled = false
                }else if(res.state == 1) {
                    this.checked = true
                    this.isDisabled = true
                }
            })
            .catch((err) => {
                this.$toast('请求失败');
            })
        },

        changeProState(val) {
            if(val == true) {
                
            }
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

    
}
</style>
