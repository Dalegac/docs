/*
 * @Author: Dalegac
 * @Date: 2021-09-14 17:57:32
 * @LastEditTime: 2021-10-18 16:40:02
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
let timerId = null;

/**
 * 使用setTimeout模拟实现setInterval
 * @param {Function} fn
 * @param {*} delay
 * @param  {...any} args
 */
function mockSetInterval(fn, delay, ...args) {
  const recur = function () {
    timerId = setTimeout(() => {
      fn.apply(this, args);
      recur();
    }, delay);
  };
  recur();
}

function mockClearInterval(id) {
  clearTimeout(id);
}

mockSetInterval(
  (name) => {
    console.log(name);
  },
  1000,
  "lubai"
);

setTimeout(() => {
  mockClearInterval(timerId);
}, 4000);
