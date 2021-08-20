/*
 * @Author: Dalegac
 * @Date: 2021-08-20 11:35:51
 * @LastEditTime: 2021-08-20 13:46:59
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
class EventEmitter {
  constructor(options = {}) {
    this.events = {}
    this.maxListeners = options.maxListeners || Infinity
  }
  emit = (event, ...args) => {
    const cbs = this.events[event]

    if (!cbs) {
      console.warn(`${event} is not registered`)
    }

    cbs.forEach((cb) => cb.apply(this, args))
    return this
  }

  on = (event, cb) => {
    if (!this.events[event]) {
      this.events[event] = []
    }
    if (
      this.maxListeners !== Infinity &&
      this.events[event].length >= this.maxListeners
    ) {
      console.log(`${event} has reached max listeners`)
      return this
    }
    this.events[event].push(cb)

    return this
  }
  once = (event, cb) => {
    // 用完进行销毁
    const func = (...args) => {
      this.off(event, func)
      cb.apply(this, args)
    }

    this.on(event, func)
    return this
  }

  off = (event, cb) => {
    if (!cb) {
      this.events[event] = null
    } else {
      this.events[event] = this.events[event].filter((item) => cb !== item)
    }

    return this
  }
}

const add = (a, b) => console.log(a + b)
const log = (...args) => console.log(...args)
const eve = new EventEmitter({ maxListeners: 3 })

eve.on("add", add)
eve.on("add", () => {})
eve.on("add", () => {})
eve.on("add", () => {})
eve.on("add", () => {})
eve.on("log", log)
eve.emit("add", 1, 2) // 3
eve.emit("log", "hi~") // hi~
eve.off("add")
eve.on("add", 1, 2) // Error: add event is not registered.
eve.once("once", add)
eve.emit("once", 1, 2) // 3
eve.emit("once", 1, 2) // 不触发
eve.emit("once", 1, 2) // 不触发
