/*
 * @Author: Dalegac
 * @Date: 2021-08-19 23:32:02
 * @LastEditTime: 2021-08-19 23:34:06
 * @LastEditors: Dalegac
 * @Description: 计算两点间距离
 */

const distance = (x0, y0, x1, y1) => Math.hypot(x0 - x1, y0 - y1)

console.log(distance(1, 1, 2, 2))
