<template>
    <div class="wrapper">
        <div class="level level1">普通</div>
        <div class="level level2">一般</div>
        <div class="level level3">紧急</div>
    </div>
</template>

<script>
export default {
    props: {

    },
    components: {

    },
    data() {
        return {

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
