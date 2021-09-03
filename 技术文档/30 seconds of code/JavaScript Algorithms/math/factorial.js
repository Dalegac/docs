/*
 * @Author: Dalegac
 * @Date: 2021-08-19 23:39:30
 * @LastEditTime: 2021-08-23 23:07:16
 * @LastEditors: Dalegac
 * @Description: 计算阶乘
 */

const factorial = (n) =>
  n < 0
    ? (() => {
        throw new TypeError("Negative numbers are not allowed!")
      })()
    : n > 1
    ? n * factorial(n - 1)
    : 1

console.log(factorial(7))
