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
