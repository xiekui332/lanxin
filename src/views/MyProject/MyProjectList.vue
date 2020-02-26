<template>
    <div class="my-p">
        <header>
            <div class="p-search">
                <van-search
                v-model="value"
                placeholder="搜索项目"
                input-align="center"
                @search='searchName'
                />
            </div>
        </header>
        


        <div class="wrapper">
            <div class="item" v-for="(item, index) in myProjectList" :key="index">
                <div class="item-left">
                    <div>{{item.name?item.name.substring(0, 1):'无'}}</div>
                    <span @click="toBoard(item)">{{item.name}}</span>
                </div>
                <div class="item-right" @click="getProDetail(item)"><van-icon name="arrow" size=".4rem" color="#DCDCDC" /></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getMyProject, getPersonalInfo, getMyEid, getEidRole } from '@/service/api'
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            value:'',
            uid:'',
            eid:'',
            myProjectList:[],
            state:''
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        getProDetail(item) {
            this.$router.push({
                path:'/projectDetail',
                query: {
                    id:item.id,
                    eid:item.eid,
                    file:item.file,
                    name:item.name
                }
            })
        },

        toBoard(item) {
            this.$router.push({
                path:'/board',
                query: {
                    eid:item.eid,
                    id: item.id
                }
            })
        },

        init() {

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
                        eid:this.eid
                    }

                    getEidRole(params).then((res) => {
                        if(res && res.enterprisePermissionList) {
                            for(let i = 0; i < res.enterprisePermissionList.length; i ++) {
                                if(res.enterprisePermissionList[i].id == 7) {
                                    this.state = res.enterprisePermissionList[i].status
                                }
                            }
                        }
                        let params = {
                            eid:this.eid,
                            name:this.value,
                            state:this.state
                        }
                        getMyProject(params).then((res) => {
                            if(res && res.length) {
                                this.myProjectList = res
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
            })
            .catch((err) => {
                this.$toast('请求失败');
            })

            
        },

        searchName() {
            let params = {
                eid:this.eid,
                name:this.value,
                state:this.state
            }

            getMyProject(params).then((res) => {
                if(res && res.length) {
                    this.myProjectList = res
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
.my-p{
    min-height: 100%;
    padding-bottom: 60px;
    padding-top: 60px;
}
header{
    width: 100%;
    height: 60px;
    background: #ffffff;
    position: fixed;
    top: 0;
    left:0%;
    z-index: 1;
}
.p-search{
    width:335px;
    height:36px;
    background:rgba(243,245,249,1);
    border-radius:30px;
    margin: 11px auto;
    overflow: hidden;
    .van-search{
        padding: 0;
        height: 100%;
        & /deep/ .van-field__control{
            height: 36px;
            font-size: 16px;
        }
        & /deep/ .van-icon{
            height: 36px;
            line-height: 36px;
        }
    }
}

.wrapper{
    width: 335px;
    margin: 0 auto;
    .item{
        height:60px;
        background:rgba(255,255,255,1);
        border-radius:5px;
        border:1px solid rgba(235,235,235,1);
        margin-bottom: 11px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-left{
            display: flex;
            align-items: center;
            >div{
                width: 36px;
                height: 36px;
                background: #4D9BFF;
                margin: 0 9px 0 16px;
                font-size:18px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height: 36px;
            }
            >span{
                font-size:16px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(38,38,38,1);
            }
        }
        .item-right{
            margin-right: 12px;
        }
    }
}
</style>
