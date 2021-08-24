/*
 * @Author: Dalegac
 * @Date: 2021-08-23 23:26:12
 * @LastEditTime: 2021-08-24 00:01:36
 * @LastEditors: Dalegac
 * @Description: 空间中点之间的距离
 */

const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(y[i] - val, 2), 0));

console.log(vectorDistance([10, 0, 5], [20, 0, 10])); // 11.180339887498949
