/*
 * @Author: Dalegac
 * @Date: 2021-08-31 12:24:59
 * @LastEditTime: 2021-08-31 13:39:02
 * @LastEditors: Dalegac
 * @Description: num以内的素数
 */

const primes = (num) => {
  let arr = Array.from({ length: num - 1 }, (_, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTilSqroot = Array.from({ length: sqroot - 1 }, (_, i) => i + 2);

  numsTilSqroot.forEach((x) => {
    arr = arr.filter((y) => y % x !== 0 || y === x);
  });
  return arr;
};

console.log(primes(13));
