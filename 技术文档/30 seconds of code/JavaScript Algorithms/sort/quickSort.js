/*
 * @Author: Dalegac
 * @Date: 2021-09-02 22:37:59
 * @LastEditTime: 2021-09-02 23:15:03
 * @LastEditors: Dalegac
 * @Description: 快排
 */
const quickSort = (arr) => {
  const a = [...arr];
  if (a.length < 2) return a;
  const quickSortIndex = Math.floor(a.length / 2);
  const pivot = a[quickSortIndex];
  const [lo, hi] = a.reduce(
    (acc, cur, i) => {
      if (cur < pivot || (cur === pivot && i !== quickSortIndex)) {
        acc[0].push(cur);
      } else if (cur > pivot) {
        acc[1].push(cur);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

console.log(quickSort([2, 3, 41, 2, 3, 4, 54, 5, 3, 1, 14, 35, 3]));
