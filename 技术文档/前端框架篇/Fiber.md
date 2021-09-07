## 1. 设计理念

### React 哲学

> 我们认为，React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。他在 Facebook 和 Instagram 上表现优秀。

#### 制约快速响应的因素

- 计算能力——CPU 瓶颈(creating nodes,re-rendering)
- 网络延迟——IO 瓶颈(data fetching,code splitting)

主流浏览器刷新频率为 60Hz，即每（1000ms / 60Hz）16.6ms 浏览器刷新一次。

我们知道，JS 可以操作 DOM，GUI 渲染线程与 JS 线程是互斥的。所以 JS 脚本执行和浏览器布局、绘制不能同时执行。

在每 16.6ms 时间内，需要完成如下工作：

```
JS脚本执行 -----  样式布局 ----- 样式绘制
```

> 这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为时间切片（time slice）

React 的 Concurrent Mode 启用了时间切片：此时我们的长任务被拆分到每一帧不同的 task 中，JS 脚本执行时间大体在 5ms 左右，这样浏览器就有剩余时间执行样式布局和样式绘制，减少掉帧的可能性。

解决 CPU 瓶颈的关键是实现时间切片，而时间切片的关键是：将同步的更新变为可中断的异步更新。

Time Slicing 带来的好处：

- React 在渲染（render）的时候，不会阻塞现在的线程
- 如果你的设备足够快，你会感觉渲染是同步的
- 如果你设备非常慢，你会感觉还算是灵敏的
- 虽然是异步渲染，但是你将会看到完整的渲染，而不是一个组件一行行的渲染出来
- 同步书写组件的方式

## 2. Fiber

### 什么是 Fiber？

> This Fiber is just a plain JavaScript object and it has one to one relationship with an instance. It manages the work for an instance so it keeps track of which instance is for using the property state node.It also keeps track of its relationships to other fibers in the tree.
> [Lin Clark - A Cartoon Intro to Fiber - React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)

### Fiber 的数据结构

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance
  // 作为静态数据结构的属性
  this.tag = tag; // 对应的组件类型FunctionComponent,ClassComponent,HooksComponent(DOM结点对应的Fiber结点)
  this.key = key; // 我们常用的元素key
  this.elementType = null; // 大部分情况下elementType与type相同，在某些情况下，比如FunctionComponent使用React.Memo包裹时，两者不同
  this.type = null; // 对于FunctionComponent是函数本身，对于ClassComponent是class，对于HooksComponent是DOM结点的TagName
  this.stateNode = null; // 对于HooksComponent是是它真实对应的DOM结点

  // Fiber
  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  // 对于多个同级Fiber节点，代表他们插入DOM的位置索引
  this.index = 0;
  // 就是我们常用的ref属性
  this.ref = null;

  // 从这里往下，都是作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  // 名称中带有Effect代表副作用相关，对于HostComponent副作用包括DOM节点的增删查改，
  // 对于FunctionComponent副作用代表了我们使用useEffect或者useLayoutEffect这两个hook
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
  ......
}
```

## 文件 SchedulerPriorityes

```js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type PriorityLevel = 0 | 1 | 2 | 3 | 4 | 5;

// TODO: Use symbols?
// 初始化时的无优先级
export const NoPriority = 0;

// 立刻执行的优先级，也就是同步的优先级，react中最高优的优先级
export const ImmediatePriority = 1;

// 由用户触发的更新，比如在点击事件回调onClick触发了this.setState,
//那么这个this.setState创建的Update就是此优先级
export const UserBlockingPriority = 2;

// 比如在应用中请求服务的数据，数据返回时更新状态，这里的更新就是此优先级
export const NormalPriority = 3;

// Suspense就是
export const LowPriority = 4;

// 空闲的优先级
export const IdlePriority = 5;
```
