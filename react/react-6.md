---
title: 嵌套 UI ，嵌套路由
---


参考： https://github.com/reactjs/react-router-tutorial/tree/master/lessons/04-nested-routes



### 代码调整


```diff
diff --git a/src/components/App.js b/src/components/App.js
index 9ae6a28..1107af4 100644
--- a/src/components/App.js
+++ b/src/components/App.js
@@ -8,6 +8,8 @@ class App extends Component {
       <div>
         <Link to='/hello1'>Hello1</Link>
         <Link to='/hello2'>Hello2</Link>
+        { this.props.children }
+        <div>footer</div>
       </div>
     )
   }
diff --git a/src/routes.js b/src/routes.js
index 227342d..9aeb23d 100644
--- a/src/routes.js
+++ b/src/routes.js
@@ -1,5 +1,5 @@
 import React from 'react';
-import { Router, Route, browserHistory } from 'react-router';
+import { Router, Route, browserHistory, IndexRoute } from 'react-router';
 import Hello1 from './components/Hello1';
 import Hello2 from './components/Hello2';
 import App from './components/App';
@@ -7,9 +7,11 @@ import App from './components/App';

 const renderRoutes = () => (
   <Router history={browserHistory}>
-    <Route path='/' component={App} />
-    <Route path='/hello1' component={Hello1} />
-    <Route path='/hello2' component={Hello2} />
+    <Route path='/' component={App} >
+      <Route path='/hello1' component={Hello1} />
+      <Route path='/hello2' component={Hello2} />
+      <IndexRoute  component={Hello1} />
+    </Route>
   </Router>
 );

```
