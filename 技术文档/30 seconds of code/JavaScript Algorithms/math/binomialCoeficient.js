/*
 * @Author: Dalegac
 * @Date: 2021-08-20 10:12:33
 * @LastEditTime: 2021-08-20 10:36:56
 * @LastEditors: Dalegac
 * @Description: 计算二项式系数/组合数
 */
const binomialCoefficient = (n, k) => {
  // 校验输入是否为Number
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN
  if (n < k) return 0
  if (k === 0 || k === n) return 1
  if (k === 1 || k === n - 1) return n
  if (k > n - k) k = n - k
  let res = n
  for (let j = 2; j <= k; j++) {
    res *= (n - j + 1) / j
  }
  return Math.round(res)
}
console.log(binomialCoefficient(8, 2))
