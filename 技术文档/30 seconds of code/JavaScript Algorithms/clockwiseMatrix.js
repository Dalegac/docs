/*
 * @Author: Dalegac
 * @Date: 2021-08-25 12:23:37
 * @LastEditTime: 2021-08-25 14:58:26
 * @LastEditors: Dalegac
 * @Description: 顺时针打印数组，前端游戏可能会用到
 */

const spiralOrder = (matrix) => {
  const arr = [];
  const HEIGHT = matrix.length >>> 0;
  const WIDTH = matrix[0]?.length >>> 0;
  if (HEIGHT === 0 || WIDTH === 0) return [];
  let [t, b, l, r] = [0, HEIGHT - 1, 0, WIDTH - 1];
  while (true) {
    for (let i = l; i <= r; i++) arr.push(matrix[t][i]);
    if (++t > b) break;

    for (let i = t; i <= b; i++) arr.push(matrix[i][r]);
    if (l > --r) break;

    for (let i = r; i >= l; i--) arr.push(matrix[b][i]);
    if (t > --b) break;

    for (let i = b; i >= t; i--) arr.push(matrix[i][l]);
    if (++l > r) break;
  }

  return arr;
};

console.log(
  spiralOrder([
    [1, 2, 3],
    [5, 6, 7],
    [9, 10, 11],
    [13, 14, 15],
  ])
);
