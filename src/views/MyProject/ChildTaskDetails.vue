<template>
    <div class="taskDetails">
        <div class="head">
            <van-checkbox v-model="checked" shape="square"></van-checkbox>
            <span>需求整理</span>
        </div>

        <TaskInfo />
        
    </div>
</template>

<script>
import TaskInfo from "@/components/TaskInfo";
export default {
    props: {

    },
    components: {
        TaskInfo
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

    },
    created() {

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
