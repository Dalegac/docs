/*
 * @Author: Dalegac
 * @Date: 2021-08-23 21:49:06
 * @LastEditTime: 2021-08-23 22:55:29
 * @LastEditors: Dalegac
 * @Description: Calculates the greatest common divisor between two or more numbers/arrays.
 */

// 辗转相除法求最大公因数
const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y))
  return arr.reduce((a, b) => _gcd(a, b))
}

console.log(gcd(8, 36))
console.log(gcd(0, 8, 16, 30))
