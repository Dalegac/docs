/*
 * @Author: Dalegac
 * @Date: 2021-08-24 23:56:48
 * @LastEditTime: 2021-08-25 00:04:18
 * @LastEditors: Dalegac
 * @Description: 求一个数的素因数
 */

const primeFactors = (num) => {
  const factors = [];
  let f = 2;
  // 此处也可以采用num>1
  while (f <= num) {
    if (num % f === 0) {
      factors.push(f);
      num /= f;
    } else {
      f++;
    }
  }
  return factors;
};

console.log(primeFactors(2));
