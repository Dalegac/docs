/*
 * @Author: Dalegac
 * @Date: 2021-09-02 22:14:12
 * @LastEditTime: 2021-09-02 22:26:08
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
const indexOfSubstrings = function* (str, searchValue) {
  let i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) {
      yield r;
      i = r + 1;
    } else return;
  }
};

console.log([...indexOfSubstrings("add acd sdc add cadd", "add")]);
