---
title: react-ajax
layout: linux
---

## react-ajax  请求

AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。

### 发送 `get` 请求的几种方式：

- 原生`AJAX    XMLHttpRequest()`

```js
var ajax=new XMLHttpRequest();   //实例化一个XMLHttpRequest  对象
console.log(ajax);

ajax.onreadystatechange=function(){     //接收响应
  if(ajax.readyState==4 && ajax.status==200){
    let data=JSON.parse(ajax.responseText);
    console.log(data);
    document.getElementById("box").innerHTML=data.login
  }
}
ajax.open("GET","https://api.github.com/users/luckyhanye",true)   //获取 数据
ajax.send()
```

- `JQuery` AJAX    $.ajax({type:'POST',date:string,success:function(){}})

```js
$.ajax({
  type:'GET',
  dataType:"json",
  contentType:"application/json",
  url:'https://api.github.com/users/luckyhanye'
}).done(function(data,status){
  console.log("data======",data)
  console.log("status======",status)
  $('#box').html(data.login);
  $('#box').append(`<img src='${data.avatar_url}'/>`);
}).fail(function(xhr,error){
  console.log(xhr);
  console.log(error);
})
```

- `fetch`方法

```js
fetch    fetch('请求地址'，{method:''}) .then(res=>res.json()).then(json=>do()).catch(err=.console.log(err))
.then(res=>res.json())    //上一步收到的结果
.then(json=>console.log(json);)   //上一步得到的结果

fetch('https://api.github.com/users/luckyhanye',{method:'GET'})
  .then(response=>response.json())
  .then(json=>console.log("get=====",json))   //成功获取数据
  .catch(error=>console.log(error))     //错误信息
```

- `axios` 方法

```js
axios.get('https://api.github.com/users/luckyhanye')
  .then(res=>console.log("axiosGet=======",res))
  .catch(err=>console.log("axiosErr=======",err))
```

### 发送`post`请求的方法

- `jquery` 方法

```js
$.ajax({
  type:'POST',
  date:'string',
  dataType:"json",
  contentType:"application/json",
  data:{
    accesstoken:'3f77acb1-d753-4393-b784-44913190e6a8'
  },
  url:'https://cnodejs.org/api/v1/accesstoken'
}).done(function(data,status){
  console.log("data======",data)
  console.log("status======",status)
}).fail(function(xhr,error){
  console.log(error);
})
```

- `fetch`方法

```js
fetch('https://cnodejs.org/api/v1/accesstoken',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    accesstoken:'3f77acb1-d753-4393-b784-44913190e6a8'
  })
})
  .then(res=>res.json())
  .then(json=>console.log("post=====",json))
```

- `axios` 方法

```js
axios.post('https://cnodejs.org/api/v1/accesstoken', {
  accesstoken:'3f77acb1-d753-4393-b784-44913190e6a8',
      // firstName: 'Fred',
      // lastName: 'Flintstone'
})
  .then(response=>console.log("axiosPost=======",response))
  .catch(error=>console.log("axiosError=======",error))
```

### 发送跨域请求：

```js
跨域请求http 协议的规定就是，不同源之间不能进行资源共享
https://github.com:80  这一段如果有不同的都叫跨域
一般后台设置 `Access-Control-Allow-Origin:*`即可解决跨域问题
dataType:'jsonp'
jsonp:'callback'
jsonp 请求只能get

$.ajax({
 dataType:'jsonp',        //跨域请求必须设置
 jsonp:'callback',        //跨域请求必须设置
 url:'http://api.douban.com/v2/book/1220562'
}).done(function(data,status){
 console.log("data======",data)
 console.log("status======",status)
}).fail(function(xhr,error){
 console.log(xhr);
 console.log(error);
})
```

###  JSON 语句方法

```js
let arr={name:"lucy",age:13,};
let json=JSON.stringify(arr)
console.log(json);
let obj=JSON.parse(json)
console.log(obj);
```
