/*
 * @Author: Dalegac
 * @Date: 2021-08-20 17:49:53
 * @LastEditTime: 2021-08-20 17:56:32
 * @LastEditors: Dalegac
 * @Description: 两个数汉明距离
 */

const hammingDistance = (num1, num2) => {
  return (num1 ^ num2).toString(2).match(/1/g).length
}
console.log(hammingDistance(3, 2))
