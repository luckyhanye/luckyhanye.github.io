---
title: 实例展示
layout: linux
---

## 实例展示

### 实例展示

`轮播图`

```
//slider.js  文件

import React from "react"
import "./main.css"


class Slider extends React.Component{
  constructor(){
    super();
    this.state={
      nowScroll:0    //第一张
    }
  }

  scroll(num){
    let next=this.state.nowScroll+num
    if(next >= this.props.imgs.length){
      return this.setState({nowScroll:0})
    }
    if(next<0){
      return this.setState({nowScroll:this.props.imgs.length-1})
    }
    return this.setState({nowScroll:next})
  }

  handleClick(index){
    let n=index-this.state.nowScroll;
    clearInterval(this.interval)
    this.scroll(n)
    this.goPlay()
  }

  goPlay(){    //启动计时器，控制自动播放
    this.interval=setInterval(()=>this.scroll(1),this.props.time)
  }

  componentDidMount(){
    this.goPlay()
  }

  render(){
    let liWidth=100/this.props.imgs.length+"%"
    let styles={
      ul:{
        width: this.props.imgs.length*100+"%",
        left:-this.state.nowScroll*100+"%"
      }
    }

    return(
      <div className="slider-wrap">
        <ul style={styles.ul}>
          {
            this.props.imgs.map(item=> <li key={Math.random()} style={{width:liWidth,backgroundImage:`url(${item})`}}></li>)
          }
        </ul>
        <div className="btn1" onClick={this.handleClick.bind(this,this.state.nowScroll-1)}>⬅️</div>
        <div className="btn2" onClick={this.handleClick.bind(this,this.state.nowScroll+1)}>➡️</div>
        <div className="dotted">
          {this.props.imgs.map((item,index)=><span key={Math.random()}
            onClick={this.handleClick.bind(this,index)}
            style={{backgroundColor:this.state.nowScroll==index?'pink':'lightblue'}}></span>)}
        </div>
      </div>
    )
  }
}

export default Slider

```
