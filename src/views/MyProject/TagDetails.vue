<template>
    <div class="wrapper">
        <div class="level" :style="{'background':item.bq_color}" v-for="(item) in tagList" :key="item.id">{{item.name}}</div>
    </div>
</template>

<script>
import { getProDetail } from '@/service/api'
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            tagList:[]
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
                if(res.tFileList && res.tFileList[2] && res.tFileList[2].lableList && res.tFileList[2].lableList.length) {
                    this.tagList =  res.tFileList[2].lableList
                }else{
                    this.$toast('暂无数据');
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
.wrapper{
    width:335px;
    margin: 23px auto 0;
    .level{
        width:335px;
        height:36px;
        border-radius:5px;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: left;
        margin-bottom: 14px;
        line-height: 36px;
        text-indent: 1em;
    }
    .level1{
        background:rgba(195,242,130,1);
    }
    .level2{
        background:rgba(250,205,138,1);
    }
    .level3{
        background:rgba(237,75,78,1);
    }
}

</style>
