/*
 * @Author: Dalegac
 * @Date: 2021-09-01 12:38:00
 * @LastEditTime: 2021-09-01 13:55:01
 * @LastEditors: Dalegac
 * @Description: 桶排序算法
 */

const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach((i) => {
    buckets[Math.floor((i - min) / size)].push(i);
  });

  return buckets.reduce(
    (acc, cur, i) => [...acc, ...cur.sort((a, b) => a - b)],
    []
  );
};

console.log(
  bucketSort([
    3, 5, 6, 7, 16, 1, 2, 44, 5, 6, 5, 75, 757, 4, 3, 43, 2, 5, 56, 4, 64, 545,
    64, 35, 35, 464, 363, 35,
  ])
);
