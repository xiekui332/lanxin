export const getUrlParams = (name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象 
    if(window.location.href.split("?")[1]){
        let r=window.location.href.split("?")[1].match(reg);//匹配目标参数
        if (r != null) return decodeURI(r[2]);
    }
    return null; //返回参数值 
}

export const setSession = (item, val) => {
    sessionStorage.setItem(item, val)
}

export const getSession = (item) => {
    return sessionStorage.getItem(item)
}

export const clearSession = () => {
    sessionStorage.clear()
}


export const splitUrl = (name) => {
    let r=window.location.href
    let pos=r.indexOf("?");//匹配目标参数
    if(r.substr(pos) != null) return r.substr(pos)
    return null; //返回参数值 
}

export const format = (num) => {
    let str = num+'';
    return str.split("").reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev;
    })
}


export const regexFile = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG|PDF|pdf)$/

export const timestampToTime = (timestamp, type) => {
    // var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var date = new Date(timestamp)
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    if(type == 2) {
        return Y+M+D+' '+h+m;
    }else{
        return M+D;
    }
    
}

export const getCaptionLine = (obj,state) => {
    var index=obj.lastIndexOf("\-");
    if(state==0){
        obj=obj.substring(0,index);
    }else {
        obj=obj.substring(index+1,obj.length);
    }
    return obj;
}


export const getCaptionPoint = (obj,state) => {
    var index=obj.lastIndexOf("\·");
    if(state==0){
        obj=obj.substring(0,index);
    }else {
        obj=obj.substring(index+1,obj.length);
    }
    return obj;
}
