<!--
 * @Author: Dalegac
 * @Date: 2021-08-20 11:30:17
 * @LastEditTime: 2021-08-20 14:13:44
 * @LastEditors: Dalegac
 * @Description: Just say something
-->

## 发布订阅模式

应用 vue,event bus,node

1. 这种模式，事件的触发和回调之间是异步的还是同步的？
   eventemitter3

```js
const event = new Event()

event.on(console.log)

event.emit("11") // 先输出？
console.log("111") // 先输出？
```

2. 如果想实现最大监听数，怎么办？
