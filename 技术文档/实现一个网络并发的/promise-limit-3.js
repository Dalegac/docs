/*
 * @Author: Dalegac
 * @Date: 2021-08-20 14:01:42
 * @LastEditTime: 2021-08-22 23:15:44
 * @LastEditors: Dalegac
 * @Description: 实现一个控制并发的函数，接收并发量参数，3，urls = [8]
 */
const { loadImg, urls } = require("./mock.js")

class PromiseQueue {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 1
    this.currentCount = 0
    this.pendingList = [] // 等待执行的请求
  }

  // 在插入的时候，排序，也可以完成优先级执行
  add(task) {
    this.pendingList.push(task)
    this.run()
  }

  run() {
    // 无任务或者当前最大并发量已经达到最大了
    if (
      this.pendingList.length === 0 ||
      this.concurrency === this.currentCount
    ) {
      return
    }
    this.currentCount++
    // const fn = this.pendingList.shift()
    // 增加了排序，优先级高的任务优先执行
    const { fn } = this.pendingList
      .sort((a, b) => b.priority - a.priority)
      .shift()

    const promise = fn() // Promise在初始化的时候已经执行了
    promise.then(this.completeOne.bind(this)).catch(this.completeOne.bind(this))
  }

  completeOne() {
    this.currentCount--
    this.run()
  }
}

const queue = new PromiseQueue({
  concurrency: 3,
})

const formatTask = (url) => {
  return {
    fn: () => loadImg(url),
    priority: url.priority,
  }
}

urls.forEach((url) => {
  queue.add(formatTask(url))
})

const highPriorityTask = {
  info: "hight!!!!",
  time: 800,
  priority: 10,
}

queue.add(formatTask(highPriorityTask))
