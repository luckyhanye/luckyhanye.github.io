---
titel: UI库
layout: linux
---

## UI库的引用

### bootstrap

可以通过` bootstrap` 引用`css`、`javeScript` 样式，引用样式之前要先复制链接，可以再`"bootstrap cdn"`中复制需要的链接,例如：

> <link rel="stylesheet" href="./css/bootstrap.min.css">

参考[bootstrap官网](http://getbootstrap.com/)

### ant design

使用之前，首先安装下载

```
$ npm install antd --save
```
要先引入标签组件才能使用，参考案例：

```js
import { Button, Menu, Dropdown, Icon } from 'antd';

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

ReactDOM.render(
  <div>
    <Button type="primary">primary</Button>
    <Button>secondary</Button>
    <Dropdown overlay={menu}>
      <Button>
        more <Icon type="down" />
      </Button>
    </Dropdown>
  </div>,
  mountNode
);
```
参考[ant 官网](https://ant.design/index-cn)

### material-ui

代码案例：

```js
import React from 'react';
import AppBar from 'material-ui/AppBar';

const AppBarExampleIcon = () => (
  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

export default AppBarExampleIcon;
```

参考[material-ui官网](http://www.material-ui.com/#/)
