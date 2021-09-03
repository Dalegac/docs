/*
 * @Author: Dalegac
 * @Date: 2021-08-30 22:57:10
 * @LastEditTime: 2021-08-31 09:08:49
 * @LastEditors: Dalegac
 * @Description: 归并排序
 */

const mergeSort = (arr) => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);

  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

console.log(mergeSort([5, 1, 2, 3, 4]));
