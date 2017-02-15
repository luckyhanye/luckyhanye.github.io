---
title: 基本 Webpack React 项目搭建
layout: linux
---

这一集来跑一个 React 的 Hello World ，但是重点我们看一下一个最简的
webpack 配置是怎么样的。


### 最简单的 Webpack 配置文件


webpack.config.js

```js
var path = require('path');
// path 是 nodejs 自带的一个包，所以不用安装，直接使用
// 用来完成*路径*相关操作

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
```


### 先说文件名

文件名 webpack.config.js 是默认加载文件名，这样，我们在这个文件的当前位置，运行

```
webpack
```

就等价于，运行

```
webpack --config webpack.config.js
```

如果文件名改为 webpack.config.dev.js 那么 webpack 默认就不能自动加载了，
而需要手动指定。

### 一句话说明上面文件的作用

项目是 React 项目，所以项目代码中有 ES6 和 JSX 语法都是浏览器不能直接运行的，所以项目需要先编译后运行。上面的配置文件的作用，一句话概括：

>用 babel 把入口文件 index.js 编译成 bundle.js

详细来说，完成了下面几个小任务：

- 编译 JSX 成原生 JS
- 编译 ES6 成原生 JS
- 把 index.js 引领的多个 ES6 模块文件，打包成一个 bundle.js

注意：Webpack 已经不仅仅是一个打包器了，它已经发展成一个强大的 build tool
构建工具，里面可以融入大量辅助开发的插件。所以通常我们就是把 babel 作为 Webpack 的功能之一来使用。

### 添加 Webpack 插件的形式

用 loader 的形式来添加。比如我想给 Webpack 添加 babel 功能。bable 自己是
一个独立的工具，所以要通过　babel-loader 做媒人，也就是下面代码的由来

```
loader: 'babel-loader'
```

包括我们看　package.json 中，也安装了这个包。
但是只有　babel-loader 是不够的，还需要有　babel 本身，
package.json 中的这几个包

```json
"babel-core": "^6.10.4",,
"babel-preset-es2015": "^6.9.0",
"babel-preset-react": "^6.11.1",
"babel-preset-stage-0": "^6.5.0",
```

都是　babel 工具本身，可以说跟　webpack 没关系，包括　.babelrc 文件，
也可以说跟　webpack 没啥关系。

### 运行　webpack

运行　webpack 的目的就是把　index.js 编译成　bundle.js　，直观上
可以这样操作：

```
cd project/
webpack
```

这样，如果　webpack.config.js 在　project 顶级位置，那么默认就可以加载。

大部分同学　webpack 都是局部安装的，也就是安装到了　project/node_modules
文件夹内，所以运行　webpack 命令会报　`Command Not Found` ，意思是没有 webpack 这个命令。
解决方法是，运行

```
cd project/
./node_modules/.bin/webpack
```
就可以执行了。但是每次敲这个路径太麻烦，所以，我们就把它添加到 package.json 中，
形成一个 npm 脚本（ script ）。具体就是在 package.json 中添加：

```
"scripts": {
  "build": " ./node_modules/.bin/webpack"
},
```

但是，package.json 有个特点，就是凡是局部安装的命令，例如这里的 webpack ，可以直接找到
所以最终，写成这样就可以了


```
"scripts": {
  "build": "webpack"
},
```

真正每次要执行编译任务的时候：

```
npm run build
```

就可以得到最终输出 bundle.js 了。


### 补充知识： NPM script

有些命令比较长，我们想给它起一个简单的外号（别名），便于手敲。设置的位置
就是在　package.json 文件的　script （脚本）这一部分。所以这个知识点
叫做　NPM Script 。


比如我们有这样一个命令：

```
webpack --config webpack.config.dev.js
```

这个命令太长，现在我们可以把它写到　package.json 之中

```
"scripts": {
  "build": "webpack --config webpack.config.dev.js"
},
```

这样，每次我想执行上面这个命令的时候，只需要

```
cd project
npm run build
```

注意，上面的 run 是必须要加的。但是如果有下面的代码

"scripts": {
  "start": "node devServer.js"
},

由于 start 是特殊名字，执行命令，我们可以用

```
npm run start
```

但是页可以省略 run 。


### 新建　React 项目

先来创建一个最简单的　React 的　Hello World 项目：

文件夹的名叫　router-hello/

src/index.js

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render(){
    return(
      <div>
        Hello
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

.babelrc

```
{
  "presets": ["es2015", "react", "stage-0"]
}
```

package.json

```json
{
  "name": "react-with-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.10.4",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-react": "^6.11.1",
    "babel-preset-stage-0": "^6.5.0",
    "react": "^15.2.1",
    "react-dom": "^15.2.1",
    "webpack": "^1.13.1"
  },
  "dependencies": {
    "react-router": "^3.0.0"
  }
}
```

webpack.config.js

```js
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
```

index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <div id="app"></div>
  <script src="./build/bundle.js" charset="utf-8"></script>
</body>
</html>
```

有了上面的代码，浏览器中打开　index.html ，可以看到　hello 字样。
