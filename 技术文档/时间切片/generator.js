/*
 * @Author: Dalegac
 * @Date: 2021-09-23 23:17:23
 * @LastEditTime: 2021-09-23 23:51:54
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
const tasks = [];
function* run() {
  let task;

  while ((task = tasks.shift())) {
    // 判断是否有高优先级事件需要处理, 有的话让出控制权
    if (hasHighPriorityEvent()) {
      yield;
    }

    // 处理完高优先级事件后，恢复函数调用栈，继续执行...
    execute(task);
  }
}
