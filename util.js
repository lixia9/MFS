//cookie 获取
export let getCookie =(name)=> {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}
//cookie 设置
export let setCookie =(name, value, Hours,domain)=> {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain="+domain+";"
}

// 用法：getUrlParam("lxl")
export let  getUrlParam=(name,url=window.location.search)=>{ 
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)"); 
    var r =  url.substr(1).match(reg);
    var strValue = "";
    if (r!=null){
     strValue= unescape(r[2]);
    }
    return strValue;
}
//判断是不是Android浏览器
export let isAndroidMobileDevice=()=>{
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}
//判断是不是IOS浏览器
export let isIosMobileDevice=()=>{
    return(/iPhone|iPad/i.test(navigator.userAgent.toLowerCase()))
}

//浏览器复制
export let copyToClipboard=(text)=>{
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
  }
  //获取浏览器选择段落文本对象
  export let getSelectedText =()=> {
    var t = '';
      if (window.getSelection) {
          t = window.getSelection();
      } else if (document.getSelection) {
          t = document.getSelection();
      } else if (document.selection) {
          t = document.selection.createRange().text;
      }
      return t;
  }
//日期转换 new Date().format("yyyy-MM-dd hh:mm:ss")
Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o){
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
    }
    return format;
}