---
title: react 基础知识
layout: linux
---

## react 基础知识

用 react ,首先要引入`react 文件`，参考如下：

```
import React from 'react';
import ReactDOM from 'react-dom';
```

### JSX 语法

JSX(JaveScript XML的缩写) 语法，允许我们在JS里直接去写标签。

特点：

- 每个标签必须有结束标签，如`<img src="" alt=""/>`、`<br/>`自关闭  `<h1></h1>`

- JSX 元素必须包裹在一个闭合的标签内，如 `<div> <h1> </h1> <br/> </div>`

- JSX  注释的写法 {/* 我是注释  \*/}

- 可以在JSX元素内嵌入变量  `{obj}`

- `class` 要写成 `className` , `tabindex` 写成 `tabIndex` , `for` 写成 `htmlFor`

- JSX 语法会被编译，通过`React.createElement(  )`这个方法

语法参考代码：

```
let name="lucy";   //定义变量（）
let age=20;        
let male=0;

function add(x,y){   //定义一个函数
  return x+y
}

class Fun {
  say(){
    return `hello say`
  }
}

let per = {    //定义一个对象
  name:"lily",
  age:16,
  country:"England",
  say:function(){
    console.log("123")
    return "aaa"
  }
}

let aaa=<div>
  <h3>abcdef</h3>

  <h3>{name}</h3>
  {/* JSX元素内插入变量 */}

  <h3 className="AAA">{age+3}</h3>
  {/* JSX元素内插入变量，可以计算 */}

  <h3 className={male ? 'BBB' : 'AAA'}>{male ? '男' : '女'}</h3>
  {/* JSX元素内插入三目运算 */}

  <h3>{add(3,5)}</h3>
  {/* JSX元素内插入函数 */}

  <h3>{new Fun().say()}</h3>
  {/* JSX元素内插入class 类 */}

  <h3>{per.name} {per.age} {per.say()}</h3>
  {/* JSX元素内插入对象的属性，对象的方法 */}
</div>;

//语法使用
ReactDOM.render(  //`render`是`ReactDOM`中的方法，就是把某个`DOM`节点，插到指定的地方
  aaa,  //需要添加的某节点
  document.getElementById("app")  // 指定的地方
)
```

### 组件的写法

组件（component）首字母大写,自定义标签，可以包含一系列标签，三种写法：

- var Hello=React.createClass({})  es5的写法，一般不用

  参考代码：

  ```
  import React from 'react';  //引入react
  import ReactDOM from 'react-dom';  //引入react-dom

  let Dom=React.createClass({      //使用的是`React`中的`createClass` 方法
    render:function() {
      return (<h3>111111</h3>)
    }
  })

  ReactDOM.render(
    <Dom></Dom>,document.getElementById('app1')   //使用时 <Dom></Dom>或<Dom/>
  )

  ```

- function Dom(){return <h3>111111<h3/>}   使用时<Dom/>(<Dom></Dom>)

  参考代码：

  ```
  import React from 'react';
  import ReactDOM from 'react-dom';

  function Dom(){      //创建函数
    return (
        <h3>222222</h3>
        <h3>ojoiejfkaj</h3>
        <h3>组件写法</h3>
      )
  }

  ReactDOM.render(
    <Dom></Dom>,document.getElementById('app1')   //使用时 <Dom></Dom>或<Dom/>
  )
  ```

- class

  参考代码：

  ```
  import React from 'react';
  import ReactDOM from 'react-dom';

  class Banner extends React.Component{
    render(){
      return(
        <div>
          我是Banner
        </div>
      )
    }
  }

  ReactDOM.render(
    <Banner/>,document.getElementById('app1')   
  )
  ```

### `react` 组件的嵌套

一个完整的网页，都是由多个组件集合而成，文件当中可以嵌套一个或多个组件，也可以多个文件嵌套

参考代码：

1、第一重文件导出

```
// sigin.js  文件

import React from 'react';

class Signin extends React.Component{  //创建类，“Signin”
  render(){
    return (
      <div>
         <input type="button" value="aaa"/>
         <input type="button" value="bbb"/>
      </div>
    )
  }
}

export default Signin   //默认导出“Signin”

// logo.js  文件

import React from "react";

class Logo extends React.Component{    //创建类，“Logo”
  render(){
    return (
      <div className="logo">
        Project name
      </div>
    )
  }
}

export default Logo   //默认导出“Logo”

```

