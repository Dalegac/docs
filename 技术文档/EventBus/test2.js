/*
 * @Author: Dalegac
 * @Date: 2021-10-11 16:30:09
 * @LastEditTime: 2021-10-13 13:48:31
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
setTimeout(function () {
  console.log("定时器开始啦");
});

new Promise(function (resolve) {
  console.log("马上执行for循环啦");
  for (var i = 0; i < 10000; i++) {
    i == 99 && resolve();
  }
}).then(function () {
  console.log("执行then函数啦");
});

console.log("代码执行结束");
