# 常见代码题


## 用setTimeout实现setInterval

期望利用原生的setTimeout来模拟实现setInterval, 即实现如下函数

```js
/**
 * 使用setTimeout模拟实现setInterval
 * @param {Function} fn 回调函数
 * @param {*} delay 延迟时间
 * @param  {...any} args 回调函数的参数
 */
function mockSetInterval(fn, delay, ...args) {

}
```

## 实现红绿灯

要求使用一个div实现红绿灯效果, 把一个圆形 div 按照绿色 3 秒，黄色 1 秒，红色 2 秒循环改变背景色。

Tips: 同学们可以回去尝试使用 setTimeout嵌套/promise链式调用 分别实现一下
