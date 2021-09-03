/*
 * @Author: Dalegac
 * @Date: 2021-08-27 17:51:56
 * @LastEditTime: 2021-08-28 23:49:24
 * @LastEditors: Dalegac
 * @Description: 冒泡排序，结果递增，优化提早推出
 */

const bubbleSort = (arr) => {
  const a = [...arr];
  let swapped = false;
  for (let i = 0; i < a.length; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    console.log(a);
    if (!swapped) return a;
  }

  return a;
};

console.log(bubbleSort([2, 3, 1, 7, 6]));
