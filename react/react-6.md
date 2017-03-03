---
title: react 组件中的事件
layout: linux
---

## react 事件

参考[react官网教程](https://facebook.github.io/react/docs/events.html#composition-events)

### `event` 事件

`event`有如下属性：

```

- boolean bubbles

- boolean cancelable

- DOMEventTarget currentTarget

- boolean defaultPrevented

- number eventPhase

- boolean isTrusted

- DOMEvent nativeEvent

- void preventDefault()

- boolean isDefaultPrevented()

- void stopPropagation()

- boolean isPropagationStopped()

- DOMEventTarget target

- number timeStamp

- string type
```

### `Clipboard Events`  剪贴板事件


 event name 事件名称：

 > onCopy复制事件  onCut剪切事件  onPaste粘贴事件

properties 属性：

> DOMDataTransfer  clipboardData

### `Composition Events`  组成事件

event name 事件名称：

> onCompositionEnd onCompositionStart onCompositionUpdate

properties 属性：

> string data

### `Keyboard Events` 键盘事件

event name 事件名称：

> onKeyDown onKeyPress onKeyUp

properties 属性：

> boolean altKey <br/>
  number charCode <br/>
  boolean ctrlKey <br/>
  boolean getModifierState(key) <br/>
  string key <br/>
  number keyCode <br/>
  string locale <br/>
  number location <br/>
  boolean metaKey <br/>
  boolean repeat <br/>
  boolean shiftKey <br/>
  number which <br/>
