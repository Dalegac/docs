class EventEmitter {
  constructor(options = {}) {
    this.events = {};
    this.maxListeners = options.maxListeners | Infinity;
  }

  on(event, cb) {
    console.log(this);
    if (!this.events[event]) {
      this.events[event] = [];
    }
    if (
      this.maxListeners !== Infinity &&
      this.events[event].length >= this.maxListeners
    ) {
      console.log(`${event} has reached max listeners`);
      return this;
    }
    this.events[event].push(cb);
    return this;
  }
  emit(event, ...args) {
    const cbs = this.events[event];
    if (!cbs) {
      console.warn(`${event} has not register`);
    } else {
      cbs.forEach((cb) => cb.apply(this, args));
    }

    return this;
  }
  off(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      this.events[event] = this.events[event].filter((i) => cb !== i);
    }
    return this;
  }
  once(event, cb) {
    const func = (...args) => {
      this.off(event, cb);
      cb.apply(this, args);
    };
    this.on(event, func);
    return this;
  }
}

const e = new EventEmitter({ maxListeners: 2 });
const a = () => console.log("aaa");
const b = () => console.log("bbb");
e.on("a", a);
e.emit("a");
e.emit("a");
e.off("a");
e.emit("a");