2、第一重文件引入/第二重文件导出

```
import React from 'react';

import Logo from './logo.js'       //第一重文件引入
import Signin from './signin.js'   //第一重文件引入

class Header extends React.Component{   //创建类，'Header'
  render(){
    return(
      <div>
        <Logo/>
        <Signin/>
      </div>
    )
  }
}

export default Header;     // 第二重文件导出  默认导出“Header”   (将之前导入的也一并打包导出)
```

3、第三重文件引入

```
import React from 'react';

import Header from './header'    

class App extends React.Component{
  render(){
    return (
      <div>
        <Header/>    //可以实现“header.js”文件中引入的功能
      </div>
    )
  }
}

export default App;  //默认导出

```
4、入口文件 "index.js"

```
import React from 'react';
import ReactDOM from 'react-dom';


import App from './app'

ReactDOM.render(
  <App/>,document.getElementById('app')
 )
```

### react 中行内样式的写法

参考代码：

```
import React from 'react';

class Signin extends React.Component{
  getStyles(){   //行内样式的写法，写成函数方法的形式，返回一个对象，对象里面写属性样式
    return {
      float:"left",
      marginLeft:"150px",
      marginTop:"5px",
    }
  }
  render(){   //使用样式，在标签内写成 style={this.getStyles()}   实质就是调用方法
    let color=1;
    let styles={   //定义对象
      leftBtn:{    //对象的方法
        background:color ? "red" : "yellow"   //js语句
      },
      rightBtn:{   //对象的方法
        background:"blue"
      }
    }
    return(
      <div style={this.getStyles()}>   {/* 调用“Signin”的方法*/}
        <button style={styles.leftBtn}>登录</button>   {/* 调用对象的方法 */}
        <button style={styles.rightBtn}>注册</button>   {/* 调用对象的方法 */}
      </div>
    )
  }
}

export default Signin;
```

### 引入`css`的样式

首先需要下载几个webpack的loader,

```
$ npm install --save-dev style-loader css-loader less-loader
```

进行webpack配置。 代码清单：`webpack.config.js`

```
module.exports={
  entry:'./src/index.js',
  output:{
    path:'build',
    filename:'bundle.js',
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.js','.jsx','.css','.jpg','png']    //可以省略引用文件的后缀名
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ['style-loader','css-loader']}  //css 文件引用的配置
    ]
  }
};
```

引入代码：

```
import "./main.css"
```

### 加载图片

进行webpack配置。 代码清单：`webpack.config.js`

```
module.exports={
  entry:'./src/index.js',
  output:{
    path:'build',
    filename:'bundle.js',
    publicPath:'build/'    // 设置公共文件夹，图片打包路径
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.js','.jsx','.css','.jpg','png']    //可以省略引用文件的后缀名
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ['style-loader','css-loader']}，  //css 文件引用的配置
      { test: /\.(jpe?g|png)$/, use: 'file-loader'}  //加载图片的配置
    ]
  }
};
```

加载图片代码写法：

```
import url from '../link/111.jpg';   //引入图片原路径，同时会打包到build里面

class Logo extends React.Component{
  render(){
    let styles={width:'50px',height:"50px",border:"2px solid red",float:"left",borderRadius:"50%"}
    return(
      <div>
        <img src={url} alt="" style={styles}/>   //  调用"url"
      </div>
    )
  }
}
```

### `react` 组件的状态  `state`

react 组件状态 state，控制组件内部状态，组件内部状态变化，界面也会随之变化更新


