/*
 * @Author: Dalegac
 * @Date: 2021-08-23 21:42:33
 * @LastEditTime: 2021-08-23 22:57:59
 * @LastEditors: Dalegac
 * @Description: Calculates the least common multiple of two or more numbers.
 */

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y))
  const _lcm = (x, y) => (x * y) / gcd(x, y)

  return arr.reduce((a, b) => _lcm(a, b))
}

console.log(lcm(3, 4))
console.log(lcm(0, 4))
console.log(lcm(3, 4, 5))
