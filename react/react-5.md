---
title: 模块化拆分
---


### 代码

routes.js


```js
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Hello1 from './components/Hello1';
import Hello2 from './components/Hello2';
import App from './components/App';


const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='/hello1' component={Hello1} />
    <Route path='/hello2' component={Hello2} />
  </Router>
);

export default renderRoutes;
```

src/index.js


```js
import ReactDOM from 'react-dom';
import renderRoutes from './routes.js';

ReactDOM.render(renderRoutes(), document.getElementById('app'));
```

public/index.html

```js
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

.babelrc


```
{
  "presets": ["es2015", "react", "stage-0"]
}
```


components/App.js

```
import {Link} from 'react-router';
import React, { Component } from 'react';


class App extends Component {
  render(){
    return(
      <div>
        <Link to='/hello1'>Hello1</Link>
        <Link to='/hello2'>Hello2</Link>
      </div>
    )
  }
}

export default App;
```

components/Hello1.js

```js
import React, { Component } from 'react';

class Hello1 extends Component {
  render(){
    return(
      <h1>
        Hello1 Page
      </h1>
    )
  }
}

export default Hello1;
```

components/Hello2.js

```
import React, { Component } from 'react';

class Hello2 extends Component {
  render(){
    return(
      <h1>
        Hello2 Page
      </h1>
    )
  }
}
export default Hello2;
```

server.js

```js
const path = require('path');
var express = require('express');
var app = express();

app.use(express.static('public'));
// 用跟 本文件平级的一个 public 夹作为静态文件的存放位置
// 没有这一行，后面 sendFile 的 index.html 就找不到了。

app.get('*', function(req, res){
  res.sendFile('index.html', {root: 'public'});
});

app.listen(3000, function(err) {
  console.log('Listening at http://localhost:3000');
});

```
