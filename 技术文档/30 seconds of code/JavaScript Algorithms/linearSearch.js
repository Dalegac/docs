/*
 * @Author: Dalegac
 * @Date: 2021-08-25 10:02:21
 * @LastEditTime: 2021-08-25 10:10:15
 * @LastEditors: Dalegac
 * @Description: 线性查找
 */

const linearSearch = (arr, item) => {
  for (const i in arr) {
    console.log(i);
    if (arr[i] === item) return +i;
  }
  return -1;
};

console.log(linearSearch([0, 10010, 23], 3));
