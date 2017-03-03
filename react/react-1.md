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


### `react`的`props`属性

前端开发中，通常把通用的设计元素（按钮，表单框，布局组件等）拆成可复用的组件。这样，下次开发相同界面程序时就可以写更少的代码，也意义着更高的开发效率，更少的 Bug 和更少的程序体积。

可以通过`react`中的`props`来传递这些通用的，可复用的组件。

下面代码展示了，如何通过`props`来传递组件的

```
//通用组件

import React from "react"

class Card extends React.Component{
  render(){
    let card={
      width:"100%",
      maxWidth:"760px",
      height:"80px",
      margin:"10px auto",
      boxShadow:"1px 2px 6px gray"
    }
    let cardIndex={
      float:"left",
      width:"80px",
      height:"80px",
      backgroundColor:"teal",
      color:"white",
      lineHeight:"80px",
      textAlign:"center",
      fontSize:"25px"
    }
    let cardInfo={
      float:"left",
      height:"80px",
      padding:"0 0 0 30px"
    }
    console.log(this.props);
    return (
      <div style={card}>
        <div style={cardIndex}>{this.props.index}</div>   
        <div style={cardInfo}>
          <h3>{this.props.title}</h3>
          <p>{this.props.date}</p>
        </div>
      </div>
    )
  }
}
Card.defaultProps={    //默认属性设置
  index:"NO.",
  title:"默认标题",
  date:"---- -- --"
}

export default Card
```

props 特点

- 只能从父组件传给子组件

- 子组件通过`{this.props.[name]}`获取`props`值

- 子组件设置默认属性`Btn.defaultProps={}`

- 子组件设置属性格式验证`Btn.propTypes={}`

参考代码如下：

```
// 设置默认属性

Card.defaultProps={    //默认属性设置
  index:0,
  title:"默认标题",
  date:"---- -- --",
  bgc:"teal",
  lh:80,      //如果lh写成
}

//设置属性格式验证

Card.propTypes={
  index:React.PropTypes.number,
  title:React.PropTypes.string,
  bgc:React.PropTypes.string,
  date:React.PropTypes.string,
}
```

可以传递函数，也有子组件控制父组件的情况，就是子组件调用父组件的函数方法

参考代码：

```
//父组件

class App extends React.Component{
  constructor(){
    super();
    this.state={
      date,
      num:0,
    }
  }
  addNum(val){      //定义函数  加法
    this.setState({num:this.state.num+val})
  }
  cutNum(n){       //定义函数  减法
    this.setState({num:this.state.num-n})
  }
  render(){
    return (
      <div>
        {      //写法一
          this.state.date.map(item=><Card key={Math.random()}
          title={item.title}
          index={item.index}
          date={item.date}/>)
        }
        {    //写法二，展开数组的写法
          this.state.date.map(item=><Card key={Math.random()}
          {...item}/>)
        }
        <Card bgc='blue'/>
        <Card/>
        数值是：{this.state.num}<br/>
        <Btn1
          fatherClick={this.addNum.bind(this)}   //fatherClick属性名 {}当中的是变量
          num={5}
        />   
        <Btn1 bg="blue" fatherClick={this.cutNum.bind(this)} num={10}/>
      </div>
    )
  }
}

//子组件

class Btn1 extends React.Component{
  handleClick(){    //定义函数，设置props属性，fatherClick()是调用函数
    this.props.fatherClick(this.props.num);
  }
  render(){
    let styles={
      width:"80px",
      height:"20px",
      marginTop:"10px",
      backgroundColor:this.props.bg,   //创建属性
      borderRadius:this.props.rad,
      color:"white",
      border:this.props.bor
    }
    console.log(this.props);
    return (
      <div >
        <button style={styles}
          onClick={this.handleClick.bind(this)}>
            {this.props.title}
        </button>
      </div>
    )
  }
}
Btn1.defaultProps={    //默认属性设置
  title:"defaultTitle",
  bg:"lightGreen",
  rad:"5px",
  bor:"2px solid pink",
}

Btn1.propTypes={
  fatherClick:React.PropTypes.func.isRequired   //不传属性，会出警告
}

```

### react 组件生命周期

- 1、初始化，首次渲染

  ```
  constructor()     //获取实例初试状态

  componentWillMount()    //首次渲染之前

  render()        //渲染

  componentDidMount()   //首次渲染之后

  ```

- 2、更新阶段（`state`,`props`发生变化是触发）

  ```
  componentWillReceiveProps()   //属性被修改前

  shouldComponentUpdate()      //判断是否需要更新

  componentWillUpdate()        // 更新之前

  render()                    //渲染

  componentDidUpdate()       //更新之后
  ```

- 3、销毁

  ```
  componentWillUnmount()      //销毁前
  ```

### `react-refs`

在标签中定义一个`ref`属性，写法： `<div ref="box"></div>`

通过`this.state.refs.box`   可以获取节点

也可以获取子组件中的方法

参考代码：

```
//子组件文件

export default class Test extends React.Component{
  sayHello(){
    console.log('hello world');
  }
  getVue(){
    return this.refs.input.value
  }
  handleClick(){
    alert("aaaaaaaa")
  }
  render(){
    return (
      <div>
        我是Test组件
        <input type="text" defaultValue="1111aaa" ref="input"></input>
        <button onClick={this.handleClick.bind(this)}>aa</button>
      </div>
    )
  }
}

//父组件文件

import React from 'react'

import Test from './test'


class App extends React.Component{
  newClick(){
    this.refs.newTest.handleClick();
  }
  componentDidMount(){
    console.log(this.refs.test);   //react中获取节点的方法一，
    this.refs.test.style.color="red"   //更改样式

    console.log(this.refs.newTest);    //refs 也可以获取子组件中的方法
    this.refs.newTest.sayHello();
    console.log(this.refs.newTest.getVue());

    ReactDOM.findDOMNode(this.refs.test).style.color="green"--------   //这个方法基本不用
  }
  render(){
    return(
      <div>
        app
        <div ref='test'>aaa</div>
        <Test ref="newTest"/>     //子组件调用
        {/* <button id="btn1" ref="btn1" onClick={()=>this.refs.newTest.handleClick()}>1</button> */}
        <button id="btn1" ref="btn1" onClick={this.newClick.bind(this)}>1</button>
        <button id="btn2" ref="btn2">2</button>
      </div>
    )
  }
}

export default App

```


### `event` 事件

`event`有如下属性：

```

- boolean bubbles

- boolean cancelable

- DOMEventTarget currentTarget

- boolean defaultPrevented

- number eventPhase

- boolean isTrusted

- DOMEvent nativeEvent

- void preventDefault()

- boolean isDefaultPrevented()

- void stopPropagation()

- boolean isPropagationStopped()

- DOMEventTarget target

- number timeStamp

- string type
```

`Clipboard Events`  剪贴板事件


> 事件名称：`onCopy`复制事件 `onCut`剪切事件 `onPaste`粘贴事件

> 属性：
