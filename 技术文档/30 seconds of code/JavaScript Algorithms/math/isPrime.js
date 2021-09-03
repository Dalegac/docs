/*
 * @Author: Dalegac
 * @Date: 2021-08-19 21:35:44
 * @LastEditTime: 2021-08-19 23:37:26
 * @LastEditors: Dalegac
 * @Description: 判断素数
 */

const isPrime = (num) => {
  const boundary = Math.floor(Math.sqrt(num))
  for (let i = 2; i < boundary; i++) {
    if (num % i === 0) return false
  }
  return num >= 2
}

console.log(isPrime(123))
console.log(isPrime(127))
