/*
 * @Author: Dalegac
 * @Date: 2021-08-29 20:21:42
 * @LastEditTime: 2021-08-29 20:25:53
 * @LastEditors: Dalegac
 * @Description: 防抖
 */

function debounce(fn, wait) {
  let timeout = null;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}
