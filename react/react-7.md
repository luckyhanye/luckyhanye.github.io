---
title: react-router 路由嵌套
layout: linux
---

## react-router 路由嵌套

### router、route、hashHistory

首先下载`router-router`

```
$ npm install --save react-router
```
创建路由组件，实例如下：

```
import React from "react"
import {Router,Route,hashHistory,browserHistory,Redirect,IndexRoute} from "react-router"

import Home from "./completed/home.js"
import About from "./completed/about.js"
import Work from "./completed/work.js"
import Me from "./completed/me.js"
import PageNotFound from "./completed/pageNotFound.js"
import Indexrouter from "./completed/indexrouter.js"
import Blog from "./completed/blog.js"

class App extends React.Component{
  render(){
    return(
      <Router history={browserHistory}>
        <Route path="/" component={Home}>              // path='输入的路径(通用小写)'，component='挂载的组件'
          <IndexRoute component={Indexrouter} />       // IndexRoute 公用组件
          <Route path="about" component={About}>
            <Route path="me" component={Me}/>
          </Route>
          <Route path="work" components={Work}/>
          <Route path="blog/:title" components={Blog}/>
          <Route path="404" component={PageNotFound}/>
          <Redirect from="*" to="404"/>    //路由跳转，*代表所有，to="跳转到的路径"
        </Route>
      </Router>
    )
  }
}

export default App
```
`IndexRoute`即处理页面初始进入时候的组件展示，等路由切换的时候，再根据其他路由规则进行组件的切换展示。

`hashHistory`  给我们的路径添加'/#/'防止浏览器跳转到其他页面，始终拿到的是'index.html',不需要服务器支持

`browserHistory`  利用我们的服务器，实现页面跳转，不论访问任何路径，都返回 'index.html',路径看起来美观，但是需要有本地服务器支持，如果托管在"github,coding"等网站上的话用不了。

Route中`components`中接收的参数不仅仅只是实际的组件，还可以是对象，通过这样的用法，我们可以更灵活的控制组件的展示。

路由是分多个层级的,我们可以使用react-router的路由嵌套来清晰的管理路由和组件之间的切换展示。

### Link

Link是react-router提供的导航组件，可以直接使用进行路由切换，作用同a标签，首先要引入Link

```
import {Link} from "react-router"
```
当前路由被点击处于触发显示状态的时候，我们可以使用`activeStyle`来给路由设置一些颜色，`activeClassName`设置class名。

### 路由变量

常规的路由，路由中的规则是给定的，现在我们尝试使用路由变量，在组件中获取这个路由的变量，并做相应的组件展示。

参考代码：

```
import React, { Component } from 'react';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';

import './App.css';

const Message = (props) =>
  <div>
    <h1>{props.params.message || 'Hello'}</h1>
    <Links />
  </div>

const Links = () =>
  <nav>
    <Link to="/">Hello</Link>
    <Link to="/yong">Yong</Link>
    <Link to="/feng">Feng</Link>
  </nav>

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/(:message)" component={Message} />
      </Router>
    );
  }
}

export default App;
```
