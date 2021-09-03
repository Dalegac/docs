/*
 * @Author: Dalegac
 * @Date: 2021-09-01 00:16:18
 * @LastEditTime: 2021-09-01 09:22:24
 * @LastEditors: Dalegac
 * @Description: 堆排序
 */

const heapSort = (arr) => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[i], a[max]] = [a[max], a[i]];
      heapify(a, max);
    }
  };
  for (let i = Math.floor(l / 2); i >= 0; i--) heapify(a, i);
  for (let i = l - 1; i >= 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};
console.log(heapSort([5, 3, 8, 1])); // [1, 3, 4, 6]
