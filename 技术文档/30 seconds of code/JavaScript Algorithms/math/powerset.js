/*
 * @Author: Dalegac
 * @Date: 2021-08-29 23:50:36
 * @LastEditTime: 2021-08-29 23:59:53
 * @LastEditors: Dalegac
 * @Description: 集合的幂集
 */

const powerset = (arr) =>
  arr.reduce((acc, cur) => acc.concat(acc.map((i) => i.concat([cur]))), [[]]);

console.log(powerset([1, 2, 3]));
