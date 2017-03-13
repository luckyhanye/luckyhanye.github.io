---
title: react-refs
layout: linux
---

## react ref  属性

在标签中定义一个`ref`属性，写法： `<div ref="box"></div>`

通过`this.state.refs.box`   可以获取节点，多用于`input`

也可以获取子组件中的方法

参考代码：

```js
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
