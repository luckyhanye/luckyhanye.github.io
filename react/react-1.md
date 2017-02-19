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

### 组件

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
