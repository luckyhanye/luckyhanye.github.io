---
title: 用 POST 传复杂数据到服务器（ axios 篇）
layout: linux
---

## 用 POST 传复杂数据到服务器（ axios 篇）

在 React 应用中，比较少会用到 form 直接提交数据的形式，而更多是采用更为灵活的一种方式， 那就通过 axios/fetch 这样的 http 客户端来发 POST 请求。

跟 form 提交形式不同，axios 提交的内容类型是

```
Content-Type: application/json
```

### 后台代码

基本上就是在上节的基础上，修改一行代码即可

```js
--- app.use(bodyParser.urlencoded());
+++ app.use(bodyParser.json());
```

json 接口，可以到 **body-parser** 的 Readme 中查到。

### 使用 curl 调试 api

```js
curl -H "Content-Type: application/json" -X POST -d '{"username":"hanye"}' http://localhost:3005/login

curl -H "Content-Type: application/json" -X POST -d '{"username":"hanye"}' http://haoduoshipin.com/login
```

上面代码中，`-H` 用来设置头部（ header ），这里我们设置的值是 `Content-Type: application/json` 。`-X` 用来设置请求方法，这里设置的值是 `POST` 。`-d` 用来设置数据， 具体的值就是后面的 json 字符串。

### 引入一个 **form** 盒子

代码如下：

index.js

```js
import React from "react"
import ReactDOM from "react-dom"
import axios from 'axios'

class App extends React.Component{
  constructor(){
    super();
    this.state={
      name:''
    }
  }
  handleSubmit(e){
    e.preventDefault();
    let username="luckyhanye"
    console.log({username});
    axios.post('http://tiger.haoduoshipin.com/login',{username})
      .then(res=>console.log(res))
  }
  render(){
    return(
      <div>
        <form>
          <input type="text" />
          <button>提交</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

```


### 前台实现 axios 代码

react 代码如下：

index.js

```js
import React from "react"
import ReactDOM from "react-dom"
import axios from 'axios'

class App extends React.Component{
  constructor(){
    super();
    this.state={
      name:'',
      msg:'',
    }
  }
  handleSubmit(e){
    e.preventDefault();
    let username=this.refs.username.value;
    axios.post('http://tiger.haoduoshipin.com/login',{username})
      .then(res=>this.setState({msg:res.data.msg}))
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="username"/>
          <button>提交</button>
        </form>
        <div style={{marginTop:"20px"}}>{this.state.msg}</div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
```


这样就可以发送跟前面 curl 命令一样效果的请求了。 chrome 中查看，请求头部 **Headers** 中有：

```js
Content-Type:application/json; charset=utf-8
```

表示 axios 的数据，默认就是按照 application/json 发送的。

### 补充

- handle 的意思是“处理”的意思，handleSubmit 就是”处理提交“的意思
- form 的意思是”表单“
- refs 是 React 自带功能 ref 的中文意思是”指向“或者”指针“

### 总结

使用 axios 发送数据，是最为灵活和强大的一种方式，以后我们会用到的比较多。
