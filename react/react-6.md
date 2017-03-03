---
title: react 组件中的事件
layout: linux
---

## react 事件

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


> 事件名称：`onCopy`复制事件 `onCut`剪切事件 `onPaste`粘贴事件

> 属性：