```
import React from 'react';

class App extends React.Component{   //创建类 App
  constructor(){  //定义属性，自行运行
    super();      //继承
    this.state={   //定义state（状态）
      num:0,
      show:false
    }
  }
  handleClick(){   //创建一个方法（函数），没有"this"指向
    // console.log(this);   //通过 bind 的方法可以获取 this 指向，.bind(this)
    this.setState({num:this.state.num+1})     //修改state  用setState方法
  }
  handleCut(){
    this.setState({num:this.state.num-1})
  }
  handleShow(){
    this.setState({show:!this.state.show})
  }

  render(){     //render方法
    return (
      <div>
        数字是：{this.state.num} <br/>
        <button onClick={this.handleClick.bind(this)}>+1</button>

        <button onClick={this.handleCut.bind(this)}>-1</button>

        <button onClick={this.handleShow.bind(this)}>{this.state.show?'隐藏':'显示'}</button>

        <p>你现在显示吗？{this.state.show?'显示':"不显示"}</p>

        <p style={{display:this.state.show?'block':"none"}}>你现在显示吗？</p>
      </div>
    )
  }
}

// {this.state……   }  可以用在多处
```


### `react` 组件的状态  `state`  的实例演示

- 随机选取

  ```
  import React from "react";

  let place=["北京","上海","秦皇岛","天津","大理","云南","三亚","桂林"]   //定义一个数组，为选取的内容

  class Where extends React.Component{
    constructor(){
      super()
      this.state={
        start:false,     //初始状态
        place,           //数组
        text:""          //文本
      }
    }
    changeClick(){     //定义选取的函数方法
      if(this.state.start){      //进行判断
        this.setState({start:false})
        clearInterval(this.interval)
      }else{
        this.setState({start:true})
        this.interval=setInterval(
          ()=>this.setState({
            text:this.state.place[Math.floor(Math.random()*this.state.place.length)]
          }),100
        )
      }
    }
    render(){
      return (
        <div>
          <p>去哪玩？{this.state.text}</p>
          <button onClick={this.changeClick.bind(this)}>  //判断按钮的状态
            {this.state.start?"停止":"开始"}
          </button>   
        </div>
      )
    }
  }

  export default Where
  ```
- 选项卡

  ```
  import React from "react";

  class SelectBar extends React.Component{
    style(){
      return {
        display:"block",
        backgroundColor:"cyan",
        width:"80px",
        lineHeight:"1.5em",
        borderRadius:"5px",
        marginTop:"5px"
      }
    }
    constructor(){
      super();
      this.state={
        show:-1
      }
    }
    handleClick(num){
      console.log(num)
      this.setState({show:num})
    }
    render(){
      return (
        <div>
          <button style={this.style()} onClick={this.handleClick.bind(this,0)}>
            选项卡一
          </button>
          <button style={this.style()} onClick={this.handleClick.bind(this,1)}>
            选项卡二
          </button>
          <button style={this.style()} onClick={this.handleClick.bind(this,2)}>
            选项卡三
          </button>
          <div>
            {
              this.state.show ===0? <p>这是选项卡一</p>:
              this.state.show ===1? <p>这是选项卡二</p>:
              this.state.show ===2? <p>这是选项卡三</p>:null
            }
          </div>
        </div>
      )
    }
  }

  export default SelectBar

  ```


















要学习 [react-router](https://github.com/ReactTraining/react-router) 需要先对 SPA 的概念有所了解。


### 单页面应用　SPA

一般传统网站都有多个 html 页面，例如　about.html ，index.html 。
所以如果我有　example.com/about.html 或者　example.com/about
那么就可以直接打开　about.html 页面。所以这种条件下就不会涉及到
**前端路由** 的概念。

但是，我们用 React 来创作的网站，是一个**单页面应用** ，也就是整个网站
只有一个　index.html 页面。所以传统的处理链接的方式，就不灵了。但是，为什么单页面应用看上去也是有多个页面的呢？这个是因为，如果链接不同，例如
用户访问　spa-example.com/about 那么就会执行　About 组件的　JS 代码。如果访问　spa-example.com/index 就会执行对应的组件的代码。所以，单页面应用，表面上看上去不同的链接对应不同的页面，实际上底层就是不同链接，会
对应触发底层不同部分的　JS 代码。所以说，单页面应用的一个所谓的页面，其实是一个代码入口点（　Entry Point )，也就是如果一个　SPA 应用有18个页面，就是有18个入口点。

那么，React-router 就是一个前端路由器，它的作用就是，给定一个链接格式，
它会帮我们制定哪一段代码要被执行。




react-dom
