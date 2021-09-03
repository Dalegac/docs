<!--
 * @Author: Dalegac
 * @Date: 2021-08-29 20:12:12
 * @LastEditTime: 2021-08-29 23:33:48
 * @LastEditors: Dalegac
 * @Description: Just say something
-->

## 防抖和节流的基本概念？

防抖 debounce:

当持续触发事件时，一定时间内没有再触发事件，事件处理函数才会执行一次。
如果一定时间内多次触发事件，就会重新开始延迟时。

在最后一次事件触发后，1000ms 执行

节流 throttle:

## 防抖和节流分别适合用在什么场景？

节流： resize scroll

防抖： input
