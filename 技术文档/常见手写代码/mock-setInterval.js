/*
 * @Author: Dalegac
 * @Date: 2021-08-29 20:02:59
 * @LastEditTime: 2021-08-29 20:12:31
 * @LastEditors: Dalegac
 * @Description: Just say something
 */

let timerId = null;
function mockSetInterval(fn, delay, ...args) {
  const recur = function () {
    timerId = setTimeout(() => {
      fn.apply(this, args);
      recur();
    }, delay);
  };
  recur();
}

function clearSetInterval(id) {
  clearInterval(id);
}

mockSetInterval(
  (name) => {
    console.log(name);
  },
  1000,
  "dale"
);
