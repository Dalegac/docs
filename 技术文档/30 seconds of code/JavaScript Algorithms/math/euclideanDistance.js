/*
 * @Author: Dalegac
 * @Date: 2021-08-31 11:01:12
 * @LastEditTime: 2021-08-31 11:03:24
 * @LastEditors: Dalegac
 * @Description: Just say something
 */

const euclideanDistance = (a, b) =>
  Math.hypot(...Object.keys(a).map((k) => a[k] - b[k]));

console.log(euclideanDistance([1, 1], [2, 2]));
