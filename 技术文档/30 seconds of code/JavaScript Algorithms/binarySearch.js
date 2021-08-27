/*
 * @Author: Dalegac
 * @Date: 2021-08-25 23:53:55
 * @LastEditTime: 2021-08-26 00:14:39
 * @LastEditors: Dalegac
 * @Description: 二分查找
 */

const binarySearch = (arr, item) => {
  let [start, end] = [0, arr.length - 1];
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === item) return mid;
    arr[mid] < item ? (end = mid - 1) : (start = mid + 1);
  }
  return -1;
};

console.log(binarySearch([0, 1, 2, 3, 4, 5, 6], 3));
