/*
 * @Author: Dalegac
 * @Date: 2021-08-25 23:29:37
 * @LastEditTime: 2021-08-25 23:51:29
 * @LastEditors: Dalegac
 * @Description: 斐波那契数列
 */

const fibonacci = (n) =>
  Array.from({ length: n }).reduce(
    (acc, _, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

console.log(fibonacci(6));
