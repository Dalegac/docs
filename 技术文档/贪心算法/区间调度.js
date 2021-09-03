/*
 * @Author: Dalegac
 * @Date: 2021-08-29 19:49:20
 * @LastEditTime: 2021-08-29 20:08:13
 * @LastEditors: Dalegac
 * @Description: 区间调度问题
 */

function intervalSchedule(intvs) {
  if (intvs.length === 0) {
    return 0;
  }
  const sortArray = intvs.sort((a, b) => a[1] - b[1]); //[[1,2],[2,3]]
}
