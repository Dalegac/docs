/*
 * @Author: Dalegac
 * @Date: 2021-08-23 00:10:55
 * @LastEditTime: 2021-09-30 14:26:00
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
const { urls, loadImg } = require("./mock");

function promiseLimit(arr, maxCount) {
  let current = 0;
  let pendingList = [];
  for (let i = 0; i < arr.length; i++) {
    doSend(arr[i]);
  }

  function doSend(item) {
    if (current < maxCount) {
      current++;
      loadImg(item).then(() => {
        current--;
        if (pendingList.length > 0) {
          doSend(pendingList.shift());
        }
      });
    } else {
      pendingList.push(item);
    }
  }
}
promiseLimit(urls, 3);
