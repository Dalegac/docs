/*
 * @Author: Dalegac
 * @Date: 2021-08-31 09:54:34
 * @LastEditTime: 2021-08-31 10:03:21
 * @LastEditors: Dalegac
 * @Description: 插入排序
 */

const insertionSort = (arr) =>
  arr.reduce((acc, x) => {
    if (acc.length === 0) return [x];
    acc.some((y, i) => {
      if (x <= y) {
        acc.splice(i, 0, x);
        return true;
      } else if (x > y && i === acc.length - 1) {
        acc.splice(i + 1, 0, x);
        return true;
      }
      // 最大的数才会走到这
      return false;
    });
    return acc;
  }, []);

console.log(insertionSort([2, , 8, 9, 6, 42, 4, 7]));
