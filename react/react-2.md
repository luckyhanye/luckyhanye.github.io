---
title: react 组件状态
layout: linux
---

## react-state   组件状态

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
