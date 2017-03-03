---
title: react 生命周期
layout: linux
---

## react 组件生命周期

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
