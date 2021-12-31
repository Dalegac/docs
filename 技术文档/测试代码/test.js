/*
 * @Author: Dalegac
 * @Date: 2021-10-18 14:09:03
 * @LastEditTime: 2021-10-18 15:37:17
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
fn(); //2
function fn() {
  console.log(1);
}
fn(); //2

function fn() {
  console.log(2);
}
console.log(3 + 4 + "5");
fn();
