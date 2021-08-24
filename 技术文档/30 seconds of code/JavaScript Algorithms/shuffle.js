/*
 * @Author: Dalegac
 * @Date: 2021-08-23 23:09:38
 * @LastEditTime: 2021-08-23 23:23:09
 * @LastEditors: Dalegac
 * @Description: Randomizes the order of the values of an array, returning a new array.
 */

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);

    // 交换数组的两个值
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

console.log(
  shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
);
