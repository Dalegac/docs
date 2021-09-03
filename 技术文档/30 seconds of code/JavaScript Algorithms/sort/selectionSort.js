/*
 * @Author: Dalegac
 * @Date: 2021-08-31 22:52:03
 * @LastEditTime: 2021-08-31 23:20:36
 * @LastEditors: Dalegac
 * @Description: 选择排序
 */

const selectionSort = (arr) => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, cur, j) => (cur < a[acc] ? j + i + 1 : acc), i);
    if (a[min] < a[i]) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

console.log(selectionSort([4, 5, 6, 3, 2, 1]));
