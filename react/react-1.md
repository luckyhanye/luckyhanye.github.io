---
title: 你好，SPA
layout: linux
---

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
