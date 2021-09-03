/*
 * @Author: Dalegac
 * @Date: 2021-08-31 23:28:31
 * @LastEditTime: 2021-08-31 23:41:00
 * @LastEditors: Dalegac
 * @Description: 全排列
 */
const permutations = (arr) => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, cur, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((i) => [
          cur,
          ...i,
        ])
      ),
    []
  );
};

console.log(permutations([1, 2, 3, 4]));
