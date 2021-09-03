/*
 * @Author: Dalegac
 * @Date: 2021-08-31 10:52:29
 * @LastEditTime: 2021-08-31 10:56:37
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
const arithmeticProgression = (n, limit) =>
  Array.from({ length: Math.ceil(limit / n) }, (_, i) => (i + 1) * n);

console.log(arithmeticProgression(4, 31));
