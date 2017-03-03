---
title: react-props  props属性
layout: linux
---

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
