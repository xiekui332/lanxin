<template>
    <div id="login">
        <div class="welcome">
            <span class="txt">Welcome！</span>
            <div class="img">
                <img :src="imgUrl" alt="">
            </div>
        </div>

        <div class="form">
            <div class="input acount">
                <van-icon name="contact" size=".5rem" />
                <van-cell-group>
                    <van-field v-model="acount" placeholder="请输入账号" />
                </van-cell-group>
            </div>
            <div class="input pass">
                <van-icon name="bag-o" size=".5rem" />
                <van-cell-group>
                    <van-field type="password" v-model="pass" placeholder="请输入密码" />
                </van-cell-group>
            </div>

            <van-button type="primary" block @click="login">登录</van-button>
        </div>
    </div>
</template>

<script>
import { handleLogin } from '../service/api'
import { setSession } from '@/service/utils'
export default {
    name: 'Login',
    props: {

    },
    components: {
        
    },
    data() {
        return {
            imgUrl:require('../assets/author.png'),
            acount:'',
            pass:''
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        login() {
            if(!this.acount || !this.pass) {
                this.$toast('请输入账号或密码');
                return
            }
            let params = {
                userName:this.acount,
                password:this.pass
            }

            handleLogin(params).then((res) => {
                if(res.msg == '登录成功') {
                    setSession('sessionId', res.sessionId)
                    this.$router.push({
                        path: '/index'
                    })
                }else{
                    this.$toast(res.data.msg);
                }
            })
            .catch((err) => {
                console.log(err)
                this.$toast('请求失败');
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
#login{
    height: 100%;
    overflow: hidden;
}
.welcome{
    margin-top: 112px;
    display: flex;
    align-items: center;
    .txt{
        font-size:36px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(67,97,183,1);
        line-height:50px;
        text-align: left;
        padding-left: 47px;
    }
    .img{
        width: 75px;
        height: 75px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 12px;
        // border: 8px solid #d9d9d9;
        background: #fafafa;
        img{
            width: 100%;
            height: 100%;
        }
    }
}

.form{
    width: 283px;
    display: flex;
    flex-direction: column;
    margin: 55px auto 0;
    .input{
        width: 100%;
        height: 40px;
        background:rgba(247,249,251,1);
        border-radius:20px;
        margin-bottom: 32px;
        .van-cell-group,.van-cell{
            background:rgba(247,249,251,1);
            padding: 0;
            & /deep/ .van-field__control::placeholder{
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(151,173,194,1);
            }
            & /deep/ .van-field__control{
                height: 40px;
                font-size: 16px;
            }
            
        }
    }
    .acount,.pass{
        display: flex;
        .van-icon{
            line-height: 40px;
            margin-left: 17px;
            margin-right: 10px;
        }
    }
    & /deep/ .van-button--primary{
        height: 44px;
        background:rgba(67,97,183,1);
        border-radius:22px; 
        border: rgba(67,97,183,1);
        font-size:15px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
}
</style>
